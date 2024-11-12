import React from 'react';
import SignupForm from './SignupForm';

const HostSignup = () => {
  return <SignupForm role="host" navigateTo="/verify-otp" />;
};

export default HostSignup;
