import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInfoCircle, FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SearchBar from "./SearchBar";
import SearchTechnician from "./components/SearchTechnician";

function TechnicianCard({ technician, index, complaint }) {
  console.log(`../../assets/${technician.proPic}`);
  console.log(`complaint id is received to the technician cards ${complaint}`);
  console.log(`Navigating to: /host/technician-details/${technician._id}?complaintID=${complaint}`);

  return (
    <Link to={{
      pathname: `/host/technician-details/${technician.userDetails._id}`,
      search: `?complaintID=${complaint}`,
    }}>
      <div className="bg-white shadow-lg overflow-hidden border border-transparent transform transition-transform duration-300 hover:scale-105 relative card-hover-border rounded-lg w-auto">
        <div className="flex w-full">
          <div className="flex flex-col justify-between pl-3 w-auto overflow-hidden">
            <div>
              <div className="flex flex-row items-baseline gap-1">
                <div className="p-1 self-center">
                  <img src={`../../assets/${technician.proPic}`} alt="" className="w-7 h-7 rounded-full bg-blue-500 p-1 self-center" />
                </div>
                <div className="font-semibold text-black-500 flex flex-col gap-y-[-0.5rem]">
                  <span className="text-lg">{technician.userDetails.firstName}</span>
                  <span className="text-m">{technician.userDetails.lastName}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                  {technician.subRole}
                </p>
                <p className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap items-center">
                  <div className="rating w-2/5">
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star bg-yellow-500"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star bg-yellow-500"
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star bg-yellow-500"
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star bg-yellow-500"
                    />
                  </div>
                  4.5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function DisplayAllList() {
  return (
    <div className="bg-blue-500 grid grid-cols-5">
      <div className="bg-yellow-500"> heyy</div>
      <div className="bg-pink-500"> heyy</div>
      <div className="bg-purple-500"> heyy</div>
      <div className="bg-violet-500"> heyy</div>
    </div>
  );
}

function NoTechnicians() {
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 mb-10">
        Technicians unavailable at the moment
      </p>
      <Link
        to="/host/add-technician"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center space-x-2"
      >
        <FaPlus />
      </Link>
    </div>
  );
}

function TechnicianExplore() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const complaintId = queryParams.get('complaintID');
  const [complaintID, setComplaint] = useState(complaintId);
  const navigate = useNavigate();

  const [technicians, setTechnicians] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows = chunkArray(technicians, ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < rows.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/all`);
        setTechnicians(res.data);

        console.log(`complaint id received from query parameter is ${complaintID} it will be passed to the technician card`);

      } catch (error) {
        alert(`Error fetching technicians: ${error.message}`);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">
        Find a technician
      </h1>
      <div className="bg-gray-100 h-5/6 p-8">
        <div className="flex flex-row gap-0.5"></div>

        <SearchTechnician />

        <DisplayAllList />
        <div className="bg-gray-200 p-1">
          <h1 className="text-xl font-bold text-black-300 p-3 border-b-4 border-blue-600 m-5">
            Top Rated
          </h1>
          <div className="flex flex-row">
            <button
              className="px-4 py-2 h-10 w-10 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 self-center"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              <FaArrowLeft />
            </button>

            {rows.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-8 mb-4">
                {rows[currentPage].map((technician, index) => (
                  <TechnicianCard
                    key={technician._id}
                    technician={technician}
                    complaint={complaintID}
                    index={index + currentPage * ITEMS_PER_PAGE}
                  />
                ))}
              </div>
            ) : (
              <NoTechnicians />
            )}

            <button
              className="px-4 py-2 h-10 w-10 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 self-center"
              onClick={handleNextPage}
              disabled={currentPage === rows.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="bg-gray-200 p-1">
          <h1 className="text-xl font-bold text-black-300 p-3 border-b-4 border-blue-600 m-5">
            Nearby
          </h1>
          <div className="flex flex-row">
            <button
              className="px-4 py-2 h-10 w-10 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 self-center"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              <FaArrowLeft />
            </button>

            {rows.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-8 mb-4">
                {rows[currentPage].map((technician, index) => (
                  <TechnicianCard
                    key={technician._id}
                    technician={technician}
                    complaint={complaintID}
                    index={index + currentPage * ITEMS_PER_PAGE}
                  />
                ))}
              </div>
            ) : (
              <NoTechnicians />
            )}

            <button
              className="px-4 py-2 h-10 w-10 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 self-center"
              onClick={handleNextPage}
              disabled={currentPage === rows.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianExplore;
