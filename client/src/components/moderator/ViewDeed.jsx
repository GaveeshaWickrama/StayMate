import React from 'react';

const ViewDeed = ({ image , defaultImage}) => {
  const imageUrl = image ? image : defaultImage;

  const handleImageClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt="Property Deed"
        className='w-32 h-32 object-cover cursor-pointer'
        onClick={() => handleImageClick(imageUrl)}
      />
    </div>
  );
};

export default ViewDeed;