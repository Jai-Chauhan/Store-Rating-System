require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // dev frontend origin
    credentials: true,
}));

//Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Home route
app.get("/", (req, res) => {
    res.json({
        ok: true,
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 4000
    })
});

//Store routes
const storeRoutes = require('./routes/stores');
app.use('/api/stores', storeRoutes);

//Rating routes
const ratingRoutes = require('./routes/rating');
app.use('/api/ratings', ratingRoutes);

//Store owner routes
const storeOwnerRoutes = require('./routes/store_owner');
app.use('/api/store_owner', storeOwnerRoutes);

//Admin routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

//Me routes
const meRoutes = require('./routes/me');
app.use('/api/me', meRoutes);

//404 route
app.use((req, res) => {
    res.status(404).json({
        msg: "Page not found"
    })
});

//Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        msg: "Something went wrong"
    })
});

//Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});