import React from "react";
import { Link } from "react-router-dom";
import {
  MdAccountCircle,
  MdBuild,
  MdHomeWork,
  MdSupervisorAccount,
} from "react-icons/md";

function ManageUsers() {
  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="flex mb-8 border-b-4 border-purple-600 p-6 rounded-md shadow-lg bg-white">
        <h2 className="flex items-center text-4xl font-extrabold text-gray-800">
          <MdAccountCircle className="mr-4 text-purple-600 text-4xl" />
          Manage Users
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center bg-blue-100 p-8 rounded-lg shadow-lg hover:bg-blue-200 transition duration-300 ease-in-out">
          <Link to="/admin/tenants">
            <MdAccountCircle size={80} className="text-blue-600 mx-auto mb-4" />
            <p className="mt-3 text-2xl font-semibold text-gray-800">Tenants</p>
          </Link>
        </div>
        <div className="text-center bg-green-100 p-8 rounded-lg shadow-lg hover:bg-green-200 transition duration-300 ease-in-out">
          <Link to="/admin/technicians">
            <MdBuild size={80} className="text-green-600 mx-auto mb-4" />
            <p className="mt-3 text-2xl font-semibold text-gray-800">Technicians</p>
          </Link>
        </div>
        <div className="text-center bg-red-100 p-8 rounded-lg shadow-lg hover:bg-red-200 transition duration-300 ease-in-out">
          <Link to="/admin/propertyowners">
            <MdHomeWork size={80} className="text-red-600 mx-auto mb-4" />
            <p className="mt-3 text-2xl font-semibold text-gray-800">Property Owners</p>
          </Link>
        </div>
        <div className="text-center bg-purple-100 p-8 rounded-lg shadow-lg hover:bg-purple-200 transition duration-300 ease-in-out">
          <Link to="/admin/moderators">
            <MdSupervisorAccount size={80} className="text-purple-600 mx-auto mb-4" />
            <p className="mt-3 text-2xl font-semibold text-gray-800">Moderators</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
