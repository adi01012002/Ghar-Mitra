import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconHome, IconUsers, IconBed, IconArrowRight } from '@tabler/icons-react';
import LoadingSpinner from './LoadingSpinner';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PGListings = () => {
  const [pgData, setPgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPGData = async () => {
      try {  // http://localhost:8090
        const response = await fetch(`${API_BASE_URL}/pg/all-pg-data`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch PG data');
        }
        const data = await response.json();
        setPgData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPGData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-purple-700 font-semibold">Loading PG listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <p className="text-red-600 font-bold text-lg">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-purple-700 tracking-tight">Available PG Accommodations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pgData.map((pg) => (
            <div 
              key={pg._id}
              className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200 hover:shadow-2xl hover:border-purple-400 transition-all duration-200 group cursor-pointer"
              onClick={() => navigate(`/pg-details/${pg._id}`)}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 group-hover:scale-110 transition-transform">
                  <IconHome className="text-purple-600" size={28} />
                </span>
                <h3 className="text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">{pg.name}</h3>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <IconUsers className="text-purple-400" size={20} />
                  <span className="text-gray-700 font-semibold">{pg.totalStudents} residents</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconBed className="text-purple-400" size={20} />
                  <span className="text-gray-700 font-semibold">{pg.availableBeds} beds available</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-lg font-bold text-purple-600 group-hover:text-purple-800 transition-colors">
                  View Details
                </span>
                <IconArrowRight className="text-purple-600 group-hover:text-purple-800 transition-colors" size={22} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PGListings;