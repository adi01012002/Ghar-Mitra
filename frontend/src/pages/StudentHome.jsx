import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaUser, FaChevronDown, FaTimes } from "react-icons/fa";


const features = [
  "24/7 Security",
  "Wi-Fi Enabled",
  "Nutritious Meals",
  "Laundry Service",
  "Recreation Room",
  "Housekeeping",
];

const StudentHome = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleProfile = () => {
    setMenuOpen(false);
    setShowProfile(true);
  };

  const handleDashboard = () => {
    navigate(`/student/${user?._id}/dashboard`);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">

        <Link to="" className="flex items-center gap-2">
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
                onClick={handleProfile}
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

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-purple-100 to-white">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4 text-center">Welcome, {user?.username || "Student"}!</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
          Discover all the facilities and support available to you as a valued resident of our PG community.
        </p>
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-md transition-all mb-6"
          onClick={handleDashboard}
        >
          See Your Dashboard
        </button>
      </section>

      {/* Features Section */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Your Current PG Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature} className="bg-purple-50 p-8 rounded-xl shadow text-center">
                <h3 className="text-lg font-bold text-purple-600 mb-2">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complaints/Queries Section */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Raise a Query or Complaint</h2>
          <form className="space-y-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 min-h-[100px]"
              placeholder="Describe your issue or query..."
            />
            <button
              
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-xl font-semibold transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Rating Section */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Rate Your PG</h2>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-3xl text-yellow-400 cursor-pointer">★</span>
            ))}
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-xl font-semibold transition-all">
            Submit Rating
          </button>
        </div>
      </section>

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
            {/* You can use a StudentProfile component here if you have one */}
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200 min-w-[300px]">
              <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">Student Profile</h2>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-gray-700 w-32">Username:</span>
                  <span className="text-lg text-gray-900">{user?.username || "-"}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-gray-700 w-32">Email:</span>
                  <span className="text-lg text-gray-900">{user?.email || "-"}</span>
                </div>
                {/* Add more fields if needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHome;
