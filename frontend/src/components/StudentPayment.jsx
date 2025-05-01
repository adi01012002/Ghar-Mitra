import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentPaymentsAction } from "../redux/actions/paymentActions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const StudentPayment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { payments, loading, error } = useSelector((state) => state.payments);
  // const { student } = useSelector((state) => state.students || {});
  useEffect(() => {
    dispatch(fetchStudentPaymentsAction(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-gray-500">Loading payments...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">
        <button onClick={() => handleNavigation('/students')} className="text-lg font-bold text-purple-700">Students</button>
        <h1 className="text-2xl font-extrabold text-purple-700 tracking-tight">Ghar Mitra 🏡🤝</h1>
        <div />
      </nav>
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700 tracking-tight">Payment History for Student</h2>
        {payments && payments.length > 0 ? (
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
          <p className="text-center text-gray-500">No payments found for this student.</p>
        )}
      </div>
    </div>
  );
};

export default StudentPayment;
