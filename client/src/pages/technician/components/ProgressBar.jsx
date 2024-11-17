import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ActiveTaskDetails({ complaint }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(complaint.progress);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    //fetch the intial progress value when the component mounts
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/complaints/complaint/${
            complaint._id
          }/getProgress`
        );

        setProgress(response.data.progress);

        alert(`success`);
      } catch {
        console.error("Error retrieving progress:", error);
      }
    };
  }, [complaint._id]);

  const handleProgressChange = async (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/complaint/${
          complaint._id
        }/setProgress`,
        { progress: newProgress }
      );

      if(parseInt(newProgress) === 100 ){
        await axios.post(
          `${import.meta.env.VITE_API_URL}/complaints/complaint/${
            complaint._id
          }/completejob`,
          
        );
      }
      // if(newProgress >= 100){
      //     await axios.post(`${import.meta.env.VITE_API_URL}/complaints/${id}/complete`);
      // }
      console.log(`updated progress ${complaint.progress}`);
      setConfirmationMessage("Progress updated successfully!");
    } catch (error) {
      setConfirmationMessage("Failed to update progress.");
      console.error("error :", error);
    }
  };
  return (
    <div className="w-full bg-white-100 mx-auto py-1 m-1 px-5">
      <div className="w-full md:w-90% flex items-center">
        <form onSubmit={handleProgressChange} className="w-full flex flex-row items-center gap-2  py-2 px-5">
          <input
            type="range"
            className="appearance-none  w-full h-2 bg-blue-200 rounded-lg cursor-pointer accent-blue-600"
            min="0"
            max="100"
            step="10"
            value={progress}
            onChange={handleProgressChange}
          />
          <div className="flex justify-self-center items-center">
          <span className="text-blue-500 font-extrabold text-2xl">{progress}%</span>
        </div>
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg font-bold w-30">Confirm</button>
        </form>

        {/* {complaint.progress && <div>{complaint.progress}</div>} */}
        
      </div>
    </div>
  );
}
