import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';

const GuestSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signup(email, password, 'guest');
    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: { email, password, role: 'guest' } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 pt-4 rounded shadow-md w-full max-w-sm">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">Guest Signup</h2>
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
        {error && <ErrorAlert message={error} />}
        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors">
          Signup
        </button>
        <div className="flex flex-col mt-4 text-sm text-gray-600 text-center">
          <p className="mb-2">Are you looking to provide a service?</p>
          <Link to="/signup/host" className="hover:underline text-blue-600 mb-1">Signup as a Host</Link>
          <Link to="/signup/technician" className="hover:underline text-blue-600">Signup as a Technician</Link>
        </div>
      </form>
    </div>
  );
};

export default GuestSignup;
