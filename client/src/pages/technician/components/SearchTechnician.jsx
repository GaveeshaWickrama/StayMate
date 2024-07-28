




import React, { useState } from 'react';
import Dropdown from './Dropdown'; // Adjust the path as necessary
import { FaSearch } from 'react-icons/fa';

const technicians = [
  { id: 1, name: 'John Doe', skill: 'Electrician', location: 'New York', ratings: 4.5, activeJobs: 2 },
  { id: 2, name: 'Jane Smith', skill: 'Plumber', location: 'Los Angeles', ratings: 4.0, activeJobs: 1 },
  { id: 3, name: 'Bob Johnson', skill: 'Carpenter', location: 'Chicago', ratings: 4.2, activeJobs: 3 },
  // Add more technicians as needed
];

const SearchTechnicians = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingsSort, setRatingsSort] = useState('');
  const [activeJobsSort, setActiveJobsSort] = useState('');
  const [filteredTechnicians, setFilteredTechnicians] = useState(technicians);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = () => {
    let filtered = technicians;

    if (searchQuery) {
      filtered = filtered.filter(technician =>
        technician.name.toLowerCase().includes(searchQuery) ||
        technician.skill.toLowerCase().includes(searchQuery)
      );
    }

    if (skillFilter) {
      filtered = filtered.filter(technician =>
        technician.skill.toLowerCase() === skillFilter.toLowerCase()
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(technician =>
        technician.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (ratingsSort) {
      filtered = filtered.sort((a, b) => ratingsSort === 'asc' ? a.ratings - b.ratings : b.ratings - a.ratings);
    }

    if (activeJobsSort) {
      filtered = filtered.sort((a, b) => activeJobsSort === 'asc' ? a.activeJobs - b.activeJobs : b.activeJobs - a.activeJobs);
    }

    setFilteredTechnicians(filtered);
  };

  return (
    <div className=''>
      <div className='flex justify-start items-center justify-between bg-white shadow-md rounded-full px-4 py-2 w-2/4 max-w-4xl mx-auto mb-8 border'>
      <input
        type="text"
        placeholder="Search by name or skill"
        value={searchQuery}
        onChange={handleSearchChange}
        // className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        className='outline-none text-gray-500 text-sm'
      />
         <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white rounded-full p-3 ml-4"
        >
          <FaSearch />
        </button>
      </div>
     
      <div className="mb-4 flex flex-row items-center gap-4">
      <span className='mx-5'>Filter by</span>
        <Dropdown
          label="Skill"
          options={[
            { value: '', label: 'All Skills' },
            { value: 'Electrician', label: 'Electrician' },
            { value: 'Plumber', label: 'Plumber' },
            { value: 'Carpenter', label: 'Carpenter' },
            // Add more options as needed
          ]}
          selected={skillFilter}
          setSelected={setSkillFilter}
        />
        <Dropdown
          label="Filter by Location"
          options={[
            { value: '', label: 'All Locations' },
            { value: 'New York', label: 'New York' },
            { value: 'Los Angeles', label: 'Los Angeles' },
            { value: 'Chicago', label: 'Chicago' },
            // Add more options as needed
          ]}
          selected={locationFilter}
          setSelected={setLocationFilter}
        />
        <Dropdown
          label="Sort by Ratings"
          options={[
            { value: '', label: 'None' },
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          selected={ratingsSort}
          setSelected={setRatingsSort}
        />
        <Dropdown
          label="Sort by Active Jobs"
          options={[
            { value: '', label: 'None' },
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          selected={activeJobsSort}
          setSelected={setActiveJobsSort}
        />
     
      </div>
      <ul>
        {filteredTechnicians.map(technician => (
          <li key={technician.id}>
            {technician.name} - {technician.skill} - {technician.location} - {technician.ratings} stars - {technician.activeJobs} active jobs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTechnicians;
