import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaPlus, FaMapMarkerAlt   } from "react-icons/fa";    
import { GiAutoRepair } from "react-icons/gi";


import Dropdown from '../../pages/technician/components/Dropdown'; // Adjust the path as necessary

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

const UserTile = ({ user, complaintId, goToDetails,  complaint, cityFromGeocoding }) => (

   
   

        <div className="p-4 border rounded-lg shadow-md shadow-blue-300 transform transition-transform duration-300 hover:scale-105 relative"
        onClick={() => goToDetails(user, complaint)}>
            <div className="flex items-center space-x-4">
                <img src={`${import.meta.env.VITE_API_URL}/uploads/profilePictures/test`} alt="" className="w-20 h-20 rounded-full bg-blue-500 self-center" />
                <div >
                    <h2 className="text-xl font-bold">{user.userDetails.firstName} {user.userDetails.lastName}</h2>
                    <div className='flex flex-row items-center gap-1 whitespace-nowrap w-full'>
  <GiAutoRepair className='text-xs align-middle' />
  <span className='text-sm'>{user.subRole}</span>
</div>
                    <div className='flex flex-row flex-wrap'>
                    <p className="text-sm text-gray-500">

                       <div className='rating w-3/5'>
                       {[1,2,3,4,5].map((star)=> (
                        <input
                        key={star}
                        type="radio"
                        name="rating"
                        className={`mask mask-star ${star<=user.rating ? "bg-yellow-500": "bg-gray-300"}`}
                        disabled
                        checked={star <= Math.floor(user.rating)} //fill up to the whole number part
                        >
                        </input>
                       ))}
                       {/* {user.rating % 1 >= 0.5 && (
                        <input
                        type="radio"
                        name="rating"
                        className='mask mask-star-half bg-yellow-500'
                        disabled
                        checked
                        >
                        </input>
                       )} */}
                       <span className='m-1 text-xs font-bold'>{user.rating ? user.rating.toFixed(1) : "N/A"}</span>
                       </div>
                        
                    </p>
                    <span className='text-black  text-xs flex flex-row items-center gap-0.5'><FaMapMarkerAlt />
                    {cityFromGeocoding}</span>
                    
                   
                    </div>
                </div>
            </div>
        </div>
  
);

