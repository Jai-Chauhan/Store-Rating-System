const express = require("express");

const db = require("../db");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

//Get ratings for store
router.get('/ratings', authenticate, async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        const storesOwned = await db.query("SELECT * FROM stores WHERE owner_id = ?", [userId]);
        if (storesOwned.length === 0) {
            return res.status(404).json({
                error: "No stores found"
            })
        };

        const ratings = await db.query(
            `SELECT r.id AS rating_id, r.user_id, u.name AS user_name, r.rating
            FROM ratings r
            LEFT JOIN users u ON u.id = r.user_id
            WHERE r.store_id = ?
            ORDER BY r.id DESC`,
            [storesOwned[0].id]
        );
        return res.json({
            storesOwned,
            ratings
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})



module.exports = router;