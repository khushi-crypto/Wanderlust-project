const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js"); // ✅ import isReviewAuthor

// Validation middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body.review);
  if (error) {
    let erMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, erMsg);
  } else {
    next();
  }
};

// POST route - create review
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
  console.log("REQ BODY:", req.body);

  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new ExpressError(404, "Listing not found");

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("NEW REVIEW:", newReview);
  res.redirect(`/listings/${listing._id}`);
}));

// DELETE route - remove review (✅ now protected)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

module.exports = router;

