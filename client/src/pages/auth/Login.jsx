import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { FaArrowRight, FaExclamationCircle, FaQuestionCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ErrorAlert from '../../components/ErrorAlert';

const LoginForm = () => {
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
    <form onSubmit={handleSubmit} className="bg-white p-8 pt-4 rounded shadow-md w-full max-w-sm">
      <Logo />
      <h2 className="text-2xl font-bold mb-10 text-center">Log in to STAYMATE</h2>
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
      <div className="flex mb-4 mt-4 text-sm text-gray-600">
        <FaExclamationCircle className="mr-1" />
        {/* Link to the password reset OTP page */}
        <Link to="/reset-password-otp" className="hover:underline relative top-[-3px]">Forgotten password?</Link>
      </div>
      <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors">
        <FaArrowRight className="mr-2" />
        Login
      </button>
      <div className="flex mb-4 mt-10 text-sm text-gray-600">
        <FaQuestionCircle className="mr-1" />
        <div className='relative top-[-3px]'>Don't have an account? </div>
        <Link to="/signup/guest" className="flex hover:underline relative top-[-3px]">
          <div className="text-blue-600 ml-1">Create your account</div>
        </Link>
      </div>
    </form>
  );
};

// Login Component
const Login = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <LoginForm />
  </div>
);

export default Login;
