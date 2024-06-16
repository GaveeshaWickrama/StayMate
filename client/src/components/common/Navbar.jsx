import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// AdminNavbar component
function AdminNavbar({ logout }) {
  return (
    <nav>
      <h1>Admin Nav</h1>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin Dashboard</Link>
      <Link to="/admin/UserCenter">UserCenter</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

// UserNavbar component
function UserNavbar({ logout }) {
  return (
    <nav>
      <h1>User</h1>
      <Link to="/">Home</Link>
      <Link to="/user">User Dashboard</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

// PublicNavbar component
function PublicNavbar() {
  return (
    <nav>
      <h1>Public Nav</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

// Main Navbar component
function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return <PublicNavbar />;
  }

  if (currentUser.role === 'admin') {
    return <AdminNavbar logout={handleLogout} />;
  }

  if (currentUser.role === 'user') {
    return <UserNavbar logout={handleLogout} />;
  }

  return null;
}

export default Navbar;
