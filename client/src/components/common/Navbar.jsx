import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { BsFillHousesFill } from "react-icons/bs";
import { MdAccountCircle, MdRateReview, MdPayment, MdEventAvailable, MdAddBox, MdLogin, MdPersonAdd } from "react-icons/md";
import { GiHouse, GiChat } from "react-icons/gi";

// Define icons for each link type
const iconMap = {
  Home: <RxDashboard />,
  "Admin Dashboard": <MdAccountCircle />,
  "Manage Moderators": <MdAccountCircle />,
  "User Page": <MdAccountCircle />,
  "My Profile": <MdAccountCircle />,
  Reviews: <MdRateReview />,
  Payments: <MdPayment />,
  Reservations: <MdEventAvailable />,
  "Host Dashboard": <RxDashboard />,
  "Your Listings": <GiHouse />,
  "New Listing": <MdAddBox />,
  Login: <MdLogin />,
  Signup: <MdPersonAdd />,
  "View New Properties": <BsFillHousesFill />,
  Chat: <GiChat />,
};

// Sidebar component
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
            {iconMap[link.label]}
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
    { path: "/admin/MyProfile", label: "My Profile" },
    { path: "/admin/UserCenter", label: "User Center" },
    { path: "/admin/reservations", label: "Reservations" },
    { path: "/admin/Payments", label: "Payments" },
    { path: "/admin/managemoderators", label: "Manage Moderators" },
  ];

  const moderatorLinks = [
    { path: "/", label: "Home" },
    { path: "/moderator", label: "Moderator Dashboard" },
    { path: "/moderator/viewNewProperties", label: "View New Properties" },
  ];

  const guestLinks = [
    { path: "/", label: "Home" },
    { path: "/user/viewreviews", label: "Reviews" },
    { path: "/user/reservations", label: "Reservations" },
    { path: "/user/chat", label: "Chat" },
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
    { path: "/technician/dashboard", label: "dashboard" },
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
    return <Sidebar title="Public Nav" links={publicLinks} />;
  }

  if (currentUser.role === "admin") {
    return <Sidebar title="Admin Nav" links={adminLinks} logout={handleLogout} />;
  }

  if (currentUser.role === "guest") {
    return <Sidebar title="User Nav" links={guestLinks} logout={handleLogout} />;
  }

  if (currentUser.role === "host") {
    return <Sidebar title="Host Nav" links={hostLinks} logout={handleLogout} />;
  }

  if (currentUser.role === "technician") {
    return <Sidebar title="Technician Nav" links={technicianLinks} logout={handleLogout} />;
  }

  if (currentUser.role === "moderator") {
    return <Sidebar title="Moderator Nav" links={moderatorLinks} logout={handleLogout} />;
  }

  return null;
}

export default Navbar;
