import React from 'react';

const ViewDeed = ({ file, defaultImage }) => {
  // Determine file type based on the extension
  const isPDF = file?.toLowerCase().endsWith('.pdf');
  const fileUrl = file || defaultImage;

  const handleFileClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      {isPDF ? (
        // If it's a PDF, render a link or embed viewer
        <div className="flex flex-col items-center">
          <iframe
            src={fileUrl}
            title="Property Deed PDF"
            className="w-32 h-32 border rounded mb-2"
          ></iframe>
          <button
            className="text-blue-500 underline text-sm"
            onClick={() => handleFileClick(fileUrl)}
          >
            View Full PDF
          </button>
        </div>
      ) : (
        // If it's an image, render the image preview
        <img
          src={fileUrl}
          alt="Property Deed"
          className="w-32 h-32 object-cover cursor-pointer"
          onClick={() => handleFileClick(fileUrl)}
        />
      )}
    </div>
  );
};

export default ViewDeed;
