import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaExclamationCircle,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the spinner component
import axios from "axios";

const SignupForm = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [nicPassport, setNicPassport] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentStage, setCurrentStage] = useState(1);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateStage1 = async () => {
    const validationErrors = [];

    if (!firstName || !lastName) {
      validationErrors.push("First Name and Last Name are required.");
    }

    const nicRegex = /^[0-9]{9}[vVxX]$|^[0-9]{12}$|^[a-zA-Z0-9]{5,}$/;
    if (!nicPassport.match(nicRegex)) {
      validationErrors.push("Invalid NIC/Passport format.");
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/check-nic-phone`, {
          nicPassport,
          phone,
        });
      } catch (error) {
        validationErrors.push("NIC/Passport is already in use.");
      }
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.match(phoneRegex)) {
      validationErrors.push("Phone number must be exactly 10 digits.");
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/check-nic-phone`, {
          nicPassport,
          phone,
        });
      } catch (error) {
        validationErrors.push("Phone number is already in use.");
      }
    }

    if (!gender) {
      validationErrors.push("Gender selection is required.");
    }

    return validationErrors;
  };

  const handleNext = async () => {
    if (currentStage === 1) {
      const validationErrors = await validateStage1();
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    setErrors([]);
    setCurrentStage(currentStage + 1);
  };

  const handlePrevious = () => {
    setCurrentStage(currentStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];
    if (!email || !password || !reenteredPassword) {
      validationErrors.push("Email, Password, and Re-enter Password are required.");
    }

    if (password !== reenteredPassword) {
      validationErrors.push("Passwords do not match.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    const userData = { email, password, role, nicPassport, phone, gender, firstName, lastName };
    setLoading(true);
    const { error } = await signup(userData);
    setLoading(false);

    if (error) {
      setErrors([error]);
    } else {
      navigate("/verify-otp", { state: userData });
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 py-0 rounded shadow-md w-full max-w-sm my-10 relative h-4/5"
      >
        <Logo />
        <h2 className="text-2xl font-bold mb-10 text-center">
          {role.charAt(0).toUpperCase() + role.slice(1)} Sign-Up
        </h2>
        <div className="w-full bg-gray-200 h-1 mb-6">
          <div
            className="bg-blue-700 h-1"
            style={{ width: currentStage === 1 ? "50%" : "100%" }}
          ></div>
        </div>
        {loading && <LoadingSpinner message="Sending OTP..." />}
        {!loading && (
          <>
            {currentStage === 1 && (
              <>
                <div className="flex space-x-2 mt-14">
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
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full bg-white border rounded px-3 py-2"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mt-4">
                  {errors.length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                      {errors.map((error, index) => (
                        <p key={index} className="text-sm">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-900"
                  >
                    Next
                  </button>
                </div>
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
                <div className="mt-4">
                  {errors.length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                      {errors.map((error, index) => (
                        <p key={index} className="text-sm">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-900"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-700 text-white py-2 px-6 rounded hover:bg-blue-900"
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
