import React, { useState,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
import { FaUserPlus, FaListAlt, FaMoneyBill, FaHome, FaBuilding, FaUserCircle, FaChevronDown, FaUser, FaSignOutAlt, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">
         <Link to="/owner-home" className="flex items-center gap-2">
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
              <button
                className="w-full flex items-center px-4 py-2 hover:bg-purple-100 text-gray-800"
                onClick={() => setShowProfile(true)}
              >
                <FaUser className="mr-2" /> Profile
              </button>
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


      {/* Dashboard Main Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:col-span-1 bg-white rounded-xl shadow-lg border border-purple-200 p-6 flex flex-col gap-4 mb-8 md:mb-0">
          <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold" onClick={() => handleNavigation("/add-student")}> <FaUserPlus /> Add Student </button>
          <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold" onClick={() => handleNavigation("/students")}> <FaListAlt /> All Students </button>
          <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold" onClick={() => handleNavigation("/auth/payment-history")}> <FaMoneyBill /> My Payments </button>
          <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold" onClick={() => handleNavigation("/auth/register-pg")}> <FaHome /> Register PG </button>
          <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold" onClick={() => handleNavigation("/auth/pg-status")}> <FaBuilding /> My PG Status </button>
        </aside>
        {/* Main Content */}
        <main className="md:col-span-3 bg-white rounded-xl shadow-lg border border-purple-200 p-8">
          <h2 className="text-3xl font-extrabold mb-6 text-purple-600 tracking-tight">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 text-purple-600">Student Management</h3>
              <p className="text-gray-700">Add, edit, and track all your PG students in one place with ease.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 text-purple-600">PG Listings</h3>
              <p className="text-gray-700">Register and manage multiple PG properties with detailed information.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 text-purple-600">Payments & Analytics</h3>
              <p className="text-gray-700">Track payments, view analytics, and get insights to optimize your business.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 text-purple-600">Support & Feedback</h3>
              <p className="text-gray-700">Get help and give feedback to improve your experience.</p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">Select an option from the sidebar to get started!</div>
        </main>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-sm">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow"
              onClick={() => setShowProfile(false)}
            >
              <FaTimes className="text-gray-500" />
            </button>
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200 min-w-[300px]">
              <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">Owner Profile</h2>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-gray-700 w-32">Username:</span>
                  <span className="text-lg text-gray-900">{user?.username || "-"}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-gray-700 w-32">Email:</span>
                  <span className="text-lg text-gray-900">{user?.email || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;