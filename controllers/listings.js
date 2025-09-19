// controllers/listings.js
const Listing = require("../models/listing");
const Review = require("../models/review");

// INDEX - Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// NEW - Show form to create listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// CREATE - Add new listing
module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // attach logged-in user as owner
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect(`/listings/${newListing._id}`);
};

// SHOW - Show one listing
module.exports.showListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

// EDIT - Show edit form
module.exports.renderEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // ✅ isOwner middleware already checks permission
    res.render("listings/edit.ejs", { listing });
};

// UPDATE - Update listing
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

    if (!updatedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE - Delete listing
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Optionally delete all reviews related to this listing
    await Review.deleteMany({ _id: { $in: listing.reviews } });

    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
