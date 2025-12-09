import React, { useState } from "react";
import api from "../api/axios";

export default function CreateStore() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [msg, setMsg] = useState("");

    function change(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function submit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return setMsg("Login required.");

        try {
            const res = await api.post("/stores", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMsg("Store created ID: " + res.data.store.id);
        } catch {
            setMsg("Failed");
        }
    }

    return (
        <div>
            <h1 className="title">Create Store</h1>
            <form style={{ maxWidth: 400 }} onSubmit={submit}>
                <input name="name" placeholder="Store name" onChange={change} value={form.name} />
                <input name="email" placeholder="Email" onChange={change} value={form.email} />
                <input name="phone" placeholder="Phone" onChange={change} value={form.phone} />
                <input name="address" placeholder="Address" onChange={change} value={form.address} />
                <button>Create</button>
            </form>
            {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </div>
    );
}
