import React, { useState, useEffect, lazy, Suspense } from "react";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";
const FeaturesSection = lazy(() => import("../components/FeatureCard"));
const MidSection = lazy(() => import("../components/MidSection"));
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or asset loading
    const timer = setTimeout(() => setLoading(false), 1000); // 1.2 seconds
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-[#f7f5ff] transition-colors duration-300">
        {/* Responsive Navbar */}
        <nav className="w-full px-4 py-4 border-b border-purple-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/" className="flex items-center gap-2">
                <h1 className="text-4xl font-extrabold mb-4 text-purple-600 tracking-tight text-center">
                  Ghar Mitra 🏡🤝
                </h1>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-md text-purple-600 hover:text-purple-800 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  About
                </Link>
                <Link
                  to="/pg-listing"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  All Option
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Contact
                </Link>
              </div>

              <div className="flex items-center gap-4 ml-8">
                <Link to="/login">
                  <button className="px-6 py-2 font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/pg-listing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Option
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center gap-4 pt-4 px-3">
                <Link
                  to="/login"
                  className="flex-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className="w-full px-6 py-2 font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 py-10 md:py-20">
          <h1 className="mx-auto max-w-4xl text-center text-2xl font-bold text-gray-800 md:text-4xl lg:text-7xl dark:text-white">
            {"Manage your PG properties effortlessly"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block text-purple-700"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="mx-auto max-w-xl py-4 text-center text-lg text-gray-600 dark:text-gray-400"
          >
            Join over 3,125 property owners who&apos;ve simplified their
            management with our PG Management System.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link to="/register">
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-md transition-all mb-6">
                Get Started
              </button>
            </Link>
          </motion.div>
        </main>
        <section className="">
          <FeaturesSection />
        </section>
        <MidSection />
      </div>
      <Footer />
    </Suspense>
  );
};

export default HomePage;
