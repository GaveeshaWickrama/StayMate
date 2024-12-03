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
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h2 className="flex items-center text-3xl font-bold text-gray-800">
          <MdAccountCircle className="mr-4 text-blue-500 text-3xl" />
          Manage Users
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center bg-gray-100 p-6 rounded-md shadow-sm hover:bg-gray-200">
          <Link to="/admin/Tenants">
            <MdAccountCircle size={70} className="text-blue-500 mx-auto mb-4" />
            <p className="mt-2 text-xl font-semibold text-gray-700">Tenants</p>
          </Link>
        </div>
        <div className="text-center bg-gray-100 p-6 rounded-md shadow-sm hover:bg-gray-200">
          <Link to="/admin/Technicians">
            <MdBuild size={70} className="text-green-500 mx-auto mb-4" />
            <p className="mt-2 text-xl font-semibold text-gray-700">
              Technicians
            </p>
          </Link>
        </div>
        <div className="text-center bg-gray-100 p-6 rounded-md shadow-sm hover:bg-gray-200">
          <Link to="/admin/PropertyOwners">
            <MdHomeWork size={70} className="text-red-500 mx-auto mb-4" />
            <p className="mt-2 text-xl font-semibold text-gray-700">
              Property Owners
            </p>
          </Link>
        </div>
        <div className="text-center bg-gray-100 p-6 rounded-md shadow-sm hover:bg-gray-200">
          <Link to="/admin/Moderator">
            <MdSupervisorAccount
              size={70}
              className="text-purple-500 mx-auto mb-4"
            />
            <p className="mt-2 text-xl font-semibold text-gray-700">
              Moderators
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;