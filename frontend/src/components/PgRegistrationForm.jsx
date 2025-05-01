import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerPGAction } from "../redux/actions/pgActions";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const PgRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalRooms: 0,
    totalBeds: 0,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.pg);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerPGAction(formData));
    navigate(`/auth/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
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
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-lg bg-white border border-purple-200 rounded-2xl shadow-lg p-10">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700">Register PG</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="PG Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg placeholder-gray-400 mb-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg placeholder-gray-400 mb-2"
            />
            <input
              type="number"
              name="totalRooms"
              placeholder="0"
              value={formData.totalRooms}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg placeholder-gray-400 mb-2"
            />
            <input
              type="number"
              name="totalBeds"
              placeholder="0"
              value={formData.totalBeds}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg placeholder-gray-400 mb-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-fit px-6 py-2 bg-purple-600 text-white rounded-md font-semibold shadow hover:bg-purple-700 transition-colors"
            >
              {loading ? "Registering..." : "Register PG"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PgRegistrationForm;
