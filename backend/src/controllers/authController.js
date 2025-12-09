require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    //Sign Up Controller
    signUp: async (req, res) => {
        try {
            const { name, email, password, address } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    error: "All fields are required"
                })
            }

            //Checking if user already exists
            const existingUser = await db.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({
                    error: "User already exists"
                })
            }

            //Hashing password
            const hashedPassword = await bcrypt.hash(password, 10);

            //Inserting user
            const sql = "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)";
            const values = [name, email, hashedPassword, address, "Normal User"];

            const result = await db.query(sql, values);
            const role = "Normal User";

            return res.status(201).json({
                message: "User created successfully",
                user: {
                    id: result.insertId,
                    name,
                    email,
                    role
                }
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                error: "Something went wrong"
            })
        }
    },

    //Login Controller
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            //Checking if email and password are provided
            if (!email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const rows = await db.query(
                'SELECT id, name, role, password FROM users WHERE email = ? LIMIT 1',
                [email]
            );

            //Checking if user exists
            if (!rows || rows.length === 0) {
                return res.status(400).json({ error: "User does not exist" });
            }

            console.log('Login Query Result:', rows);

            const userRow = rows[0];

            //Checking if password exists
            const hashed = userRow.password;
            if (!hashed) {
                console.error('No password hash found for user', userRow.id);
                return res.status(500).json({ error: 'Server error' });
            }

            //Checking if password is valid
            const isPasswordValid = await bcrypt.compare(password, hashed);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid password" });
            }

            //Checking if role exists
            const role = userRow.role || 'Normal User';

            //Sign token
            const token = jwt.sign({ id: userRow.id, role }, JWT_SECRET, { expiresIn: '7d' });

            return res.status(200).json({
                message: "User logged in successfully",
                token,
                user: {
                    id: userRow.id,
                    name: userRow.name || null,
                    email,
                    role
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
}