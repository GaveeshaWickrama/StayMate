import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri"; // Example of using React Icons for logout icon
import { BsFillHousesFill } from "react-icons/bs"; // for the view new properties


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
  "View New Properties": <BsFillHousesFill />,
};

function Sidebar({ title, links, logout, isVisible }) {
  return (
    <nav className={`sidebar ${isVisible ? 'visible' : ''} h-full w-64 fixed top-20 left-0 bg-gray-800 z-2 text-white flex flex-col p-4`}>
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

function Navbar({ isVisible }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const adminLinks = [
    { path: "/", label: "Home" },
    { path: "/admin", label: "Admin Dashboard" },
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
    { path: "/user", label: "User Page" },
    { path: "/user/reviews/add", label: "Reviews" },
    { path: "/user/reservations", label: "Reservations" },
  ];
  
  const hostLinks = [
    { path: "/", label: "Home" },
    { path: "/host", label: "Host Dashboard" },
    { path: "/host/listings", label: "Your Listings" },
    { path: "/host/add-property", label: "New Listing" },
    { path: "/host/reservations", label: "Reservations" },
    { path: "/host/property-details", label: "Test" },
    { path: "/host/view-complaints", label: "Complaints" },
    { path: "/host/manage-complaints", label: "Complaints" },
    { path: "/host/view-technicians", label: "Technicians" },
  ];

  const technicianLinks = [
    { path: "/technician/dashboard", label: "Home" },
    { path: "/technician/dashboard", label: "Dashboard" },
    { path: "/technician/MyProfile", label: "My Profile" },
    { path: "/technician/requests/pending-tasks", label: "Pending Tasks" },
    { path: "/technician/requests/active-tasks", label: "Active Tasks" },
    { path: "/technician/tasks", label: "Tasks" },
    { path: "/host/viewReviews", label: "Reviews" },
  ];
  
  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/signup/guest", label: "Signup" },
  ];
  
  if (!currentUser) {
    return <Sidebar title="Public Nav" links={publicLinks} isVisible={isVisible} />;
  }
  
  if (currentUser.role === "admin") {
    return <Sidebar title="Admin Nav" links={adminLinks} logout={handleLogout} isVisible={isVisible} />;
  }
  
  if (currentUser.role === "guest") {
    return <Sidebar title="User Nav" links={guestLinks} logout={handleLogout} isVisible={isVisible} />;
  }
  
  if (currentUser.role === "host") {
    return <Sidebar title="Host Nav" links={hostLinks} logout={handleLogout} isVisible={isVisible} />;
  }

  if (currentUser.role === "technician") {
    return <Sidebar title="Technician Nav" links={technicianLinks} logout={handleLogout} isVisible={isVisible} />;
  }

  if (currentUser.role === "moderator") {
    return <Sidebar title="Moderator Nav" links={moderatorLinks} logout={handleLogout} isVisible={isVisible} />;
  }
  
  if (currentUser.role === "moderator") {
    return <Sidebar title="Moderator Nav" links={moderatorLinks} logout={handleLogout} />;
  }


  return null;
}

export default Navbar;