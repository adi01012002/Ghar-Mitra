import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconMail, IconPhone, IconMapPin, IconClock } from "@tabler/icons-react";

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Handle error if needed
      console.log(error)

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative w-full bg-white border-t border-purple-100 mt-16">
      <div className="absolute inset-x-0 top-0 h-px w-full bg-purple-100">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-8 lg:px-12 xl:px-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-extrabold text-purple-700 mb-4">Ghar Mitra</h3>
            <p className="text-gray-600 mb-6">
              Your trusted PG management partner for a seamless living experience.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <IconMapPin className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                <span className="text-gray-700">123 PG Lane, City, India</span>
              </div>
              <div className="flex items-center">
                <IconMail className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-700">support@gharmitra.com</span>
              </div>
              <div className="flex items-center">
                <IconPhone className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-700">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <IconClock className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-700">Mon-Sat: 9AM - 8PM</span>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-purple-700 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-700 transition-colors font-medium">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-700 transition-colors font-medium">About</Link>
              </li>
              <li>
                <Link to="/pg-listing" className="text-gray-600 hover:text-purple-700 transition-colors font-medium">PGs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple-700 transition-colors font-medium">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple-700 transition-colors font-medium">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-purple-700 transition-colors font-medium">Terms of Service</Link>
              </li>
            </ul>
          </div>
          {/* Enquiry Form */}
          <div>
            <h3 className="text-lg font-bold text-purple-700 mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="footer-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="footer-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="footer-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="footer-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="footer-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="footer-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-bold text-white transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message
                  </span>
                )}
              </motion.button>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-purple-100 text-center">
          <p className="text-purple-700 text-sm font-semibold">&copy; {new Date().getFullYear()} Ghar Mitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
