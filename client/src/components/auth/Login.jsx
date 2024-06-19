import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { FaEnvelope, FaLock, FaArrowRight, FaExclamationCircle, FaQuestionCircle } from 'react-icons/fa'; // Example icons from react-icons
import logo from '../../assets/icons/logo.png'; // Adjust the path to your logo

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      console.log(result);
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message); // Assuming the error object has a message property
      console.error('Failed to login', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 pt-2 rounded shadow-md w-full max-w-sm">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="text-2xl font-bold mb-10 text-center">Log in to STAYMATE</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            autoComplete="off"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer placeholder-transparent h-10 w-full pl-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Email address"
            required
          />
          <label
            htmlFor="email"
            className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            Email Address
          </label>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            autoComplete="off"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer placeholder-transparent h-10 w-full pl-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
            placeholder="Password"
            required
          />
          <label
            htmlFor="password"
            className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            Password
          </label>
        </div>
        <div className="flex  mb-4 mt-4 text-sm text-gray-600">
          <FaExclamationCircle className="mr-1" />
          <Link to="/forgot-password" className="hover:underline relative top-[-3px]">Forgotten password?</Link>
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors">
          <FaArrowRight className="mr-2" />
          Login
        </button>
        <div className="flex mb-4 mt-10 text-sm text-gray-600">
          <FaQuestionCircle className="mr-1" />
          <Link to="/signup" className="flex hover:underline relative top-[-3px]">
          <div >Don't have an account? </div>
          <div className='text-blue-600 ml-1'>Create your account</div>
         </Link>
        </div>

      </form>
    </div>
  );
}

export default Login;




