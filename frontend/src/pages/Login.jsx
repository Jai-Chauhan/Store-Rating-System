import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/stores");
        } catch (err) {
            setMessage(err.response?.data?.error || "Login failed");
        }
    }

    return (
        <div>
            <h1 className="title">Login</h1>
            <form style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            {message && <p style={{ marginTop: 10 }}>{message}</p>}
        </div>
    );
}
