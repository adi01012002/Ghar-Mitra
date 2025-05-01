import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconHeartHandshake, IconHomeHeart, IconChartBar } from '@tabler/icons-react';

const MidSection = () => {
    const navigate = useNavigate();
  const stats = [
    { value: "11,217+", label: "Happy Residents" },
    { value: "3,125+", label: "PGs Managed" },
    { value: "24/7", label: "Support Available" },
    { value: "98%", label: "Satisfaction Rate" }
  ];

  const handleFindPG = () => {
    navigate('/pg-listing');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center py-16 px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16">
        {/* Left: Main Hero Content */}
        <div className="flex-1 flex flex-col justify-center gap-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            We Don&#39;t Just Manage PGs,<br />
            <span className="text-blue-600">We Care About You</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl">
            Your comfort and security are our top priorities. Experience hassle-free PG living with our comprehensive management solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={handleFindPG} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-base transition-all duration-300 shadow-lg">
              Find Your PG
            </button>
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg text-base transition-all duration-300">
              Learn More
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 w-full max-w-3xl">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 p-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-700 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Feature Highlights */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-4">
              <span className="p-2 bg-blue-100 rounded-full"><IconHomeHeart className="text-blue-600" size={24} /></span>
              <h3 className="text-lg font-semibold text-gray-900">Premium PG Selection</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="p-2 bg-green-100 rounded-full"><IconCheck className="text-green-600" size={24} /></span>
              <h3 className="text-lg font-semibold text-gray-900">Verified Properties</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="p-2 bg-purple-100 rounded-full"><IconHeartHandshake className="text-purple-600" size={24} /></span>
              <h3 className="text-lg font-semibold text-gray-900">Trusted Community</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="p-2 bg-orange-100 rounded-full"><IconChartBar className="text-orange-600" size={24} /></span>
              <h3 className="text-lg font-semibold text-gray-900">Transparent Pricing</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidSection;




