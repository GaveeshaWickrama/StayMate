import React from "react";
import { useSocketContext } from '../../context/SocketContext';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { BsFillHousesFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import {
  MdDashboard,
  MdReport,
  MdAccountCircle,
  MdBuild,
  MdGroup,
  MdAssessment,
} from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { MdReportProblem } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import useTotalUnreadMessageCount from '../../hooks/useTotalUnreadMessageCount';
import useConversation from "../../zustand/useConversation";

const iconMap = {
  Home: "home",
  Dashboard: <MdDashboard />,
  "Manage Moderators": <MdAccountCircle />,
  "User Page": "account_circle",
  "My Profile": "account_circle",
  Moderators: "account_circle",
  PropertyOwners: "account_circle",
  Tenants: "account_circle",
  Reviews: "rate_review",
  Reservations: "event_available",
  "Host Dashboard": "dashboard",
  "Your Listings": "house",
  "New Listing": "add_box",
  Login: "login",
  Signup: "person_add",
  Chat: "chat",
  "View New Properties": <BsFillHousesFill />,
  Payments: <FaCreditCard />,
  Report: <MdAssessment />,
  Technicians: <MdBuild />,
  "My Listings": <CiCircleList />,
  Complaints: <MdReportProblem />,
  "Manage Users": <MdGroup />,
  "Active Tasks": <MdOutlineTaskAlt />,
  "Pending Tasks": <FaTasks />,
  Tasks: <GrTasks />,
};


function Sidebar({ title, links, logout, isVisible, newMessageCount }) {
  return (
    <nav
      className={`sidebar ${
        isVisible ? "visible" : ""
      } h-full w-64 fixed top-20 left-0 bg-gray-800 z-2 text-white flex flex-col p-4`}
    >
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
            {link.label === "Chat" && newMessageCount > 0 && (
              <span className="bg-red-600 text-white rounded-full ml-2 px-2 py-1 text-xs">
                {newMessageCount}
              </span>
            )}
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
  useTotalUnreadMessageCount();

  const {totalUnreadMessageCount} = useConversation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { path: "/", label: "Home" },
    { path: "/admin/AdminDashboard", label: "Dashboard" },
    // { path: "/admin/MyProfile", label: "My Profile" },
    // { path: "/admin/Moderator", label: "Moderators" },
    { path: "/admin/report", label: "Report" },
    //{ path: "/admin/PropertyOwners", label: "PropertyOwners" },
    //{ path: "/admin/Tenants", label: "Tenants" },
    //{ path: "/admin/Technicians", label: "Technicians" },
    { path: "/admin/Users", label: "Manage Users" },
    // { path: "/admin/MyProfile", label: "My Profile" },
    //{ path: "/admin/managemoderators", label: "Manage Moderators" },
    //{ path: "/admin/managemoderators", label: "Manage Moderators" },
    { path: "/admin/reservations", label: "Reservations" },
    { path: "/admin/Payments", label: "Payments" },
  ];

  const moderatorLinks = [
    { path: "/", label: "Home" },
    // { path: "/moderator", label: "Moderator Dashboard" },
    { path: "/moderator/viewNewProperties", label: "View New Properties" },
    { path: "/moderator/chat", label: "Chat" },
  ];

  const guestLinks = [
    { path: "/", label: "Home" },
    { path: "/user/dashboard", label: "Dashboard" },
    { path: "/user/viewreviews", label: "Reviews" },
    { path: "/user/reservations", label: "Reservations" },
    { path: "/user/chat", label: "Chat" },
  ];

  const hostLinks = [
    { path: "/", label: "Home" },
    { path: "/host", label: "Dashboard" },
    { path: "/host/listings", label: "My Listings" },
    { path: "/host/add-property", label: "New Listing" },
    { path: "/host/reservations", label: "Reservations" },
    //  { path: "/host/property-details", label: "Test" },
    // { path: "/host/view-complaints", label: "Complaints" },
    { path: "/host/manage-complaints", label: "Complaints" },
    { path: "/host/view-technicians", label: "Technicians" },
    { path: "/host/HostReviews", label: "Reviews" },
    { path: "/host/chat", label: "Chat" },

    { path: "/host/addpaymentdetails", label: "Add Payment Details" }


  ];

  const technicianLinks = [
    // { path: "/technician/dashboard", label: "Home" },
    { path: "/technician/dashboard", label: "Dashboard" },
    // { path: "/technician/MyProfile", label: "My Profile" },
    // { path: "/technician/requests/pending-tasks", label: "Pending Tasks" },
    // { path: "/technician/requests/active-tasks", label: "Active Tasks" },
    { path: "/technician/tasks", label: "Tasks" },
    { path: "/host/viewReviews", label: "Reviews" },
  ];

  const publicLinks = [
    { path: "/", label: "Home" },
    // { path: "/login", label: "Login" },
    // { path: "/signup/guest", label: "Signup" },
  ];

  if (!currentUser) {
    return (
      <Sidebar title="Welcome" links={publicLinks} isVisible={isVisible} />
    );
    // return null; // Do not render the Navbar if the user is not logged in
  }

  if (currentUser.role === "admin") {
    return (
      <Sidebar
        // title="Admin Nav"
        links={adminLinks}
        logout={handleLogout}
        isVisible={isVisible}
        newMessageCount={totalUnreadMessageCount}
      />
    );
  }

  if (currentUser.role === "guest") {
    return (
      <Sidebar
        // title="User Nav"
        links={guestLinks}
        logout={handleLogout}
        isVisible={isVisible}
        newMessageCount={totalUnreadMessageCount}
      />
    );
  }

  if (currentUser.role === "host") {
    return (
      <Sidebar
        // title="Host Nav"
        links={hostLinks}
        logout={handleLogout}
        isVisible={isVisible}
        newMessageCount={totalUnreadMessageCount}
      />
    );
  }

  if (currentUser.role === "technician") {
    return (
      <Sidebar
        // title="Technician Nav"
        links={technicianLinks}
        logout={handleLogout}
        isVisible={isVisible}
        newMessageCount={totalUnreadMessageCount}
      />
    );
  }

  if (currentUser.role === "moderator") {
    return (
      <Sidebar
        // title="Moderator Nav"
        links={moderatorLinks}
        logout={handleLogout}
        isVisible={isVisible}
        newMessageCount={totalUnreadMessageCount}
      />
    );
  }

  return null;
}

export default Navbar;
