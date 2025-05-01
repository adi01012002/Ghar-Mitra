import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import { fetchPGDataAction } from '../redux/actions/pgActions';
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PGStatus = () => {
  const dispatch = useDispatch();
  const { pgs, loading, error } = useSelector((state) => state.pg);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // const handleProfile = () => {
  //   navigate('/profile');
  // };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchPGDataAction());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
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
      <section className="py-12 px-4 sm:px-8 bg-gradient-to-br from-purple-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight">PG Status</h2>
          {pgs.length === 0 ? (
            <p className="text-center text-gray-500">No PGs found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pgs.map((pg, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-2xl transition-all">
                  <h3 className="text-xl font-bold text-purple-600 mb-2">{pg.name}</h3>
                  <div className="space-y-1">
                    <p><span className="font-semibold">Total Students:</span> {pg.totalStudents}</p>
                    <p><span className="font-semibold">Available Rooms:</span> {pg.availableRooms}</p>
                    <p><span className="font-semibold">Available Beds:</span> {pg.availableBeds}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PGStatus;
