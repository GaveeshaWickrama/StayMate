// Publish.jsx
import React from 'react';

const Publish = ({ handleSubmit }) => (
  <div className="flex justify-center">
    <button
      type="submit"
      onClick={handleSubmit}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
    >
      Publish
    </button>
  </div>
);

export default Publish;
