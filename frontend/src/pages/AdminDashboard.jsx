import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
    const [summary, setSummary] = useState(null);
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        async function load() {
            const token = localStorage.getItem("token");
            if (!token) return setMsg("Login required.");

            try {
                const sum = await api.get("/admin/summary", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const usr = await api.get("/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const str = await api.get("/admin/stores", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setSummary(sum.data.totals);
                setUsers(usr.data.data);
                setStores(str.data.data);
            } catch {
                setMsg("Error loading admin panel");
            }
        }

        load();
    }, []);

    if (msg) return <p>{msg}</p>;

    return (
        <div>
            <h1 className="title">Admin Dashboard</h1>

            {summary && (
                <div style={{ marginBottom: 20 }}>
                    <div className="card">Users: {summary.users}</div>
                    <div className="card">Stores: {summary.stores}</div>
                    <div className="card">Ratings: {summary.ratings}</div>
                </div>
            )}

            <h2 className="subtitle">Users</h2>
            {users.map((u) => (
                <div key={u.id} className="card">
                    <b>{u.name}</b>
                    <p>{u.email}</p>
                    <p>Role: {u.role}</p>
                </div>
            ))}

            <h2 className="subtitle">Stores</h2>
            {stores.map((s) => (
                <div key={s.id} className="card">
                    <b>{s.name}</b>
                    <p>{s.address}</p>
                    <p>Owner: {s.owner_id}</p>
                </div>
            ))}
        </div>
    );
}
