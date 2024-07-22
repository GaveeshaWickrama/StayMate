import React from 'react';

const Publish = ({ handleSubmit, property }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Review Your Property Details</h2>
      <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-md">
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(property, (key, value) => {
            if (key === 'file' && value instanceof File) {
              return {
                name: value.name,
                size: value.size,
                type: value.type,
              };
            }
            return value;
          }, 2)}
        </pre>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Publish
      </button>
    </div>
  );
};

export default Publish;
