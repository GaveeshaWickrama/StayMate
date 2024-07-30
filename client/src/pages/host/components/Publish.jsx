import React from 'react';
import addLocationImage from '../../../assets/publish.jpg';

const Publish = ({ handleSubmit }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={addLocationImage} alt="Location" className="w-full max-w-4xl h-72 object-cover mb-4 rounded-lg" />
      <h2 className="text-2xl font-bold mb-4">All Set to Go!</h2>
      <p className="text-lg mb-4">You are ready to publish your property.</p>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Publish
      </button>
    </div>
  );
};

export default Publish;
