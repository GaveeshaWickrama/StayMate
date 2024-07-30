import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInfoCircle, FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";                                                                                
import SearchTechnician from "../../pages/technician/components/SearchTechnician";
import Dropdown from '../../pages/technician/components/Dropdown'; // Adjust the path as necessary
import { FaSearch } from 'react-icons/fa';


  

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

const UserTile = ({ user, index, complaintId })  => (

//   console.log(`../../assets/${user.proPic}`);
//   console.log(`complaint id is received to the technician cards ${complaint}`);
//   console.log(`Navigating to: /host/technician-details/${user._id}?complaintID=${complaint}`);

// return(

  <Link to={{
    pathname: `/host/technician-details/${user._id}`,
    search: `?complaintID=${complaintId}`,
    // pathname: `../../host/technician-details/`,
  }}>
<div className="p-4 border rounded-lg shadow-md shadow-blue-300 transform transition-transform duration-300 hover:scale-105 relative">
<div className="flex items-center space-x-4">
  {/* <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" /> */}
  <img src={`../../assets/${user.proPic}`} alt="" className="w-7 h-7 rounded-full bg-blue-500 p-1 self-center" />

  <div>
    <h2 className="text-xl font-bold">{user.userDetails.firstName} {user.userDetails.lastName}</h2>
    <div>{user.subRole}</div>

    <p className="text-sm text-gray-500"> 
    <div className="rating w-3/5">
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
                <span className='m-1 text-xs font-bold'>4.5</span>
              </div>
    </p>
  </div>
</div>
</div>
</Link>
// );
    
);







export default function TechnicianPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const complaintId = queryParams.get('complaintID');


  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingsSort, setRatingsSort] = useState('');
  const [activeJobsSort, setActiveJobsSort] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // const [technicians, setTechnicians] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  const skillOptions = [
    { value: '', label: 'All Skills' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'carpentry', label: 'Carpentry' },
    // Add more skill options as needed
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'new york', label: 'New York' },
    { value: 'los angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    // Add more location options as needed
  ];

  const sortOptions = [
    { value: '', label: 'No Sort' },
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  

  useEffect(()=>{

    
    const fetchUsers = async () => {
      console.log("inside the fetch technician");
      console.log(import.meta.env.VITE_API_URL);

     
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/all`);
        console.log("Response from backend:", response.data); // Log the actual data

        setUsers(response.data);
        console.log(users)
      }
      catch(error){
        console.error("Error fetching complaints:", error); 
      
      }
        
};

fetchUsers();


  },[]);



  useEffect(() => {
    handleFilterChange();
  }, [searchQuery, skillFilter, locationFilter, ratingsSort, activeJobsSort]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.userId.firstName.toLowerCase().includes(searchQuery) ||
        user.skill.toLowerCase().includes(searchQuery)
      );
    }

    if (skillFilter) {
      filtered = filtered.filter(user =>
        user.subRole.toLowerCase() === skillFilter.toLowerCase()
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(user =>
        user.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (ratingsSort) {
      filtered = filtered.sort((a, b) => ratingsSort === 'asc' ? a.ratings - b.ratings : b.ratings - a.ratings);
    }

    if (activeJobsSort) {
      filtered = filtered.sort((a, b) => activeJobsSort === 'asc' ? a.activeJobs - b.activeJobs : b.activeJobs - a.activeJobs);
    }

    setFilteredUsers(filtered);
  };

  const trendingUsers = users.slice(0, 4); // Mock trending logic
  const mostRatedUsers = [...users].sort((a, b) => b.ratings - a.ratings).slice(0, 4); // Mock most rated logic

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">
        Find a technician
      </h1>
 <div className='flex flex-row gap-6 items-center justify-between'>
 <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or skill"
        className="mb-4 p-2 border rounded-full  border-gray-300 rounded-md w-1/6"
      />

<div className="flex flex-row items-center">
<span className='p-2'>Filter By</span>
<div className='flex flex-row items-center gap-4'>
        <Dropdown
          label=" Skill"
          options={skillOptions}
          selected={skillFilter}
          setSelected={setSkillFilter}
        />
        <Dropdown
          label=" Location"
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
          label=" Active Jobs"
          options={sortOptions}
          selected={activeJobsSort}
          setSelected={setActiveJobsSort}
        />
      </div>

</div>
 </div>
     
      

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Near By Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer rounded-full">
          {trendingUsers.map(user => <UserTile key={user._id} user={user} complaintId={complaintId}/>)}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Most Rated Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {mostRatedUsers.map(user => <UserTile key={user._id} user={user} complaintId={complaintId}/>)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 cursor-pointer">
          {currentUsers.map(user => <UserTile key={user._id} user={user} complaintId={complaintId}/>)}
        </div>

        <div className="flex justify-center">
          <nav className='bg-gray-100'>
            <ul className="pagination flex flex-row">
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                <li key={i} className={`page-item border-solid border-black p-2 cursor-pointer ${currentPage === i + 1 ? 'active' : ''}`}>
                  <a onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}




