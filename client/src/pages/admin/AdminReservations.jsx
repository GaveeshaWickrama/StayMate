import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ReservationsView = () => {
  const { token } = useAuth();
  const [aggregatedReservations, setAggregatedReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReservations, setTotalReservations] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reservation/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        const aggregatedData = aggregateReservations(data);
        setAggregatedReservations(aggregatedData);
        setTotalReservations(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchReservations();
    }
  }, [token]);

  const aggregateReservations = (reservations) => {
    return reservations.reduce((acc, reservation) => {
      const { property } = reservation;
      const key = property._id;

      if (!acc[key]) {
        const imageUrl = property.images.length
          ? `${import.meta.env.VITE_API_URL}/${property.images[0].url}`
          : "";

        acc[key] = {
          title: property.title,
          hostName: `${property.host_id.firstName} ${property.host_id.lastName}`,
          imageUrl,
          count: 0,
          reservations: [],
          property: { ...property, reservations: [] }, // Add the full property data and initialize reservations array
        };
      }

      acc[key].count += 1;
      acc[key].reservations.push(reservation);
      acc[key].property.reservations.push(reservation); // Add reservation to the property
      return acc;
    }, {});
  };

  const handleViewClick = (property) => {
    navigate(`/admin/reservations/view`, { state: { property } });
  };

  if (loading) {
    return <p>Loading Reservations...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="flex mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h2 className="flex items-center text-3xl font-bold text-gray-800">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="mr-4 text-blue-500 text-3xl"
          />
          Reservations Overview
        </h2>
      </div>

      {/* Reservations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Property
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Hosted By
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Number of Reservations
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(aggregatedReservations).map((key) => {
              const { title, hostName, imageUrl, count, property } =
                aggregatedReservations[key];
              return (
                <React.Fragment key={key}>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <div className="flex flex-col items-start">
                          <span>{title}</span>
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={title}
                              className="h-16 w-16 object-cover rounded mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {hostName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{count}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleViewClick(property)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total Reservations Card */}
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="text-blue-500 text-3xl mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">Total Reservations</h3>
            <p className="text-2xl">{totalReservations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsView;
