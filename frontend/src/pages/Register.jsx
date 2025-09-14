import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      toast.success("User registered successfully");
      navigate("/leads");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        fontFamily: "Segoe UI, Arial, sans-serif",
        width: "90vw",
        boxSizing: "border-box",
      }}
    >
      <style>
        {`
          @media (max-width: 600px) {
            .register-container {
              max-width: 98vw !important;
              padding: 16px !important;
              margin: 24px auto !important;
              border-radius: 8px !important;
            }
            .register-title {
              font-size: 1.5rem !important;
              margin-bottom: 16px !important;
            }
            .register-input {
              font-size: 15px !important;
              padding: 9px 10px !important;
            }
            .register-btn {
              font-size: 16px !important;
              padding: 10px 0 !important;
            }
          }
        `}
      </style>
      <h2
        className="register-title"
        style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}
      >
        Register
      </h2>
      <form onSubmit={handleSubmit} className="register-container">
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: 6,
              color: "#333",
              fontWeight: 500,
            }}
          >
            Username
          </label>
          <input
            id="username"
            className="register-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
            }}
            autoComplete="username"
          />
        </div>
        <div style={{ marginBottom: 28 }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: 6,
              color: "#333",
              fontWeight: 500,
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="register-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
            }}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="register-btn"
          style={{
            width: "100%",
            padding: "12px 0",
            background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
            transition: "background 0.2s",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
