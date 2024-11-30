import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopupForm = ({ isOpen, handleClose, handleSave, complaintId }) => {
  const [images, setImages] = useState([]);
  const [additionalRemarks, setAdditionalRemarks] = useState("");
  const navigate = useNavigate();
  if (!isOpen) return null;


  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemarksChange = (event) => {
    setAdditionalRemarks(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(`Complaint ID received in the upload proof: ${complaintId}`);
      // console.log(`Host ID: ${hostID}`);

      const formData = new FormData();
      formData.append("additionalRemarks", additionalRemarks);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      console.log("Form Data to be uploaded");
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/complaints/complaint/${complaintId}/uploadProof`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages([]);
      setAdditionalRemarks("");
     handleClose();
      navigate("/technician/tasks");
      alert("proof uploaded successfully!");
      
    } catch (error) {
      console.error("proof couldne be uploaded", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          Please Upload proof of the task you have completed{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex ">
            {images.map((image, index) => (
              <div key={index} className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-200">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
            {/* {images.length < 3 && (
              <label className="block text-lg font-medium text-gray-700 py-3">
                photos
                <span className="text-2xl font-bold text-gray-500 border-blue-400 p-4">+</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            )} */}


<div className="bg-gray-100 p-5 rounded-lg shadow-md">
  {images.length < 3 && (
    <div className="flex flex-col items-center space-y-3">
      <label
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50"
      >
        <span className="text-lg font-medium text-gray-700">
          Upload Photos
        </span>
        <span className="text-4xl font-bold text-blue-400 mt-2">+</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <p className="text-sm text-gray-500">
        You can upload up to 3 images.
      </p>
    </div>
  )}
  <div className="flex space-x-3 mt-5">
    {images.map((image, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-24 h-24 object-cover rounded-lg shadow-md"
        />
        <button
          type="button"
          className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full hover:bg-red-600"
          onClick={() => handleRemoveImage(index)}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>

          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 py-3">
              Additional Remarks
            </label>
            <textarea
              className="focus:outline-none mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Please add any any additional remarks about the job"
              required
              value={additionalRemarks}
              onChange={(e) => setAdditionalRemarks(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
