const User = require("../models/user");

// ✅ Render signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// ✅ Handle signup logic
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists by email (optional but good practice)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email already registered. Please login or use another email.");
            return res.redirect("/signup");
        }

        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        console.log("✅ NEW USER REGISTERED:", registeredUser);

        // Auto-login user after registration
        req.login(registeredUser, (err) => {
            if (err) {
                console.error("❌ LOGIN ERROR AFTER SIGNUP:", err);
                return next(err);
            }
            req.flash("success", `Welcome to Wanderlust, ${registeredUser.username}!`);
            res.redirect("/listings");
        });

    } catch (err) {
        console.error("❌ SIGNUP ERROR:", err);
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// ✅ Render login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// ✅ Handle login success
module.exports.login = (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    res.redirect(res.locals.redirectUrl || "/listings");
};

// ✅ Handle logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error("❌ LOGOUT ERROR:", err);
            return next(err);
        }
        req.flash("success", "You have been logged out successfully!");
        res.redirect("/listings");
    });
};
