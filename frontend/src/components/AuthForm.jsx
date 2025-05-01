
import React, { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../redux/actions/authActions";
import OtpVerification from "./OtpVerification";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const AuthForm = ({ isLogin, onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Remove auto-show OTP on email change. We'll show OTP only after form submit and registration success.
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submit
    if (!isLogin && !acceptTerms) {
      alert("Please accept the Terms and Conditions");
      return;
    }
    //setLoading(true);

    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
      if (onSubmit) onSubmit({ email: formData.email, password: formData.password });
    } else {
      try {
        await dispatch(registerUser(formData));
        setRegisteredEmail(formData.email);
        setShowOtp(true);
        // Do NOT call onSubmit for registration, to prevent premature redirect
      } catch (err) {
        alert("Registration error: " + (err.message || err));
      }
    }
    // setLoading(false);
  };






  
  // After registration, show OTP screen and redirect to login after successful OTP verification
  const handleOtpVerified = () => {
    setShowOtp(false);
    setRegisteredEmail("");
    // window.location.href = "/login";
    navigate("/login");

  };

  if (showOtp && registeredEmail) {
    return (
      <Suspense fallback={<div>Loading OTP Verification...</div>}>
        <OtpVerification email={registeredEmail} onVerified={handleOtpVerified} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5ff]">
      <div className="w-full max-w-lg bg-white border border-gray-400 rounded-2xl shadow-md p-10">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">{isLogin ? 'Login' : 'Create an account'}</h2>
        <form onSubmit={handleSubmit}>
{!isLogin &&(<>
  <div className="space-y-1">
            <label className="block text-base font-semibold text-gray-900 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
              placeholder="Enter your username"
            />
          </div>
</>)}
          <div className="space-y-1">
            <label className="block text-base font-semibold text-gray-900 mb-1">Your email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-base font-semibold text-gray-900 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {!isLogin && (
            <div>
              <div className="space-y-1">
              <label className="block text-base font-semibold text-gray-900 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {/* <option value="student">Student</option> */}
                  <option value="pgOwner">PG Owner</option>
                </select>
              </div>
<div className="flex items-start mt-4">
    <input
      type="checkbox"
      id="terms"
      checked={acceptTerms}
      onChange={(e) => setAcceptTerms(e.target.checked)}
      className="w-4 h-4 mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <label htmlFor="terms" className="ml-2 text-sm text-gray-900 leading-snug">
      I accept the{' '}
      <a href="#" className="text-purple-600 hover:text-purple-800 underline">
        Terms and Conditions
      </a>
    </label>
                 </div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-lg mt-4 ${
              loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Create an account"}
          </button>
        </form>
        {isLogin && (
          <p className="mt-4 text-center text-sm">
            <Link to="/forgot-password" className="text-purple-600 hover:underline">Forgot Password?</Link>
          </p>
        )}
        {isLogin ? (
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(AuthForm);
