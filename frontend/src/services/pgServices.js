// src/services/pgServices.js
import axios from 'axios';
// const BASE_URL = "http://localhost:8090";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// API call to register a new PG
export const registerPGService = async (pgData) => {
    const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.post(`${API_BASE_URL}/pg/registerPg`, pgData,config);
    alert("Your PG successfully Registerd");
    return data;
};

// API call to fetch PG data
export const fetchPGDataService = async () => {
    const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get(`${API_BASE_URL}/pg/pg-data`,config);
    return data;
};


// export const fetchOwnerPGs = async (userId) => {
//   console.log(userId)
//   const response = await axios.get(`${BASE_URL}/pg/owner/${userId}`);
//   return response.data;
// };