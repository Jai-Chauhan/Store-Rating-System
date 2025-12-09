import React, { useState } from "react";
import api from "../api/axios";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
    const [message, setMessage] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post("/auth/signup", form);
            setMessage("Signup successful. You can now log in.");
            setForm({ name: "", email: "", address: "", password: "" });
        } catch (err) {
            setMessage(err.response?.data?.error || "Signup failed");
        }
    }

    return (
        <div>
            <h1 className="title">Signup</h1>
            <form style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button type="submit">Signup</button>
            </form>
            {message && <p style={{ marginTop: 10 }}>{message}</p>}
        </div>
    );
}
