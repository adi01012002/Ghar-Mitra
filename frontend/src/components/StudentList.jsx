
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsAction } from '../redux/actions/studentActions';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../redux/actions/authActions';

const StudentList = () => {
    const dispatch = useDispatch();
    const { students = [], loading, error } = useSelector((state) => state.students || {});
    const navigate = useNavigate(); // Initialize useNavigate
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchStudentsAction());
    }, [dispatch]);

    const handleViewMoreClick = (id) => {
        navigate(`/student/${id}`);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
            {/* Student List */}
            <section className="py-12 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight">Student List</h2>
                    {students.length === 0 ? (
                        <p className="text-center text-gray-500">No students found</p>
                    ) : (
                        <div className="grid gap-6">
                            {students.map((student) => (
                                <div key={student._id} className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-2xl transition-all">
                                    <p className="text-xl font-bold text-purple-600 mb-2">{student.username}</p>
                                    <p className="mb-2"><span className="font-semibold">Pg-Name:</span> {student?.pgId?.name}</p>
                                    <button
                                        className="mt-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition-colors"
                                        onClick={() => handleViewMoreClick(student._id)}
                                    >
                                        View More Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default StudentList;
