import React , { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentPayments } from "../redux/actions/studentActions"; // Fetch student payments action
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";


const StudentPayments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { payments, loading, error } = useSelector((state) => state.students);
// console.log(user)
const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchStudentPayments(user._id)); // Fetch payments when component mounts
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
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
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight">My Payments</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : payments?.length > 0 ? (
          <div className="grid gap-6">
            {payments.map((payment) => (
              <div key={payment._id} className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-2xl transition-all">
                <p className="text-lg font-bold text-purple-600 mb-2">Amount: {payment.amount}</p>
                <p className="mb-1"><span className="font-semibold">Date:</span> {new Date(payment.date).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-semibold">Type:</span> {payment.type}</p>
                <p className="mb-1"><span className="font-semibold">Description:</span> {payment.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentPayments;
