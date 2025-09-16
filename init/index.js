const mongoose = require("mongoose");
const sampleListings = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("✅ Connected to DB");

    // 1️⃣ Create a default user (delete any old users)
    await User.deleteMany({});
    const defaultUser = new User({
      username: "defaultUser",
      email: "default@example.com"
    });

    // ✅ Use passport-local-mongoose .register() so password gets hashed
    await User.register(defaultUser, "password123");

    // 2️⃣ Delete old listings
    await Listing.deleteMany({});

    // 3️⃣ Assign this user as owner to each listing
    const listingsWithOwner = sampleListings.map(listing => ({
      ...listing,
      owner: defaultUser._id
    }));

    // 4️⃣ Insert updated listings
    const insertedListings = await Listing.insertMany(listingsWithOwner);

    console.log("✅ Listings initialized successfully!");
    insertedListings.forEach(listing => {
      console.log("📢 LISTING DATA:", {
        title: listing.title,
        owner: listing.owner, // ✅ This should now be an ObjectId
        id: listing._id
      });
    });

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ DB Error:", err);
  }
}

main();

