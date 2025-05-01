import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudentProfile } from "../redux/actions/studentActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (user) {
      dispatch(fetchStudentProfile(user._id));
    }
  }, [dispatch, user]);

  const [menuOpen, setMenuOpen] = useState(false);


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };


  return (
    <>
            <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">
      
              <Link to={`/student/${user?._id}/dashboard`} className="flex items-center gap-2">
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
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
    
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl bg-white border border-purple-200 rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl font-extrabold mb-6 text-purple-600 tracking-tight text-center">My Profile</h1>
        {loading ? (
          <div className="text-center text-purple-600 font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">PG Name:</span>
              <span className="text-gray-900">{profile?.pgId?.name || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">PG Owner:</span>
              <span className="text-gray-900">{profile?.createdBy?.username || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">Name:</span>
              <span className="text-gray-900">{profile?.username || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">Email:</span>
              <span className="text-gray-900">{profile?.email || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">Address:</span>
              <span className="text-gray-900">{profile?.address || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">Contact No:</span>
              <span className="text-gray-900">{profile?.phone || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">Age:</span>
              <span className="text-gray-900">{profile?.age || '-'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-purple-700 w-32">Year:</span>
              <span className="text-gray-900">{profile?.year || '-'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default StudentProfile;
