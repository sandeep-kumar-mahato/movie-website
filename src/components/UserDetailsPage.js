import React from "react";
import { useLocation } from "react-router-dom";

const UserDetailsPage = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};

  // Retrieve user details from localStorage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // Combine existing userDetails with formData
  const mergedUserDetails = { ...userDetails, ...formData };

  return (
    <div className="container mx-auto h-screen px-8 lg:px-16 py-8 mt-16 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">User Details</h2>
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-2">User Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-100">
              <strong>Movie Name:</strong> {mergedUserDetails.movieName}
            </p>
            <p className="text-gray-100">
              <strong>Genre:</strong> {mergedUserDetails.genre}
            </p>
            <p className="text-gray-100">
              <strong>Language:</strong> {mergedUserDetails.language}
            </p>
          </div>
          <div>{/* Add more user details here */}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