function ExploreTechnicians() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const complaintId = queryParams.get("complaintID");
  const complaint = location.state?.complaint; // Access the complaint object from state
  console.log("complaint in the main functional component", complaint);

  const [users, setUsers] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [ratingsSort, setRatingsSort] = useState("");
  const [activeJobsSort, setActiveJobsSort] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const navigate = useNavigate();
    const cityFromGeocoding = "Colombo";
 
  const skillOptions = [
    { value: "", label: "All Skills" },
    { value: "plumbing", label: "Plumbing" },
    { value: "electrician", label: "Electrician" },
    { value: "carpentry", label: "Carpentry" },
    // Add more skill options as needed
  ];

  const locationOptions = [
    { value: "", label: "All Locations" },
    { value: "new york", label: "New York" },
    { value: "los angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    // Add more location options as needed
  ];

  const sortOptions = [
    { value: "", label: "No Sort" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/technicians/all`
        );
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchUsers();
  }, []);


  
 

  


  useEffect(() => {
    handleFilterChange();
  }, [
    searchQuery,
    skillFilter,
    locationFilter,
    ratingsSort,
    activeJobsSort,
    users,
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.userDetails.firstName.toLowerCase().includes(searchQuery) ||
          user.subRole.toLowerCase().includes(searchQuery)
      );
    }

    if (skillFilter) {
      filtered = filtered.filter(
        (user) => user.subRole.toLowerCase() === skillFilter.toLowerCase()
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(
        (user) => user.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (ratingsSort) {
      filtered = filtered.sort((a, b) =>
        ratingsSort === "asc" ? a.ratings - b.ratings : b.ratings - a.ratings
      );
    }

    if (activeJobsSort) {
      filtered = filtered.sort((a, b) =>
        activeJobsSort === "asc"
          ? a.activeJobs - b.activeJobs
          : b.activeJobs - a.activeJobs
      );
    }

    setFilteredUsers(filtered);
  };

  const trendingUsers = users.slice(0, 4); // Mock trending logic
  const mostRatedUsers = [...users]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4); // Mock most rated logic

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToDetails = (user, complaint) => {
    const categoryToSubRoleMapping = {
      "Plumbing issues (leaks, clogged drains)": "plumber",
      "Electrical problems (power outages, faulty wiring)": "electrician",
      "Broken or malfunctioning appliances": "carpenter",
      "Structural problems (cracks in walls, damaged doors or windows)":
        "painter",
    };

    // Categories that should be grouped under "Other"
    const otherCategories = new Set([
      "Safety and Security Concerns",
      "Other",
      "Pest control (insects, rodents)",
    ]);

    const category = complaint.category;
    // Helper function to map category to subRole
    const mapCategoryToSubRole = (category) => {
      // Check if the category belongs to the "other" group
      if (otherCategories.has(category)) {
        return "Other"; // If it belongs to the "other" group, return "Other"
      }

      // Otherwise, return the mapped subRole
      return categoryToSubRoleMapping[category] || "Other"; // Default to "Other" if not found
    };

    console.log("User object:", user); // Debugging line
    console.log("ComplaintId:", complaintId);
    console.log("complaint object", complaint);
    console.log("i received complaint", complaint);


    

    const mappedCategory = mapCategoryToSubRole(category);

    console.log("mapped category", mappedCategory);
    if (user.subRole === mappedCategory || user.subRole === "Other") {
      navigate(
        `/host/technician-details/${user._id}?complaintID=${complaintId}`
      );
    }
    //else if(user.subRole!==mappedCategory) {
    //         alert("sorry we do not currently have a technician with the expertise");
    //   }
    else {
      alert("please select a technician with a suitable subrole");
    }
  };



  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">
        Find a technician
      </h1>
      <div className="flex flex-row gap-6 items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or skill"
          className="mb-4 p-2 border rounded-full border-gray-300 rounded-md w-1/6"
        />
        <div className="flex flex-row items-center">
          <span className="p-2">Filter By</span>
          <div className="flex flex-row items-center gap-4">
            <Dropdown
              label="Skill"
              options={skillOptions}
              selected={skillFilter}
              setSelected={setSkillFilter}
            />
            <Dropdown
              label="Location"
              options={locationOptions}
              selected={locationFilter}
              setSelected={setLocationFilter}
            />
            <Dropdown
              label="Ratings"
              options={sortOptions}
              selected={ratingsSort}
              setSelected={setRatingsSort}
            />
            <Dropdown
              label="Active Jobs"
              options={sortOptions}
              selected={activeJobsSort}
              setSelected={setActiveJobsSort}
            />
          </div>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Near By Technicians</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer rounded-full">
          {trendingUsers.map((user) => (
            <UserTile
              key={user._id}
              user={user}
              complaint={complaint}
              complaintId={complaintId}
              goToDetails={goToDetails}
              cityFromGeocoding = {cityFromGeocoding}
              

            />
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Most Rated Technicians</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {mostRatedUsers.map(
            (user) =>
              user.rating >= 1 && (
                <UserTile
                  key={user._id}
                  user={user}
                  complaint={complaint}
                  complaintId={complaintId}
                  goToDetails={goToDetails}
                  cityFromGeocoding = {cityFromGeocoding}
                  

                />
              )
          )}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">All Technicians</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 cursor-pointer">
          {currentUsers.length ? (
            currentUsers.map((user) => (
              <UserTile
                key={user._id}
                user={user}
                complaint={complaint}
                complaintId={complaintId}
                goToDetails={goToDetails}
                cityFromGeocoding = {cityFromGeocoding}
                

              />
            ))
          ) : (
            <NoTechnicians />
          )}
        </div>
        <div className="flex justify-center">
          <nav className="bg-gray-100">
            <ul className="pagination flex flex-row">
              {Array.from(
                { length: Math.ceil(filteredUsers.length / usersPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item border-solid border-black p-2 cursor-pointer ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <a onClick={() => paginate(i + 1)} className="page-link">
                      {i + 1}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default ExploreTechnicians;



