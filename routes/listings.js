const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

// INDEX route → show all listings
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// NEW route → show form to create listing
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// CREATE route → add new listing
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);

        // ✅ Attach the logged-in user as the owner
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New listing created!");
        res.redirect(`/listings/${newListing._id}`);
    } catch (err) {
        console.error("❌ Error creating listing:", err);
        req.flash("error", "Could not create listing.");
        res.redirect("/listings");
    }
});

// SHOW route → show one listing
router.get("/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate({path:"reviews",populate:{path:"author"},})
        .populate("owner"); // ✅ populate so we can access owner details

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    console.log("📢 LISTING DATA:", listing);
    res.render("listings/show.ejs", { listing });
});

// EDIT route → show form to edit listing
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Only allow owner to access edit page
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to edit this listing.");
        return res.redirect(`/listings/${listing._id}`);
    }

    res.render("listings/edit.ejs", { listing });
});

// UPDATE route → actually update listing
router.put("/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Authorization check
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to update this listing.");
        return res.redirect(`/listings/${id}`);
    }
    
    Listing.findById(id);
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
});

// DELETE route
router.delete("/:id", isLoggedIn,isReviewAuthor, async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    //  Authorization check
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to delete this listing.");
        return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
});

module.exports = router;
