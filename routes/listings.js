// routes/listings.js
const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner } = require("../middleware.js"); // ✅ only use isOwner here
const wrapAsync = require("../utils/wrapAsync");
const listingController = require("../controllers/listings.js");

// INDEX → show all listings
router.get("/", wrapAsync(listingController.index));


// NEW → show form to create listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// CREATE → add new listing
router.post("/", isLoggedIn, wrapAsync(listingController.createListing));

// SHOW → show one listing
router.get("/:id", wrapAsync(listingController.showListing));

// EDIT → show form to edit listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// UPDATE → actually update listing
router.put("/:id", isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

// DELETE → delete listing (FIX ✅ removed isReviewAuthor)
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;

