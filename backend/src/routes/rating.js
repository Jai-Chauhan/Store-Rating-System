const express = require("express");
const router = express.Router();

const db = require("../db");
const { authenticate } = require("../middleware/auth");

const { body, param, validationResult } = require("express-validator");


router.post('/', authenticate,
    [
        body('store_id').isInt({ gt: 0 }).withMessage('store_id must be a positive integer'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('rating must be integer between 1 and 5')
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const userId = req.user && req.user.id;
            const storeId = Number(req.body.store_id);
            const rating = Number(req.body.rating);

            // Ensure store exists
            const stores = await db.query('SELECT id FROM stores WHERE id = ? LIMIT 1', storeId);
            if (stores.length === 0) return res.status(404).json({ error: 'Store not found' });


            // Check if this user already rated this store
            const existing = await db.query('SELECT id FROM ratings WHERE user_id = ? AND store_id = ? LIMIT 1', [userId, storeId]);

            if (existing.length > 0) {
                // Update existing rating
                await db.query('UPDATE ratings SET rating = ? WHERE id = ?', [rating, existing[0].id]);
                return res.json({ message: 'Rating updated' });
            } else {
                // Insert new rating
                await db.query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)', [userId, storeId, rating]);
                return res.status(201).json({ message: 'Rating created' });
            }
        } catch (err) {
            console.error('ratings POST error:', err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
);

router.get(
    '/:storeId',
    [param('storeId').isInt({ gt: 0 }).withMessage('storeId must be a positive integer')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const storeId = Number(req.params.storeId);

            // Ensure store exists (friendly 404)
            const stores = await db.query('SELECT id FROM stores WHERE id = ? LIMIT 1', storeId);
            if (stores.length === 0) return res.status(404).json({ error: 'Store not found' });

            // Fetch ratings (user id and rating)
            const rows = await db.query(
                `SELECT r.user_id, r.rating, u.name AS user_name
                FROM ratings r
                LEFT JOIN users u ON u.id = r.user_id
                WHERE r.store_id = ?
                ORDER BY r.id DESC`,
                storeId
            );

            return res.json({ data: rows });
        } catch (err) {
            console.error('ratings GET error:', err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;