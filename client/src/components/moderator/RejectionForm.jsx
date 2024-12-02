import React, { useState } from 'react';
import axios from 'axios';

const RejectionForm = ({ propertyId, token, currentUser, onClose }) => {
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [otherReasonText, setOtherReasonText] = useState('');
  const [propertyOwnershipReason, setPropertyOwnershipReason] = useState('');
  
  const reasons = [
    { label: "Misleading Description", subOptions: [] },
    { label: "Proof of Amenities Missing", subOptions: ["WiFi", "Parking", "Swimming Pool", "Gym"] },
    { label: "Proof of Facilities Missing", subOptions: ["Electricity", "Water Supply", "Security"] },
    { label: "Property Not Belonging to You", subOptions: [] },
    { label: "Other", subOptions: [] },
  ];

  const handleCheckboxChange = (reason, checked) => {
    if (checked) {
      setRejectionReasons([...rejectionReasons, reason]);
    } else {
      setRejectionReasons(rejectionReasons.filter(r => r !== reason));
      if (reason === "Property Not Belonging to You") {
        setPropertyOwnershipReason('');
      }
      if (reason === "Other") {
        setOtherReasonText('');
      }
    }
  };

  const handleAmenityChange = (amenity, checked) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/moderator/rejectProperty/${propertyId}`, 
        { 
          rejectionReasons, 
          selectedAmenities, 
          propertyOwnershipReason, 
          otherReasonText, 
          moderator: currentUser.id 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Property Rejected:', response.data);
        alert('Property rejected successfully');
        onClose();
      } else {
        alert('Failed to reject property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while rejecting the property.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-2 w-full">
      <h2 className="text-2xl font-bold text-black-600 mb-4">Select reasons for rejection:</h2>
      <div>
        {reasons.map(reason => (
          <div key={reason.label} className="mb-4">
            <div className="flex text-lg">
              <input
                type="checkbox"
                id={reason.label}
                value={reason.label}
                onChange={(e) => handleCheckboxChange(reason.label, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={reason.label} className="text-gray-700">{reason.label}</label>
            </div>
            {rejectionReasons.includes(reason.label) && reason.subOptions.length > 0 && (
              <div className="ml-6 mt-2">
                <h3 className="text-lg font-semibold text-gray-600">Specify:</h3>
                {reason.subOptions.map(subOption => (
                  <div key={subOption} className="flex text-lg">
                    <input
                      type="checkbox"
                      id={subOption}
                      value={subOption}
                      onChange={(e) => handleAmenityChange(subOption, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={subOption} className="text-gray-600">{subOption}</label>
                  </div>
                ))}
              </div>
            )}
            {reason.label === "Property Not Belonging to You" && rejectionReasons.includes(reason.label) && (
              <div className="ml-6 mt-2">
                <label htmlFor="propertyOwnershipReason" className="text-lg text-gray-700">
                  Provide details:
                </label>
                <textarea
                  id="propertyOwnershipReason"
                  value={propertyOwnershipReason}
                  onChange={(e) => setPropertyOwnershipReason(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Enter reason why the property does not belong to the user..."
                />
              </div>
            )}
            {reason.label === "Other" && rejectionReasons.includes(reason.label) && (
              <div className="ml-6 mt-2">
                <label htmlFor="otherReasonText" className="text-lg text-gray-700">
                  Specify other reason:
                </label>
                <textarea
                  id="otherReasonText"
                  value={otherReasonText}
                  onChange={(e) => setOtherReasonText(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Enter additional details..."
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold mx-2 flex-grow"
          onClick={handleSubmit}
        >
          Submit Rejection
        </button>
        <button 
          className="bg-gray-600 text-white px-4 py-2 rounded font-bold mx-2 flex-grow"
          onClick={onClose}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RejectionForm;
