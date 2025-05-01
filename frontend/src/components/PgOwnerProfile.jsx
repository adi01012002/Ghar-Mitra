import React from "react";
import { useSelector } from "react-redux";

const PgOwnerProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mt-10">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 dark:text-white tracking-tight">PG Owner Profile</h2>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <span className="font-semibold text-gray-700 dark:text-gray-200 w-40">Username:</span>
          <span className="text-lg text-gray-900 dark:text-white">{user?.username || "-"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <span className="font-semibold text-gray-700 dark:text-gray-200 w-40">Email:</span>
          <span className="text-lg text-gray-900 dark:text-white">{user?.email || "-"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <span className="font-semibold text-gray-700 dark:text-gray-200 w-40">Role:</span>
          <span className="text-lg text-gray-900 dark:text-white capitalize">{user?.role || "-"}</span>
        </div>
        {/* Add more profile fields as needed */}
      </div>
    </div>
  );
};

export default PgOwnerProfile;
