require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//Auth middleware
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    //Verify token
    const token = parts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }
}

function requireRole(role) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }
        if (req.user.role !== role) {
            return res.status(403).json({
                error: "Forbidden"
            })
        }
        next();
    }
}

module.exports = { authenticate, requireRole };