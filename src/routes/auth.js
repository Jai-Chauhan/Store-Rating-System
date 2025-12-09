const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/authController");

//Validating Sign Up 
const signUpValidator = [
    body("name").isLength({ min: 20, max: 60 }).withMessage("Name must be between 20 and 60 characters"),

    body("email").isEmail().withMessage("Invalid email"),

    body("password").isLength({ min: 8, max: 16 }).withMessage("Password must be between 8 and 16 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/).withMessage("Password must contain at least one special character"),

    body("address").isLength({ max: 400 }).withMessage("Address must be less than 400 characters")
];

//Sign Up Route
router.post("/signup", signUpValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    authController.signUp(req, res);
});

//Login Route
router.post("/login", (req, res) => {
    authController.login(req, res);
});

module.exports = router;