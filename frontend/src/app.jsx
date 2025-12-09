import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Stores from "./pages/Stores";
import StoreDetail from "./pages/StoreDetail";
import CreateStore from "./pages/CreateStore";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = () => (
    <div style={{ padding: 20 }}>
        <h1 className="title">Store Rating System</h1>
    </div>
);

export default function App() {
    return (
        <BrowserRouter>
            <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
                <header>
                    <div
                        style={{
                            maxWidth: 900,
                            margin: "0 auto",
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/" style={{ fontSize: 18, fontWeight: 600, color: "#333", textDecoration: "none" }}>
                            StoreRatingSystem
                        </Link>
                        <nav>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login" style={{ marginLeft: 12 }}>Login</Link>
                            <Link to="/stores" style={{ marginLeft: 12 }}>Stores</Link>
                            <Link to="/create-store" style={{ marginLeft: 12 }}>Create Store</Link>
                            <Link to="/owner" style={{ marginLeft: 12 }}>Owner</Link>
                            <Link to="/admin" style={{ marginLeft: 12 }}>Admin</Link>
                        </nav>
                    </div>
                </header>

                <main style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/stores" element={<ProtectedRoute><Stores /></ProtectedRoute>} />
                        <Route path="/stores/:id" element={<ProtectedRoute><StoreDetail /></ProtectedRoute>} />
                        <Route path="/create-store" element={<ProtectedRoute><CreateStore /></ProtectedRoute>} />
                        <Route path="/owner" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
