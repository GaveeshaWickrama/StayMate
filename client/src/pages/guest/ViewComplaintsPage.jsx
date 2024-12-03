import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

const ViewComplaintsPage = () => {
  const currentUser = useAuth();
  const token = currentUser.token;

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");
  const [hostFilter, setHostFilter] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/complaints/viewGuestComplaints`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache",
            },
          }
        );
        setComplaints(response.data);
        setFilteredComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load complaints. Please try again later.");
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Filter logic
  useEffect(() => {
    const applyFilters = () => {
      const filtered = complaints.filter((complaint) => {
        const matchesStatus =
          !statusFilter || complaint.status === statusFilter;
        const matchesProperty =
          !propertyFilter ||
          complaint.reservationId?.property?.title
            ?.toLowerCase()
            .includes(propertyFilter.toLowerCase());
        const matchesHost =
          !hostFilter ||
          `${complaint.reservationId?.property?.host_id?.firstName} ${complaint.reservationId?.property?.host_id?.lastName}`
            .toLowerCase()
            .includes(hostFilter.toLowerCase());
        return matchesStatus && matchesProperty && matchesHost;
      });
      setFilteredComplaints(filtered);
    };

    applyFilters();
  }, [statusFilter, propertyFilter, hostFilter, complaints]);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Guest Complaints</h2>

      {/* Filters Section */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pendingTechnicianApproval">pendingTechnicianApproval</option>
            <option value="active">active</option>
            <option value="completed">pendingHostDecision</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Property</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Search by property"
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Host</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Search by host"
            value={hostFilter}
            onChange={(e) => setHostFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading complaints...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Property</th>
                <th className="border border-gray-300 px-4 py-2">Host Name</th>
                <th className="border border-gray-300 px-4 py-2">Technician Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.timestamp || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.reservationId?.property?.title || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.reservationId?.property?.host_id
                      ? `${complaint.reservationId.property.host_id.firstName} ${complaint.reservationId.property.host_id.lastName}`
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.technician?.userId
                      ? `${complaint.technician.userId.firstName} ${complaint.technician.userId.lastName}`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewComplaintsPage;
