const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { authenticate } = require("../middleware/auth");

const db = require("../db");

// Create a new store
router.post("/", authenticate, [
    body("name").isString().isLength({ min: 1, max: 150 }).withMessage("Name must be between 1 and 150 characters"),
    body("email").optional().isEmail().withMessage("Email must be valid"),
    body("phone").optional().isMobilePhone().withMessage("Phone must be valid"),
    body("address").optional().isLength({ max: 400 }).withMessage("Address must be between 1 and 400 characters")
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, phone, address } = req.body;
            const ownerId = req.user && req.user.id ? req.user.id : null;

            // Check if store with this email already exists
            const existing = await db.query('SELECT id FROM stores WHERE name = ? LIMIT 1', [name]);
            if (existing.length > 0) {
                return res.status(409).json({ error: 'Store with this name already exists' });
            }

            // Create new store
            const result = await db.query("INSERT INTO stores (name, email, phone, address, owner_id) VALUES (?, ?, ?, ?, ?)", [name, email || null, phone || null, address || null, ownerId]);

            return res.status(201).json(
                {
                    id: result.insertId,
                    name,
                    email,
                    phone,
                    address,
                    owner_id: ownerId
                }
            );
        } catch (error) {
            console.error("Error creating store:", error);
            return res.status(500).json({ error: "Failed to create store" });
        }
    });

// Get all stores
router.get("/", authenticate, async (req, res) => {
    try {
        const stores = await db.query("SELECT * FROM stores");
        return res.status(200).json(stores);
    } catch (error) {
        console.error("Error fetching stores:", error);
        return res.status(500).json({ error: "Failed to fetch stores" });
    }
});

// Get store by id
router.get("/:id", authenticate, async (req, res) => {
    try {
        const store = await db.query("SELECT * FROM stores WHERE id = ?", [req.params.id]);
        if (store.length === 0) {
            return res.status(404).json({ error: "Store not found" });
        }
        return res.status(200).json(store[0]);
    } catch (error) {
        console.error("Error fetching store:", error);
        return res.status(500).json({ error: "Failed to fetch store" });
    }
});

module.exports = router;