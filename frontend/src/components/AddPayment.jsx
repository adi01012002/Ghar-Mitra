import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addPaymentAction } from '../redux/actions/paymentActions';  // Define this action in your actions

const AddPayment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        date: '',
        type: '',
        description: ''
    });
    const { loading, error } = useSelector((state) => state.payments);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentAction(id, paymentDetails));
        navigate(`/student/${id}`); 
    };
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
      <>
        <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">
                <button onClick={() => handleNavigation('/students')} className="text-lg font-bold text-purple-700">Students</button>
                <div className="relative">
                    {/* Optionally add user/profile menu here if available */}
                </div>
            </nav>
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5ff]">
        
        <div className="w-full max-w-lg bg-white border border-gray-400 rounded-2xl shadow-md p-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 text-center">Add Payment for Student</h2>
          {loading && <p className="text-center text-purple-600 mb-2">Adding payment...</p>}
          {error && <p className="text-center text-red-500 mb-2">Error: {error}</p>}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={paymentDetails.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={paymentDetails.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={paymentDetails.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all"
                  placeholder="Enter type"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-1">Description</label>
                <textarea
                  name="description"
                  value={paymentDetails.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-gray-50 placeholder-gray-400 transition-all min-h-[48px]"
                  placeholder="Enter description"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-lg shadow-md bg-purple-600 hover:bg-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-4"
            >
              {loading ? "Adding..." : "Add Payment"}
            </button>
          </form>
        </div>
      </div>
      </>
    );
};

export default AddPayment;
