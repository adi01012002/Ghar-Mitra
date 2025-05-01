import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  addStudentAction,
  updateStudentAction,
  fetchStudentByIdAction,
} from "../redux/actions/studentActions";
import { logoutUser } from "../redux/actions/authActions";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { fetchPGDataAction } from "../redux/actions/pgActions";
const StudentForm = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, loading, } = useSelector((state) => state.students);

  const { pgs } = useSelector((state) => state.pg || {});
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    address: "",
    phone: "",
    year: "",
    password: "",
    pgId: "",
  });

  useEffect(() => {
    dispatch(fetchPGDataAction());
  }, [dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(fetchStudentByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (student && id) {
      setFormData({
        username: student.username || "",
        age: student.age || "",
        email: student.email || "",
        address: student.address || "",
        phone: student.phone || "",
        year: student.year || "",
        password: "", // Do not populate password when editing
        pgId: student.pgId || "", // Populate PG ID for edit mode
      });
    }
  }, [student, id]);

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Assign the value directly
    }));
  };
   const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/");
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Dispatch update action for edit mode
      dispatch(updateStudentAction(id, formData));
      //   console.log(formData)
      navigate(`/student/${id}`);
    } else {
      // Dispatch add action for creating new student
      console.log(formData);
      dispatch(addStudentAction(formData));
      navigate(`/auth/dashboard`);
    }
  };

  return (
     <>
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">
          <Link to="/auth/dashboard" className="flex items-center gap-2">
                    <h1 className="text-4xl font-extrabold mb-4 text-purple-600 tracking-tight text-center">
                      Ghar Mitra 🏡🤝
                    </h1>
                  </Link>
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <FaUserCircle className="text-3xl text-purple-600" />
              <FaChevronDown className="text-gray-500 ml-1" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                {/* <button
                  className="w-full flex items-center px-4 py-2 hover:bg-purple-100 text-gray-800"
                  onClick={() => setShowProfile(true)}
                >
                  <FaUser className="mr-2" /> Profile
                </button> */}
                <button
                  className="w-full flex items-center px-4 py-2 hover:bg-purple-100 text-gray-800"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>
        <div className="min-h-screen flex items-center justify-center bg-[#f7f5ff]">
        <div className="w-full max-w-3xl bg-white border border-gray-400 rounded-3xl shadow-2xl p-16">
        <h2
          className={`text-4xl font-bold mb-6 text-gray-900 text-center ${
            id ? "text-green-700" : "text-purple-700"
          }`}
        >
          {id ? "Update Student Details" : "Add Student"}
        </h2>
        {/* {(localError || error) && (
          <p className="text-center text-red-500 mb-4">{localError || error}</p>
        )} */}
        <form className="space-y-12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {/* Column 1: Username, Age, Email, Password */}
            <div className="flex flex-col gap-8">
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter email"
                />
              </div>
              <div>
                {/* Password field only for add mode */}
                {!id ? (
                  <>
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                      placeholder="Enter password"
                    />
                  </>
                ) : null}
              </div>
            </div>
            {/* Column 2: Year, Address, Phone, PG */}
            <div className="flex flex-col gap-8">
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter year"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter phone"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">
                  PG
                </label>
                <select
                  name="pgId"
                  value={formData.pgId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                >
                  <option value="">Select PG</option>
                  {Array.isArray(pgs) && pgs.length > 0 ? (
                    pgs.map((pg) => (
                      <option key={pg._id} value={pg._id}>
                        {pg.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading PGs...</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4 ${
              id
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            }`}
          >
            {loading
              ? id
                ? "Updating..."
                : "Adding..."
              : id
              ? "Update Student"
              : "Add Student"}
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default StudentForm;
