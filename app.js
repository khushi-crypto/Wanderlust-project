// app.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // ✅ Load .env file
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore=require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Models
const User = require("./models/user");
const Listing = require("./models/listing");
const Review = require("./models/review");

// Routers
const listings = require("./routes/listings");
const reviews = require("./routes/reviews");
const userRoutes = require("./routes/user");

// ----------------------
// MongoDB Connection
// ----------------------

const dbUrl=process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ DB Connection Error:", err));

// ----------------------
// Sample Data Insertion (with duplicate prevention)
// ----------------------
const sampleListings = require("./init/data.js");

async function insertSampleData() {
    try {
        // Check if there are already listings
        const count = await Listing.countDocuments();
        if (count > 0) {
            console.log(`ℹ️ Found ${count} listings. Skipping sample data insertion.`);
            return; // Prevent duplicates
        }

        // Check if default user exists
        let defaultUser = await User.findOne({ username: "testuser" });

        // If not, create default user
        if (!defaultUser) {
            const newUser = new User({ username: "testuser", email: "testuser@example.com" });
            defaultUser = await User.register(newUser, "password123");
            console.log("✅ Default user created:", defaultUser.username);
        }

        // Attach owner to each sample listing
        const listingsWithOwner = sampleListings.map((listing) => ({
            ...listing,
            owner: defaultUser._id,
        }));

        await Listing.insertMany(listingsWithOwner);
        console.log("✅ Sample listings inserted successfully!");
    } catch (err) {
        console.error("❌ Error inserting sample data:", err);
    }
}

// Run once on server start
insertSampleData();

// ----------------------
// View Engine & Middleware
// ----------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:"mysupersecret",
  },
  touchAfter:24*3600,
});


// ----------------------
// Session & Flash Config
// ----------------------

store.on("error",()=>{
  console.log("ERROR",err);
})
const sessionOptions = {
  store,
    secret: "mysupersecretcode", // 🔑 change in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// ----------------------
// Passport Configuration
// ----------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ----------------------
// Flash + Current User Middleware
// ----------------------
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // available in all views
    next();
});

// ----------------------
// Routes
// ----------------------
app.use("/", userRoutes); // ✅ Signup/Login/Logout
app.use("/listings", listings); // ✅ Listings routes
app.use("/listings/:id/reviews", reviews); // ✅ Reviews routes

// ----------------------
// 404 Handler
// ----------------------
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// ----------------------
// Global Error Handler
// ----------------------
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { err });
});

// ----------------------
// Server Start
// ----------------------
app.listen(8080, () => {
    console.log("🚀 Server running on http://localhost:8080");
});
