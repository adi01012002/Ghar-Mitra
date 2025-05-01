


import axios from "axios";
// const BASE_URL = "http://localhost:8090";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addStudent = async (studentData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/students/add`,
      studentData,
      config
    );
    alert("Student successfully added!");
  
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};





export const fetchStudents = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
      const response = await axios.get(`${API_BASE_URL}/students/list`, config);
      console.log(response)
      console.log(response.data)
      
      if (response && response.data) {
          return response.data; 
      } else {
          throw new Error("API response does not contain 'students'");
      }
  } catch (error) {
      console.error("Error fetching students:", error);
      throw error; // Propagate error to action
  }
};





export const fetchStudentByIdService = async (id) => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found'); // Handle case where token is missing

    // Set up request headers with authorization token
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    // Make the API request to fetch the specific student by ID
    const response = await axios.get(`${API_BASE_URL}/students/${id}`, config);
    console.log(response)
    console.log('Fetched student from API:', response.data);
    
    return response.data; // Return the student's data
};


export const deleteStudent=async (id)=>{
  // Retrive token from local Storage 
  const token=localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const config ={headers:{Authorization:`Bearer ${token}`}};
  const response =await axios.delete(`${API_BASE_URL}/students/${id}`,config);
  alert("Student deleted successfully!");
  return response.data;
}



export const updateStudent = async (id, updatedData) => {
  console.log(id,updatedData);
    // Retrive token from local Storage 
    const token=localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const config ={headers:{Authorization:`Bearer ${token}`}};
  const { data } = await axios.put(`${API_BASE_URL}/students/edit/${id}`, updatedData,config);
  console.log(data)
  return data;
};




export const getStudentProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/${id}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT is stored in localStorage
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};



// Fetch Student Payments
export const getStudentPayments = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/${id}/payments`,{
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT is stored in localStorage
      }
  });
  console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};