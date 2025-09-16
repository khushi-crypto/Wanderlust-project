const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");

console.log("🚀 USER ROUTES LOADED");

// GET signup form
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// POST signup
router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });

        const registeredUser = await User.register(newUser, password);
        console.log("✅ NEW USER REGISTERED:", registeredUser);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            return res.redirect("/listings");
        });

    } catch (err) {
        console.error("❌ SIGNUP ERROR:", err);
        req.flash("error", err.message);
        return res.redirect("/signup");
    }
});

// GET login form
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// POST login form
router.post(
    "/login",
    saveRedirectUrl, // ✅ middleware loads redirectUrl into res.locals
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back!");
        // ✅ Redirect to stored URL or fallback
        res.redirect(res.locals.redirectUrl || "/listings");
    }
);

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;


