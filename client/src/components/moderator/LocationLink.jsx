import React from 'react';

const LocationLink = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <span className="ml-2">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline text-sm"
      >
        View on Google Maps
      </a>
    </span>
  );
};

export default LocationLink;
