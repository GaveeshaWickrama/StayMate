import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri"; // Example of using React Icons for logout icon
import { BsFillHousesFill } from "react-icons/bs"; // for the view new properties

// Define icons for each link type (customize as needed)
const iconMap = {
  Home: "home",
  "Admin Dashboard": "admin_panel_settings",
  "Manage Moderators": "account_circle",
  "User Page": "account_circle",
  Reviews: "rate_review",
  Reservations: "event_available",
  "Host Dashboard": "dashboard",
  "Your Listings": "house",
  "New Listing": "add_box",
  Login: "login",
  Signup: "person_add",
  "View New Properties": <BsFillHousesFill/>,
};

// Sidebar component with updated styling and icons
function Sidebar({ title, links, logout }) {
  return (
    <nav className="sidebar h-full w-64 fixed top-0 left-0 bg-gray-800 z-2 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <IconContext.Provider value={{ className: "inline-block mr-2" }}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="mb-2 p-2 hover:bg-gray-700 rounded flex items-center"
          >
            <span className="material-icons">{iconMap[link.label]}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </IconContext.Provider>
      {logout && (
        <button
          onClick={logout}
          className="mt-auto p-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
        >
          <RiLogoutBoxRLine className="inline-block mr-2" />
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
    // { path: "/admin/MyProfile", label: "My Profile" },
    { path: "/admin/managemoderators", label: "Manage Moderators" },
  ];

  const moderatorLinks = [
    { path: "/", label: "Home" },
    { path: "/moderator", label: "Moderator Dashboard" },
    { path: "/moderator/viewNewProperties", label: "View New Properties" },
    // { path: "/admin/managemoderators", label: "Manage Moderators" },

  ];

  const guestLinks = [
    { path: "/", label: "Home" },
    { path: "/user/viewreviews", label: "Reviews" },
    { path: "/user/reservations", label: "Reservations" },
  ];

  const hostLinks = [
    { path: "/", label: "Home" },
    { path: "/host", label: "Host Dashboard" },
    { path: "/host/listings", label: "Your Listings" },
    { path: "/host/add-property", label: "New Listing" },
    { path: "/host/reservations", label: "Reservations" },
    { path: "/host/property-details", label: "Test" },
    { path: "/host/viewReviews", label: "Reviews" },
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

  if (currentUser.role === "moderator") {
    return <Sidebar title="Moderator Nav" links={moderatorLinks} logout={handleLogout} />;
  }

  return null;
}

export default Navbar;
