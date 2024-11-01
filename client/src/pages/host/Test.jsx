import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInfoCircle, FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";                                                                                
import SearchTechnician from "../../pages/technician/components/SearchTechnician";
import Dropdown from '../../pages/technician/components/Dropdown'; // Adjust the path as necessary
import { FaSearch } from 'react-icons/fa';

const mockUsers = [
    {
      id: '66a524a1dad761b3d66dd875',
      name: 'chamma siri',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      skill: 'Plumber',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      skill: 'Carpenter',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 3,
      name: 'Alice Johnson',
      rating: 3,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      skill: 'Electrician',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 4,
      name: 'Bob Brown',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      skill: 'HVAC',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 5,
      name: 'Charlie Davis',
      rating: 2,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      skill: 'Plumber',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 6,
      name: 'Dana Lee',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      skill: 'Carpenter',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 7,
      name: 'Ethan Wilson',
      rating: 3,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      skill: 'Electrician',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 8,
      name: 'Fiona Clark',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      skill: 'HVAC',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 9,
      name: 'George Harris',
      rating: 1,
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
      skill: 'Plumber',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 10,
      name: 'Hannah Martin',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
      skill: 'Carpenter',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 11,
      name: 'Ian Thompson',
      rating: 3,
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      skill: 'Electrician',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 12,
      name: 'Julia Adams',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      skill: 'HVAC',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 13,
      name: 'Kevin Parker',
      rating: 2,
      avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
      skill: 'Plumber',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 14,
      name: 'Lily White',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
      skill: 'Carpenter',
      location: 'New York', ratings: 4.5, activeJobs: 2
    },
    {
      id: 15,
      name: 'Michael Roberts',
      rating: 3,
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      skill: 'Electrician',
      location: 'New York', ratings: 4.5, activeJobs: 2
    }
  ];
  

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

const UserTile = ({ user }) => (
    <Link to={{
        // pathname: `/host/technician-details/${technician.userDetails._id}`,
        // search: `?complaintID=${complaint}`,
        pathname: `../../host/technician-details/${user.id}`,
      }}>
  <div className="p-4 border rounded-lg shadow-md shadow-blue-300 transform transition-transform duration-300 hover:scale-105 relative">
    <div className="flex items-center space-x-4">
      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <div>{user.skill}</div>

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
);





const TechnicianPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingsSort, setRatingsSort] = useState('');
  const [activeJobsSort, setActiveJobsSort] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

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

  useEffect(() => {
    // Fetch users from an API or use mock data
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

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
        user.name.toLowerCase().includes(searchQuery) ||
        user.skill.toLowerCase().includes(searchQuery)
      );
    }

    if (skillFilter) {
      filtered = filtered.filter(user =>
        user.skill.toLowerCase() === skillFilter.toLowerCase()
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
          {trendingUsers.map(user => <UserTile key={user.id} user={user} />)}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Most Rated Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {mostRatedUsers.map(user => <UserTile key={user.id} user={user} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 cursor-pointer">
          {currentUsers.map(user => <UserTile key={user.id} user={user} />)}
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
};

export default TechnicianPage;
