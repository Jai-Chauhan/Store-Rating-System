import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Stores() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/stores").then((res) => {
            setStores(res.data.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="title">Stores</h1>
            {stores.map((s) => (
                <div key={s.id} className="card">
                    <Link to={`/stores/${s.id}`} style={{ fontWeight: "bold" }}>
                        {s.name}
                    </Link>
                    <p>{s.address}</p>
                </div>
            ))}
        </div>
    );
}