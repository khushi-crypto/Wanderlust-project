// app.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Routers
const listings = require("./routes/listings");
const reviews = require("./routes/reviews");
const userRoutes = require("./routes/user");

// ----------------------
// MongoDB Connection
// ----------------------
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ----------------------
// View Engine & Middleware
// ----------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ----------------------
// Session & Flash Config
// ----------------------
const sessionOptions = {
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
app.use("/", userRoutes); // ✅ Signup/Login/Logout routes
app.use("/listings", listings); // ✅ All listings routes
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
