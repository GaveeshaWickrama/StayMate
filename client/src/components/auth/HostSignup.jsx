import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

const HostSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signup(email, password, 'host');
    if (error) {
      setError(error);
    } else {
      navigate('/verify-otp', { state: { email, password, role: 'host' } });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Host Signup</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Signup</button>
      </form>
      <div>
        <p>Are you looking to use our services?</p>
        <Link to="/signup/guest">Signup as a Guest</Link>
        <br />
        <Link to="/signup/technician">Signup as a Technician</Link>
      </div>
    </div>
  );
};

export default HostSignup;

