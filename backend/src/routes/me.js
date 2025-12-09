const express = require('express');
const db = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });

        const [rows] = await db.query(
            'SELECT id, name, email, role, address FROM users WHERE id = ? LIMIT 1',
            [userId]
        );

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = rows[0];
        return res.json({ user });
    } catch (err) {
        console.error('/api/me error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;