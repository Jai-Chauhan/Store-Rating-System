const express = require("express");

const { authenticate, requireRole } = require("../middleware/auth");
const db = require("../db");

const router = express.Router();

const adminOnly = [authenticate, requireRole("Admin")];

//Admin Dashboard
router.get('/dashboard', adminOnly, async (req, res) => {
    try {
        //Counting users, stores and ratings
        const [u] = await db.query('SELECT COUNT(*) AS total_users FROM users');
        const [s] = await db.query('SELECT COUNT(*) AS total_stores FROM stores');
        const [r] = await db.query('SELECT COUNT(*) AS total_ratings FROM ratings');

        return res.json({
            totals: {
                users: u.total_users || 0,
                stores: s.total_stores || 0,
                ratings: r.total_ratings || 0
            }
        })
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})

//Get all users
router.get('/users', adminOnly, async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM users');
        return res.json(users)
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})

//Get all stores
router.get('/stores', adminOnly, async (req, res) => {
    try {
        const stores = await db.query('SELECT * FROM stores');
        return res.json(stores)
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})

module.exports = router;