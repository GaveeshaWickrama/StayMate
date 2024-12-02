import React, { useState, useEffect} from "react";
import PopupForm from "../ResolveComplaintForm"; // Verify the path and component name
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios'

function PendingComplaintDetails({ complaint, id }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  console.log("complaint exists?",complaint)
  const handleFindTechnician = () => {
    alert("Directing to technician explore page");
    console.log(
      "Complaint ID is going forward from complaint details to view technicians"
    );
    console.log(`This is the complaint ID: ${id}`);
    navigate(`/host/view-technicians?complaintID=${id}`,{
      state:{complaint}
  });
  };

  // const markAsResolved = async() => {
  //   console.log("resolve button clicked");
  //   try {
  //     await axios.post(`${import.meta.env.VITE_API_URL}/complaints/complaint/${id}/resolve`);
  //   } catch (error) {
  //     console.error("Error while resolving:", error);
  //   }
  // };

  const confirmJob = async () => {
    const progress = 0;
    console.log("button clicked");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/complaints/${id}/confirmJob`);
      await axios.post(`${import.meta.env.VITE_API_URL}/complaints/complaint/${id}/setProgress`,{progress : progress});
    } catch (error) {
      console.error("Error while updating job status:", error);
    }
  };

  
  // useEffect(() => {
  //   confirmJob();
  // }, [id]);

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      {complaint.status === "pendingHostDecision" && (
        <div className="flex flex-row gap-4">
          <div>
            <button
              className="bg-red-600 text-white p-4 rounded font-bold w-50 my-10"
              onClick={handleFindTechnician}
            >
              Assign to Technician
            </button>
          </div>
          <div>
            <button
              className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10"
              onClick={() => setShowModal(true)}
              type="submit"
            >
              Mark as resolved
            </button>
            <PopupForm
              isOpen={showModal}
              handleClose={() => setShowModal(false)}
              complaintId={id}
            />
          </div>
        </div>
      )}

      {complaint.status === "pendingTechnicianApproval" && (
        <div className="flex flex-row">
          {complaint.estimatedBudget != null &&
          !isNaN(complaint.estimatedBudget) ? (
            <div className="flex flex-col items-start ">
              <p className="bg-blue-100 p-3 m-3">
                {complaint.technician.userId.firstName}{" "}
                {complaint.technician.userId.lastName} estimated a budget of $
                {Number(complaint.estimatedBudget).toFixed(2)}
                <br />
                Confirm if you accept
              </p>
              <button
                className="bg-red-600 text-white p-4 rounded font-bold w-50 my-5"
                onClick={confirmJob}
              >
                Confirm Job
              </button>
            </div>
          ) : (
            <p className="bg-green-100 p-4 m-3">Pending Technician Approval</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PendingComplaintDetails;
