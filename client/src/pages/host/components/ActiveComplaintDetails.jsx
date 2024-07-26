
import React, { useState } from 'react';

// Modal Component
function Modal({ show, onClose, onSave }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Proof</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="proof" className="block text-sm font-medium text-gray-700">Upload Proof</label>
            <input type="file" id="proof" className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea id="comments" rows="3" className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Close</button>
            <button type="button" onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ActiveTaskDetails Component
function ActiveComplaintDetails({ complaint }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleSave = () => {
    alert(`Form submitted for complaint id: ${complaint._id}`);
    setShowModal(false);
  };

  return (
    <div>


      <div className='flex flex-row gap-3'>
      <button className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10" onClick={() => setShowModal(true)}>Terminate</button>
      </div>
     
      <div>{complaint.status}</div>

      <Modal show={showModal} onClose={handleClose} onSave={handleSave} />
    </div>
  );
}

export default ActiveComplaintDetails;

