import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Verify = () => {
  const [status, setStatus] = useState("Verifying...");
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      axios
        .post(`${API_BASE_URL}/auth/verify`, { token })
        .then(() => setStatus("Your login is verified!"))
        .catch(() => setStatus("Verification failed or link expired."));
    } else {
      setStatus("Invalid verification link.");
    }
  }, [token]);

  return <div>{status}</div>;
};

export default Verify;
