import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaExclamationCircle, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner'; // Import the spinner component

const SignupForm = ({ role, navigateTo }) => {
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
  const [loading, setLoading] = useState(false);

  const validateNICPassport = (value) => {
    const nicOldFormat = /^[0-9]{9}[vVxX]$/;
    const nicNewFormat = /^[0-9]{12}$/;
    const passportFormat = /^[a-zA-Z0-9]{5,}$/;
    return nicOldFormat.test(value) || nicNewFormat.test(value) || passportFormat.test(value);
  };

  const validatePhone = (value) => {
    const phoneFormat = /^[0-9]{10}$/;
    return phoneFormat.test(value);
  };

  const validateName = (value) => {
    const nameFormat = /^[a-zA-Z\s]+$/;
    return nameFormat.test(value);
  };

  const handleNext = () => {
    if (currentStage === 1) {
      if (!firstName || !lastName || !nicPassport || !phone || !gender) {
        setError('All fields are required.');
        return;
      }
      if (!validateName(firstName) || !validateName(lastName)) {
        setError('Name should not contain numbers.');
        return;
      }
      if (!validateNICPassport(nicPassport)) {
        setError('Invalid NIC/Passport format.');
        return;
      }
      if (!validatePhone(phone)) {
        setError('Phone number should contain only 10 digits.');
        return;
      }
    }
    setError(null);
    setCurrentStage(currentStage + 1);
  };

  const handlePrevious = () => {
    setCurrentStage(currentStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !reenteredPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== reenteredPassword) {
      setError('Passwords do not match.');
      return;
    }
    const userData = { email, password, role, nicPassport, phone, gender, firstName, lastName };
    setLoading(true); // Start loading
    const { error } = await signup(userData);
    setLoading(false); // Stop loading
    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: userData });
    }
  };

  return (
    <div className="h-full bg-gray-100 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 py-0 pb-10 rounded shadow-md w-full max-w-sm my-10 relative">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">{role.charAt(0).toUpperCase() + role.slice(1)} Sign-Up</h2>
        <div className="w-full bg-gray-200 h-1 mb-6">
          <div className="bg-blue-700 h-1" style={{ width: currentStage === 1 ? '50%' : '100%' }}></div>
        </div>
        {loading && <LoadingSpinner message="Sending OTP..." />}
        {!loading && (
          <>
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
                      disabled={loading}
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
                      disabled={loading}
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
                  disabled={loading}
                />
                <InputField
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  IconComponent={FaPhone}
                  disabled={loading}
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
                      disabled={loading}
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
                <button type="button" onClick={handleNext} className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4" disabled={loading}>
                  Next
                </button>
              </>
            )}
            {currentStage === 2 && (
              <>
              <div className='pt-10'>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  IconComponent={FaEnvelope}
                  disabled={loading}
                />
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  IconComponent={FaLock}
                  disabled={loading}
                />
                <InputField
                  id="reenteredPassword"
                  name="reenteredPassword"
                  type="password"
                  value={reenteredPassword}
                  onChange={(e) => setReenteredPassword(e.target.value)}
                  placeholder="Re-enter Password"
                  IconComponent={FaLock}
                  disabled={loading}
                />
                <div className="flex justify-between">
                  <button type="button" onClick={handlePrevious} className="w-1/2 bg-gray-700 text-white p-2 rounded flex items-center justify-center hover:bg-gray-900 transition-colors mr-2" disabled={loading}>
                    <FaArrowLeft className="mr-2" /> Back
                  </button>
                  <button type="submit" className="w-1/2 bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors ml-2" disabled={loading}>
                    <FaCheck className="mr-2" /> Signup
                  </button>
                </div>
                </div>
              </>
            )}
          </>
        )}
        {error && <ErrorAlert message={error} />}
        <div className="flex mb-4 mt-4 text-sm text-gray-600 items-center justify-center">
          <FaExclamationCircle className="mr-1" />
          <Link to="/login" className="hover:underline">Already have an account?</Link>
        </div>
        <div className="flex flex-col mt-4 text-sm text-gray-600 text-center">
          {role === 'guest' ? (
            <>
              <p className="mb-2">Are you looking to provide a service?</p>
              <div>
                <Link to="/signup/host" className="hover:underline text-blue-600 mb-1 mr-6">Signup as a Host</Link>
                <Link to="/signup/technician" className="hover:underline text-blue-600">Signup as a Technician</Link>
              </div>
            </>
          ) : (
            <>
              <p className="mb-2">Are you looking to use our services?</p>
              <div>
                <Link to="/signup/guest" className="hover:underline text-blue-600 mb-1 mr-6">Signup as a Guest</Link>
                <Link to="/signup/technician" className="hover:underline text-blue-600">Signup as a Technician</Link>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;