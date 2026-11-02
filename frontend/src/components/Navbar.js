import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaCrown } from "react-icons/fa";

const Navbar = ({
  onSignUpClick,
  onLoginClick,
  isLoggedIn,
  onProfileClick,
  onNavigateToLanding,
  onAlertClick,
  onSwitchToVIP
}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [reminderCount, setReminderCount] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/auth/user", {
            headers: { Authorization: token },
          });
          setUserDetails(response.data);
          if (response.data.profilePicture) {
            setProfilePicture(
              `http://localhost:5000/uploads/profilePictures/${response.data.profilePicture}`
            );
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    const fetchReminderCount = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/reminders", {
            headers: { Authorization: token },
          });
          setReminderCount(response.data.length);
        } catch (err) {
          console.error("Error fetching reminders:", err);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
      fetchReminderCount();
    }
  }, [isLoggedIn]);

  const handleNavigation = (sectionId) => {
    onNavigateToLanding();
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const getInitials = (user) => {
    if (!user) return "";
    const { firstName = "", lastName = "" } = user;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="bg-[#1b4332] text-white sticky top-0 z-50 shadow-xl border-b border-emerald-500/30">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1
            className="text-xl md:text-2xl font-black cursor-pointer text-white flex items-center gap-2 tracking-wide"
            onClick={onNavigateToLanding}
          >
            <span>🌾 AHMED FARM</span>
            <span className="text-[#d4af37] text-sm md:text-base font-bold bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/40">
              MANAGEMENT
            </span>
          </h1>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-6 text-sm font-semibold items-center">
          <a
            href="#hero-section"
            onClick={() => handleNavigation("hero-section")}
            className="hover:text-[#52b788] transition"
          >
            Home
          </a>
          <a
            href="#services-section"
            onClick={() => handleNavigation("services-section")}
            className="hover:text-[#52b788] transition"
          >
            Services
          </a>
          <a
            href="#about-section"
            onClick={() => handleNavigation("about-section")}
            className="hover:text-[#52b788] transition"
          >
            About
          </a>

          {/* Switch to 14 Modules VIP OS */}
          <button
            onClick={onSwitchToVIP}
            className="bg-gradient-to-r from-[#d4af37] to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-gray-950 font-black px-3.5 py-1.5 rounded-xl transition shadow-glow-gold flex items-center gap-1.5 text-xs uppercase tracking-wider"
          >
            <FaCrown /> VIP Farm OS
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Reminder Bell */}
          {isLoggedIn && (
            <div
              onClick={onAlertClick}
              className="text-[22px] hover:text-yellow-300 transition-transform transform hover:scale-110 cursor-pointer relative"
              title={
                reminderCount > 0
                  ? `You have ${reminderCount} reminders`
                  : "No reminders"
              }
            >
              <FaBell />
              {reminderCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {reminderCount}
                </span>
              )}
            </div>
          )}

          {/* Profile or Auth Buttons */}
          {isLoggedIn ? (
            <div
              onClick={onProfileClick}
              className="w-10 h-10 rounded-full border-2 border-[#d4af37] cursor-pointer overflow-hidden hover:scale-110 transition duration-300"
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[#2d6a4f] w-full h-full flex items-center justify-center text-[#d4af37] font-bold text-sm">
                  {getInitials(userDetails) || "AK"}
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onSignUpClick}
                className="bg-[#2d6a4f] text-white border border-emerald-400/40 font-semibold px-3.5 py-1.5 rounded-lg hover:bg-[#52b788] hover:text-gray-950 text-xs transition"
              >
                Sign Up
              </button>
              <button
                onClick={onLoginClick}
                className="bg-[#d4af37] text-gray-950 font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-400 text-xs transition shadow-glow-gold"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

