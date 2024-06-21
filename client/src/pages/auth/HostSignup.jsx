import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';

const HostSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== reenteredPassword) {
      setError('Passwords do not match.');
      return;
    }
    const { error } = await signup(email, password, 'host');
    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: { email, password, role: 'host' } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 pt-4 rounded shadow-md w-full max-w-sm">
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">Host Sign-Up</h2>
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
        {error && <ErrorAlert message={error} />}
        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors">
          Signup
        </button>
        <div className="flex mb-4 mt-4 text-sm text-gray-600 items-center justify-center">
          <FaExclamationCircle className="mr-1" />
          <Link to="/login" className="hover:underline">Already have an account?</Link>
        </div>
        <div className="flex flex-col mt-4 text-sm text-gray-600 text-center">
          <p className="mb-2">Are you looking to use our services?</p>
          <div>
            <Link to="/signup/guest" className="hover:underline text-blue-600 mb-1 mr-6">Signup as a Guest</Link>
            <Link to="/signup/technician" className="hover:underline text-blue-600">Signup as a Technician</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HostSignup;
