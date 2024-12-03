import React from 'react';

const DeedUpload = ({ property, setProperty }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      // Set the PDF file in the property state
      setProperty(prevState => ({
        ...prevState,
        deed: { file }  // Save the file object
      }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-8 mb-32">
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Assessment Report</h2>
      <div className="flex-col p-10 bg-gray-50 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="text-2xl block mb-2 font-semibold">Deed (PDF)</label>
          <input 
            type="file" 
            accept="application/pdf"  // Accept only PDF
            onChange={handleFileChange} 
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-6"
          />
        </div>
        <div className="mt-10">
          <label className="text-2xl block mb-2 font-semibold">Additional Details (Optional)</label>
          <textarea
            name="additionalDetails"
            value={property.additionalDetails || ''}
            onChange={handleChange}
            placeholder="Enter any additional details here"
            className="block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DeedUpload;
