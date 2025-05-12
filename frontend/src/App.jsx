import React, { lazy, Suspense, memo } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register } from "./services/authServices";
import HomePage from "./pages/HomePage";
import LoadingSpinner from "./components/LoadingSpinner"; // Create this component

// Memoized components
const MemoizedLoginPage = memo(lazy(() => import("./components/LoginPage")));
const MemoizedRegisterPage = memo(lazy(() => import("./components/RegisterPage")));

// Lazy loaded components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const OwnerHome = lazy(() => import("./pages/OwnerHome"));
const StudentHome = lazy(() => import("./pages/StudentHome"));
const StudentForm = lazy(() => import("./components/StudentForm"));
const StudentList = lazy(() => import("./components/StudentList"));
const StudentDetails = lazy(() => import("./components/StudentDetails"));
const AddPayment = lazy(() => import("./components/AddPayment"));
const PaymentHistory = lazy(() => import("./components/PaymentHistory"));
const StudentPayment = lazy(() => import("./components/StudentPayment"));
const PgRegistrationForm = lazy(() => import("./components/PgRegistrationForm"));
const PgData = lazy(() => import("./components/pgData"));
const StudentDashboard = lazy(() => import("./components/StudentDashboard"));
const StudentProfile = lazy(() => import("./components/StudentProfile"));
const StudentPayments = lazy(() => import("./components/StudentPayments"));
const PGListings = lazy(() => import("./components/PGListings"));
const Verify = lazy(() => import("./pages/Verify"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (userData) => {
    try {
      const data = await login(userData);
      console.log("Logged in successfully:", data);
      
      if (data.role === "student") {
        navigate(`/student-home`);
      } else if (data.role === "pgOwner") {
        navigate("/owner-home");
      } else {
        console.error("Unknown role:", data.role);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      console.log("Registered successfully:", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<HomePage />} />
        <Route path="auth/dashboard" element={<Dashboard />} />
        <Route path="/owner-home" element={<OwnerHome />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/login" element={<MemoizedLoginPage onSubmit={handleLogin} />} />
        <Route path="/register" element={<MemoizedRegisterPage onSubmit={handleRegister} />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/students/:id/edit" element={<StudentForm />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/students/:id/add-payment" element={<AddPayment />} />
        <Route path="/auth/payment-history" element={<PaymentHistory />} />
        <Route path="/students/:id/payment-history" element={<StudentPayment />} />
        <Route path="/student/:id/profile" element={<StudentProfile />} />
        <Route path="/student/:id/payments" element={<StudentPayments />} />
        <Route path="/auth/register-pg" element={<PgRegistrationForm />} />
        <Route path="/auth/pg-status" element={<PgData />} />
        <Route path="/student/:id/dashboard" element={<StudentDashboard />} />
        <Route path="/pg-listing" element={<PGListings />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Suspense>
  );
};

export default memo(App);







