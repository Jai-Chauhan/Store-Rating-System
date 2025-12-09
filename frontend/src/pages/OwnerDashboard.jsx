import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function OwnerDashboard() {
    const [store, setStore] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        async function load() {
            const token = localStorage.getItem("token");
            if (!token) return setMsg("Login required.");
            try {
                const res = await api.get("/store-owner/ratings", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStore(res.data.store);
                setRatings(res.data.ratings);
            } catch {
                setMsg("Error loading dashboard");
            }
        }
        load();
    }, []);

    if (msg) return <p>{msg}</p>;
    if (!store) return <div>No store found.</div>;

    return (
        <div>
            <h1 className="title">Owner Dashboard</h1>

            <div className="card">
                <b>{store.name}</b>
                <p>{store.address}</p>
            </div>

            <h2 className="subtitle">Ratings</h2>
            {ratings.length === 0 && <p>No ratings yet.</p>}

            {ratings.map((r) => (
                <div key={r.rating_id} className="card">
                    <b>{r.user_name || `User ${r.user_id}`}</b>
                    <p>Rating: {r.rating}</p>
                </div>
            ))}
        </div>
    );
}
