// src/components/StudentDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {fetchStudentByIdAction,deleteStudentAction}  from '../redux/actions/studentActions';  // Define action to fetch a single student by ID
import { fetchStudentPaymentsAction } from '../redux/actions/paymentActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const StudentDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { student, loading, error } = useSelector((state) => state.students || {});
    // const { student, loading, error } = useSelector((state) => ({
    //     student: state.student || null,  // Fallback to null if undefined
    //     loading: state.student|| false,  // Fallback to false if undefined
    //     error: state.student || null        // Fallback to null if undefined
    // }));
    
    useEffect(() => {
        dispatch(fetchStudentByIdAction(id));
    }, [dispatch, id]);

    const handleUpdateClick = () => {
        // console.log('Update Student:', student);
        navigate(`/students/${student._id}/edit`, { state: { student } });
        // Add functionality here to update student
    };

    const handleDeleteClick = () => {
        // console.log('Delete Student ID:', student._id);

        // Add functionality here to delete student
        dispatch(deleteStudentAction(student._id));
        navigate('/students');
    };

    // const handlePaymentClick = () => {
    //     console.log('View Payment History for Student ID:', student._id);
    //     // Add functionality here for payment history
    // };
    const handlePaymentClick = () => {
        dispatch(fetchStudentPaymentsAction(student._id));
        navigate(`/students/${student._id}/payment-history`);
    };

    // Inside StudentDetails component
const handleAddPaymentClick = () => {
    navigate(`/students/${student._id}/add-payment`);
};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    // console.log(student)
    if (!student) return <p>Student details are loading...</p>;

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b border-purple-200">
                <button onClick={() => handleNavigation('/students')} className="text-lg font-bold text-purple-700">Students</button>
                <div className="relative">
                    {/* Optionally add user/profile menu here if available */}
                </div>
            </nav>

            {/* Student Card */}
            <div className="max-w-xl mx-auto mt-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
                    <h2 className="text-3xl font-extrabold text-purple-700 mb-4 text-center">{student.username}</h2>
                    <div className="space-y-2 text-lg">
                        <p><span className="font-semibold">Pg-Name:</span> {student?.pgId?.name}</p>
                        {/* <p><span className="font-semibold">Pg-Owner:</span> {student?.createdBy?.username}</p> */}
                        <p><span className="font-semibold">Year:</span> {student.year}</p>
                        <p><span className="font-semibold">Age:</span> {student.age}</p>
                        <p><span className="font-semibold">Email:</span> {student.email}</p>
                        <p><span className="font-semibold">Phone Number:</span> {student.phone}</p>
                        <p><span className="font-semibold">Address:</span> {student.address}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <button onClick={handleUpdateClick} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors">Update</button>
                        <button onClick={handleDeleteClick} className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-colors">Delete</button>
                        <button onClick={handleAddPaymentClick} className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition-colors">Add Payment</button>
                        <button onClick={handlePaymentClick} className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors">View Payment History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;

