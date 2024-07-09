import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaExclamationCircle } from 'react-icons/fa';
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
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 pt-4 rounded shadow-md w-full max-w-sm">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">Guest Sign-Up</h2>
        <InputField
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          IconComponent={FaUser}
        />
        <InputField
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          IconComponent={FaUser}
        />
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {error && <ErrorAlert message={error} />}
        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors">
          Signup
        </button>
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



