import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

// Sidebar component
function Sidebar({ title, links, logout }) {
  return (
    <nav className="sidebar h-full w-64 fixed top-0 left-0 bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className="mb-2 p-2 hover:bg-gray-700 rounded"
        >
          {link.label}
        </Link>
      ))}
      {logout && (
        <button
          onClick={logout}
          className="mt-auto p-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

// Navbar component
function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { path: "/", label: "Home" },
    { path: "/admin", label: "Admin Dashboard" },
    { path: "/admin/UserCenter", label: "User Center" },
  ];

  const guestLinks = [
    { path: "/", label: "Home" },
    { path: "/user", label: "User Page" },
    { path: "/user/reviews/add", label: "Reviews" },
    { path: "/user/reservations", label: "Reservations" },
  ];

  const hostLinks = [
    { path: "/", label: "Home" },
    { path: "/host", label: "Host Dashboard" },
    { path: "/host/listings", label: "Your Listings" },
    { path: "/host/addProperty", label: "New Listing" },
  ];

  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/signup/guest", label: "Signup" },
  ];

  if (!currentUser) {
    return <Sidebar title="Public Nav" links={publicLinks} />;
  }

  if (currentUser.role === "admin") {
    return (
      <Sidebar title="Admin Nav" links={adminLinks} logout={handleLogout} />
    );
  }

  if (currentUser.role === "guest") {
    return (
      <Sidebar title="User Nav" links={guestLinks} logout={handleLogout} />
    );
  }

  if (currentUser.role === "host") {
    return <Sidebar title="Host Nav" links={hostLinks} logout={handleLogout} />;
  }

  return null;
}

export default Navbar;
