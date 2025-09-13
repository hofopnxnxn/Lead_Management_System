import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function LeadForm() {
  const [lead, setLead] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    status: "new",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/leads/${id}`).then((res) => setLead(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/leads/${id}`, lead);
        toast.success("Lead updated ");
      } else {
        await api.post("/leads", lead);
        toast.success("Lead created ");
      }
      navigate("/leads");
    } catch (err) {
      toast.success("Failed");
    }
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 600px) {
            .lead-form-container {
              max-width: 98vw !important;
              margin: 16px auto !important;
              padding: 16px !important;
              border-radius: 10px !important;
              box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
            }
            .lead-form-title {
              font-size: 1.3rem !important;
              margin-bottom: 16px !important;
            }
            .lead-form-label {
              font-size: 1rem !important;
            }
            .lead-form-input, .lead-form-select {
              font-size: 1rem !important;
              padding: 8px 10px !important;
            }
            .lead-form-btn {
              font-size: 1rem !important;
              padding: 10px 0 !important;
            }
          }
        `}
      </style>
      <div
        className="lead-form-container"
        style={{
          maxWidth: 420,
          margin: "40px auto",
          padding: 32,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <h2
          className="lead-form-title"
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#2d3748",
            letterSpacing: 1,
          }}
        >
          {id ? "Edit Lead" : "Add Lead"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label
              className="lead-form-label"
              style={{
                display: "block",
                marginBottom: 6,
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              First Name
            </label>
            <input
              className="lead-form-input"
              name="first_name"
              placeholder="First Name"
              value={lead.first_name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              className="lead-form-label"
              style={{
                display: "block",
                marginBottom: 6,
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              Last Name
            </label>
            <input
              className="lead-form-input"
              name="last_name"
              placeholder="Last Name"
              value={lead.last_name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              className="lead-form-label"
              style={{
                display: "block",
                marginBottom: 6,
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              className="lead-form-input"
              name="email"
              placeholder="Email"
              value={lead.email}
              onChange={handleChange}
              required
              type="email"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              className="lead-form-label"
              style={{
                display: "block",
                marginBottom: 6,
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              City
            </label>
            <input
              className="lead-form-input"
              name="city"
              placeholder="City"
              value={lead.city}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label
              className="lead-form-label"
              style={{
                display: "block",
                marginBottom: 6,
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              Status
            </label>
            <select
              className="lead-form-select"
              name="status"
              value={lead.status}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 16,
                background: "#f8fafc",
                outline: "none",
                transition: "border 0.2s",
              }}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="won">Won</option>
            </select>
          </div>
          <button
            className="lead-form-btn"
            type="submit"
            style={{
              width: "100%",
              padding: "12px 0",
              background: "linear-gradient(90deg,#667eea,#5a67d8)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 17,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(102,126,234,0.12)",
              transition: "background 0.2s",
            }}
          >
            {id ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </>
  );
}
