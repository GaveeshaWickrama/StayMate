import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaExclamationCircle, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';

const GuestSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [nicPassport, setNicPassport] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentStage, setCurrentStage] = useState(1);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
    const userData = { email, password, role: 'guest', nicPassport, phone, gender, firstName, lastName };
    const { error } = await signup(userData);
    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: userData });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 py-4 rounded shadow-md w-full max-w-sm my-20">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">Guest Sign-Up</h2>
        <div className="w-full bg-gray-200 h-1 mb-6">
          <div className="bg-blue-700 h-1" style={{ width: currentStage === 1 ? '50%' : '100%' }}></div>
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
          <p className="mb-2">Are you looking to provide a service?</p>
          <div>
            <Link to="/signup/host" className="hover:underline text-blue-600 mb-1 mr-6">Signup as a Host</Link>
            <Link to="/signup/technician" className="hover:underline text-blue-600">Signup as a Technician</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuestSignup;



