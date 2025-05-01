import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OtpVerification = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const cleanEmail = email.trim();
      const cleanOtp = otp.trim();
      console.log("Verifying OTP with:", { email: cleanEmail, otp: cleanOtp });
      const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email: cleanEmail, otp: cleanOtp });
      setMessage(res.data.message);
      setTimeout(() => {
        if (onVerified) {
          onVerified();
        } else {
          navigate("/login");
        }
      }, 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to verify OTP. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ background: "#fff", boxShadow: "0 2px 8px #0001", borderRadius: 12, padding: 32, width: "100%", maxWidth: 400, border: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Verify Email</h2>
        <p style={{ color: "#374151", fontSize: 14, marginBottom: 24 }}>Enter the 4-digit OTP sent to <b>{email}</b></p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            pattern="\d{4}"
            required
            placeholder="Enter OTP"
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: 6, marginBottom: 16, textAlign: "center", fontSize: 18, letterSpacing: 8 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "10px", color: "#fff", background: loading ? "#60a5fa" : "#2563eb", border: "none", borderRadius: 6, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, marginBottom: 10 }}
          >
            Verify OTP
          </button>
          {message && <p style={{ color: message.includes("success") ? "#16a34a" : "#dc2626", fontSize: 13, textAlign: "center", marginTop: 8 }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
