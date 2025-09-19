const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync");

const userController = require("../controllers/users.js");

console.log("🚀 USER ROUTES LOADED");

// ✅ Signup Routes
router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// ✅ Login Routes
router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );

// ✅ Logout Route
router.get("/logout", userController.logout);

module.exports = router;
