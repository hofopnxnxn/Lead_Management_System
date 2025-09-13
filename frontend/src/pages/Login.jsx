import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      login(response.data.user);
      toast.success("Logged in successfully");
      navigate("/leads");
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      <style>
        {`
          @media (max-width: 600px) {
            .login-container {
              width: 95vw !important;
              padding: 24px 8px !important;
              border-radius: 10px !important;
              box-shadow: 0 4px 16px rgba(31,38,135,0.12) !important;
            }
            .login-title {
              font-size: 1.5rem !important;
              margin-bottom: 16px !important;
            }
            .login-input {
              font-size: 15px !important;
              padding: 10px 10px !important;
            }
            .login-btn {
              font-size: 15px !important;
              padding: 10px !important;
            }
          }
        `}
      </style>
      <div
        className="login-container"
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
          padding: "40px 32px",
          width: 350,
          maxWidth: "95vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="login-title" style={{ marginBottom: 24, color: "#2575fc" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: 18 }}>
            <input
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
                marginBottom: 4,
              }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <button
            className="login-btn"
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37, 117, 252, 0.15)",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: 20 }}>
          <span>New user? </span>
          <Link to="/register" style={{ color: "#2575fc", fontWeight: 500 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
