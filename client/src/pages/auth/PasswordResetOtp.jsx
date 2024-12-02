import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaCheck } from 'react-icons/fa';
import InputField from '../../components/InputField'; // Assuming you have this component
import ErrorAlert from '../../components/ErrorAlert'; // Assuming you have this component
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming you have this component
import Logo from '../../components/Logo'; // Assuming you have this component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [emailValidated, setEmailValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Request password reset
  const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/request-password-reset`, { email });
      return { success: true, message: response.data.message, error: null };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to request password reset.';
      return { success: false, message: null, error: errorMessage };
    }
  };

  // Reset password
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { email, otp, newPassword });
      return { success: true, message: response.data.message, error: null };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password.';
      return { success: false, message: null, error: errorMessage };
    }
  };

  // Handle OTP input
  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (value.length === 1) { // Allow any single character
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    }
  };

  // Handle OTP request
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await requestPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setEmailValidated(true);
    } else {
      setError(result.error);
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (newPassword !== reenteredPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const otpCode = otp.join('');
    const result = await resetPassword(email, otpCode, newPassword);
    setLoading(false);

    if (result.success) {
      navigate('/login'); // Redirect to login page
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-8 py-10 rounded shadow-md w-full max-w-sm">
        <Logo className="mb-6" />
        <h2 className="text-2xl font-bold mb-4 text-center">Password Reset</h2>
        {!emailValidated && (
          <p className="text-gray-600 text-sm text-center mb-6">
            Enter your registered email address. We will send you an OTP to reset your password.
          </p>
        )}
        {loading && <LoadingSpinner message="Processing..." />}
        {error && <ErrorAlert message={error} />}
        {!loading && (
          <>
            {!emailValidated ? (
              <div>
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  IconComponent={FaEnvelope}
                />
                <button
                  onClick={handleRequestOtp}
                  className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
                >
                  <FaArrowRight className="mr-2" />
                  Request OTP
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                  Check your email for the OTP after submitting your email.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-center space-x-2 mb-4">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
                <InputField
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
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
                <p className="text-gray-500 text-sm text-center mt-2">
                  Use at least 8 characters, including letters and numbers.
                </p>
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-900 transition-colors mt-4"
                >
                  <FaCheck className="mr-2" />
                  Reset Password
                </button>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default PasswordReset;
