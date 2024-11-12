import React from 'react';
import SignupForm from './SignupForm';

const GuestSignup = () => {
  return <SignupForm role="guest" navigateTo="/verify-otp" />;
};

export default GuestSignup;
