import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaExclamationCircle, FaArrowLeft, FaCheck, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';
import { GoogleMap, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const libraries = ['places'];
const mapContainerStyle = {
  height: '400px',
  width: '100%',
};
const defaultCenter = {
  lat: 7.8731,
  lng: 80.7718,
};

const TechnicianSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [nicPassport, setNicPassport] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [subRole, setSubRole] = useState('');
  const [location, setLocation] = useState({
    address: '',
    latitude: defaultCenter.lat,
    longitude: defaultCenter.lng,
    district: '',
    province: '',
    zipcode: '',
    geocoding_response: null,
  });
  const [currentStage, setCurrentStage] = useState(1);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'lk' },
    },
    debounce: 300,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(intervalId);
      }
    }, 100);
  }, []);

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handlePrevious = () => {
    setCurrentStage(currentStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== reenteredPassword) {
      setError('Passwords do not match.');
      return;
    }
    const userData = { email, password, role: 'technician', nicPassport, phone, gender, firstName, lastName, location, subRole };
    const { error } = await signup(userData);
    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: userData });
    }
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const addressComponents = results[0].address_components.reduce((acc, component) => {
        const types = component.types;
        if (types.includes('administrative_area_level_1')) {
          acc.province = component.long_name;
        } else if (types.includes('postal_code')) {
          acc.zipcode = component.long_name;
        } else if (types.includes('administrative_area_level_2')) {
          acc.district = component.long_name;
        }
        return acc;
      }, {});
      const newLocation = {
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        ...addressComponents,
        geocoding_response: JSON.stringify(results[0])
      };
      setLocation(newLocation);
    } catch (error) {
      console.error("Error fetching location details: ", error);
    }
  };

  const handleMarkerDragEnd = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    try {
      const results = await getGeocode({ location: { lat, lng } });
      const addressComponents = results[0].address_components.reduce((acc, component) => {
        const types = component.types;
        if (types.includes('administrative_area_level_1')) {
          acc.province = component.long_name;
        } else if (types.includes('postal_code')) {
          acc.zipcode = component.long_name;
        } else if (types.includes('administrative_area_level_2')) {
          acc.district = component.long_name;
        }
        return acc;
      }, {});
      const newLocation = {
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        ...addressComponents,
        geocoding_response: JSON.stringify(results[0])
      };
      setLocation(newLocation);
      setValue(results[0].formatted_address, false);
    } catch (error) {
      console.error("Error fetching location details: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 py-4 rounded shadow-md w-full max-w-sm my-20">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">Technician Sign-Up</h2>
        <div className="w-full bg-gray-200 h-1 mb-6">
          <div className="bg-blue-700 h-1" style={{ width: currentStage === 1 ? '33%' : currentStage === 2 ? '66%' : '100%' }}></div>
        </div>
        {currentStage === 1 && (
          <>
            <div className="flex space-x-2 mt-14">
              <div className="flex-1">
                <InputField
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  IconComponent={FaUser}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  IconComponent={FaUser}
                />
              </div>
            </div>

            <InputField
              id="nicPassport"
              name="nicPassport"
              type="text"
              value={nicPassport}
              onChange={(e) => setNicPassport(e.target.value)}
              placeholder="NIC/Passport"
              IconComponent={FaUser}
            />
            <InputField
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              IconComponent={FaPhone}
            />
            <button type="button" onClick={handleNext} className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4">
              Next
            </button>
          </>
        )}
        {currentStage === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Address:</label>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Search for an address"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
              {status === "OK" && (
                <ul className="border border-gray-300 mt-2 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg">
                  {data.map(({ place_id, description }) => (
                    <li
                      key={place_id}
                      className="p-3 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelect(description)}
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">District:</label>
                <input
                  type="text"
                  name="district"
                  value={location.district}
                  onChange={(e) => setLocation({ ...location, district: e.target.value })}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Province:</label>
                <input
                  type="text"
                  name="province"
                  value={location.province}
                  onChange={(e) => setLocation({ ...location, province: e.target.value })}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Latitude:</label>
                <input
                  type="number"
                  name="latitude"
                  value={location.latitude}
                  onChange={(e) => setLocation({ ...location, latitude: parseFloat(e.target.value) })}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Longitude:</label>
                <input
                  type="number"
                  name="longitude"
                  value={location.longitude}
                  onChange={(e) => setLocation({ ...location, longitude: parseFloat(e.target.value) })}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Zip Code:</label>
                <input
                  type="text"
                  name="zipcode"
                  value={location.zipcode}
                  onChange={(e) => setLocation({ ...location, zipcode: e.target.value })}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="my-8">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={{ lat: location.latitude, lng: location.longitude }}
              >
                <Marker
                  position={{ lat: location.latitude, lng: location.longitude }}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                />
              </GoogleMap>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handlePrevious} className="w-1/2 bg-gray-700 text-white p-2 rounded flex items-center justify-center hover:bg-gray-900 transition-colors mr-2">
                <FaArrowLeft className="mr-2" /> Back
              </button>
              <button type="button" onClick={handleNext} className="w-1/2 bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors ml-2">
                Next
              </button>
            </div>
          </>
        )}
        {currentStage === 3 && (
          <>
            <InputField
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              IconComponent={FaEnvelope}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              IconComponent={FaLock}
            />
            <InputField
              id="reenteredPassword"
              name="reenteredPassword"
              type="password"
              value={reenteredPassword}
              onChange={(e) => setReenteredPassword(e.target.value)}
              placeholder="Re-enter Password"
              IconComponent={FaLock}
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subRole">
                Sub-Role
              </label>
              <div className="relative">
                <select
                  id="subRole"
                  name="subRole"
                  value={subRole}
                  onChange={(e) => setSubRole(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Sub-Role
                  </option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={handlePrevious} className="w-1/2 bg-gray-700 text-white p-2 rounded flex items-center justify-center hover:bg-gray-900 transition-colors mr-2">
                <FaArrowLeft className="mr-2" /> Back
              </button>
              <button type="submit" className="w-1/2 bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors ml-2">
                <FaCheck className="mr-2" /> Signup
              </button>
            </div>
          </>
        )}
        {error && <ErrorAlert message={error} />}
        <div className="flex mb-4 mt-4 text-sm text-gray-600 items-center justify-center">
          <FaExclamationCircle className="mr-1" />
          <Link to="/login" className="hover:underline">Already have an account?</Link>
        </div>
        <div className="flex flex-col mt-4 text-sm text-gray-600 text-center">
          <p className="mb-2">Are you looking to use our services?</p>
          <div>
            <Link to="/signup/guest" className="hover:underline text-blue-600 mb-1 mr-6">Signup as a Guest</Link>
            <Link to="/signup/host" className="hover:underline text-blue-600">Signup as a Host</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TechnicianSignup;
