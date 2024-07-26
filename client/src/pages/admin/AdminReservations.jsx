import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const ReservationsView = () => {
  const { token } = useAuth();
  const [aggregatedReservations, setAggregatedReservations] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalReservations, setTotalReservations] = useState(0);

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
        };
      }

      acc[key].count += 1;
      acc[key].reservations.push(reservation);
      return acc;
    }, {});
  };

  const handleRowClick = (propertyId) => {
    if (selectedProperty === propertyId) {
      setSelectedProperty(null);
    } else {
      setSelectedProperty(propertyId);
    }
  };

  if (loading) {
    return <p>Loading Reservations...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Reservations Overview
      </h2>

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
            </tr>
          </thead>
          <tbody>
            {Object.keys(aggregatedReservations).map((key) => {
              const { title, hostName, imageUrl, count, reservations } =
                aggregatedReservations[key];
              return (
                <React.Fragment key={key}>
                  <tr
                    className="border-b cursor-pointer"
                    onClick={() => handleRowClick(key)}
                  >
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
                  </tr>
                  {selectedProperty === key &&
                    reservations.map((reservation) => (
                      <tr key={reservation._id} className="border-b bg-gray-50">
                        <td
                          colSpan="3"
                          className="py-3 px-4 text-sm text-gray-700"
                        >
                          <div className="flex flex-wrap space-x-4">
                            <div className="flex-1">
                              <strong>Guest:</strong>{" "}
                              {reservation.user.firstName}{" "}
                              {reservation.user.lastName}
                            </div>
                            <div className="flex-1">
                              <strong>Check-In:</strong>{" "}
                              {new Date(
                                reservation.checkInDate
                              ).toLocaleDateString()}
                            </div>
                            <div className="flex-1">
                              <strong>Check-Out:</strong>{" "}
                              {new Date(
                                reservation.checkOutDate
                              ).toLocaleDateString()}
                            </div>
                            <div className="flex-1">
                              <strong>Total Price:</strong>{" "}
                              {reservation.totalPrice}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
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
