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

const reviewController=require("../controllers/reviews.js");

// POST route - create review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE route - remove review (✅ now protected)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;

