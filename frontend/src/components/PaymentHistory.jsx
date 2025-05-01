
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentHistoryAction } from "../redux/actions/paymentActions";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActions";
// import "../styles/PaymentHistory.css"; 


const PaymentHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { payments, loading, error } = useSelector((state) => state.payments);

    useEffect(() => {
        dispatch(fetchPaymentHistoryAction());
    }, [dispatch]);

    // Function to navigate to other pages
    // const handleNavigation = (path) => {
    //     navigate(path);
    // };
    // const user = useSelector((state) => state.auth.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    if (loading) return <p>Loading payment history...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
    <>
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
   
        <div className="py-12 px-4 sm:px-8 bg-[#f7f5ff] min-h-screen">
   
  <div className="max-w-3xl mx-auto">
            
            <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-600 tracking-tight">Payment History</h2>
            {payments.length > 0 ? (
      <div className="grid gap-6">
        {payments.map((payment) => (
          <div key={payment._id} className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-purple-200 hover:shadow-2xl transition-all">
            <h3 className="text-xl font-bold text-purple-600 text-center mb-2">{payment.id?.username}</h3>
            <div className="flex flex-wrap gap-6 justify-center text-gray-700">
              <div><span className="font-semibold">Amount:</span> {payment.amount} Rs</div>
              <div><span className="font-semibold">Date:</span> {new Date(payment.date).toLocaleDateString()}</div>
              <div><span className="font-semibold">Type:</span> {payment.type}</div>
            </div>
            <div className="mt-2 text-center text-gray-700 text-sm">{payment.description}</div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No payments found</p>
    )}
      </div>
    </div>
    </>
  );
};

export default PaymentHistory;


