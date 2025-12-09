import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function StoreDetail() {
    const { id } = useParams();
    const [store, setStore] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [rating, setRating] = useState(5);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        async function load() {
            const s = await api.get(`/stores/${id}`);
            const r = await api.get(`/ratings/${id}`);
            setStore(s.data.store);
            setRatings(r.data.data);
        }
        load();
    }, [id]);

    async function submitRating(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return setMsg("Login required.");

        try {
            await api.post(
                "/ratings",
                { store_id: Number(id), rating: Number(rating) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMsg("Rating submitted.");
        } catch {
            setMsg("Failed");
        }
    }

    if (!store) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="title">{store.name}</h1>
            <p>{store.address}</p>

            <h2 className="subtitle">Submit Rating</h2>
            <form style={{ maxWidth: 200 }} onSubmit={submitRating}>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value={1}>1 - Poor</option>
                    <option value={2}>2 - Fair</option>
                    <option value={3}>3 - Good</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={5}>5 - Excellent</option>
                </select>
                <button>Submit</button>
            </form>

            <p style={{ marginTop: 10 }}>{msg}</p>

            <h2 className="subtitle" style={{ marginTop: 20 }}>Ratings</h2>
            {ratings.map((r) => (
                <div key={r.rating_id} className="card">
                    <b>{r.user_name || `User ${r.user_id}`}</b>
                    <p>Rating: {r.rating}</p>
                </div>
            ))}
        </div>
    );
}
