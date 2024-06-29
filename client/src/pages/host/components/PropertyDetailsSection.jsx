import React from 'react';
import entirePlaceIcon from '../../../assets/buildingTypes/home.png';
import partitionIcon from '../../../assets/buildingTypes/part.png';


const PartitionTypeButton = ({ value, label, description, icon, isSelected, handleChange }) => (
  <label
    className={` text-2xl flex items-center justify-between cursor-pointer border-4 rounded-lg px-12 w-full h-28 ${
      isSelected ? 'border-blue-500 bg-blue-200' : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
    }`}
  >
    <input
      type="radio"
      name="total_unique_sections"
      value={value}
      checked={isSelected}
      onChange={handleChange}
      className="hidden"
    />
    <div className="flex flex-col">
      <span className="font-semibold ">{label}</span>
      <span className="text-sm pt-2">{description}</span>
    </div>
    <img src={icon} alt={label} className="w-10 h-10" />
  </label>
);

const PropertyDetailsSection = ({ property, handleChange, setProperty }) => {
  
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value,
      sections: [] // Clear the sections array
    }));
  };

  const partitionTypes = [
    { value: '-1', label: 'An entire place', description: 'Guests have the whole place to themselves.', icon: entirePlaceIcon },
    { value: '0', label: 'A partition', description: 'Guests share some spaces.', icon: partitionIcon }
  ];

  return (
    <>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Property Section Info</h2>
      <div className="flex-col p-10 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="text-3xl block mb-2 font-semibold">Is this an entire place or a partition?</label>
        <div className="mt-8 space-y-4">
          {partitionTypes.map((type) => (
            <div className="w-1/2">
              <PartitionTypeButton
                key={type.value}
                value={type.value}
                label={type.label}
                description={type.description}
                icon={type.icon}
                isSelected={property.total_unique_sections === type.value}
                handleChange={handleSelectChange}
              />
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default PropertyDetailsSection;


