import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

const ViewComplaintsPage = () => {

    const currentUser = useAuth();
    const token = currentUser.token;
    console.log("View Complaints PAGE user ",currentUser);

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch complaints for the logged-in guest
        console.log("Inside useeffect complaints view");
        const fetchComplaints = async () => {
        try {
            //const response = await axios.get("/api/complaints");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/complaints/viewGuestComplaints`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Cache-Control': 'no-cache',
                    },
                }
            );

            console.log("fetchComplaints",response.data);
            // Assuming the API filters complaints based on the logged-in user
            setComplaints(response.data);
            setLoading(false);
        } catch (err) {
            console.log("Inside catch in complaint");
            setError("Failed to load complaints. Please try again later.");
            setLoading(false);
        }
        };

        fetchComplaints();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Property</th>
                    <th className="border border-gray-300 px-4 py-2">Host Name</th>
                    <th className="border border-gray-300 px-4 py-2">Technician Name</th>
                </tr>
                </thead>
                <tbody>
                {complaints.map((complaint, index) => (
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
                    <td className="border border-gray-300 px-4 py-2">{complaint.status}</td>
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
        </div>
    )
}

export default ViewComplaintsPage
