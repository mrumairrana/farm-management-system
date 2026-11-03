import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpModal from "./components/Authentication/SignUpModal";
import LoginModal from "./components/Authentication/LoginModal";
import Profile from "./components/profile/Profile";
import ServiceReminders from "./components/ServiceReminders/ServiceReminders";
import CropManagement from "./components/CropManagement/CropManagement";
import LivestockManagement from "./components/LivestockManagement/LivestockManagement";
import ResourceManagement from "./components/ResourceManagement/ResourceManagement";
import MainChatBot from "./components/ChatBot/MainChatBot";
import ReportGeneration from "./components/ReportGeneration/ReportGeneration";
import FarmBuilderLayout from "./components/AhmedFarm/FarmBuilderLayout";

const App = () => {
  // Modes: "farm_builder" (Default VIP 14-Module OS) or "classic" (Landing / Subsystems)
  const [viewMode, setViewMode] = useState("farm_builder");

  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showServiceReminders, setShowServiceReminders] = useState(false);
  const [showCropManagement, setShowCropManagement] = useState(false);
  const [showLivestockManagement, setShowLivestockManagement] = useState(false);
  const [showResourceManagement, setShowResourceManagement] = useState(false);
  const [showReportGeneration, setShowReportGeneration] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const logoutNow = () => {
      localStorage.removeItem("token");
      alert("Session expired. Logging out now.");
      setLoggedIn(false);
      window.location.reload();
    };

    const checkTokenExpiration = () => {
      try {
        const decoded = jwtDecode(token.replace("Bearer ", ""));
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) logoutNow();
      } catch (err) {
        console.error("Token decode error:", err);
        logoutNow();
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 1000);
    checkTokenExpiration();

    return () => clearInterval(intervalId);
  }, []);

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    setLoggedIn(true);
  };

  const handleSignUpSuccess = () => {
    setSignUpOpen(false);
    setLoggedIn(true);
  };

  const toggleProfile = () => setShowProfile(!showProfile);

  const navigateToLanding = () => {
    setShowProfile(false);
    setShowServiceReminders(false);
    setShowCropManagement(false);
    setShowLivestockManagement(false);
    setShowResourceManagement(false);
    setShowReportGeneration(false);
    setShowChatBot(false);
    setViewMode("classic");
  };

  const handleProtectedClick = (setter) => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setter(true);
    }
  };

  return (
    <>
      {viewMode === "farm_builder" ? (
        <FarmBuilderLayout
          onNavigateToClassic={() => {
            navigateToLanding();
          }}
          onOpenChatBot={() => {
            setViewMode("classic");
            setShowChatBot(true);
          }}
          onOpenProfile={() => {
            if (!isLoggedIn) setLoginOpen(true);
            else {
              setViewMode("classic");
              setShowProfile(true);
            }
          }}
          onOpenReminders={() => {
            if (!isLoggedIn) setLoginOpen(true);
            else {
              setViewMode("classic");
              setShowServiceReminders(true);
            }
          }}
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setLoginOpen(true)}
        />
      ) : (
        <>
          <Navbar
            onSignUpClick={() => setSignUpOpen(true)}
            onLoginClick={() => setLoginOpen(true)}
            isLoggedIn={isLoggedIn}
            onProfileClick={toggleProfile}
            onNavigateToLanding={navigateToLanding}
            onSwitchToVIP={() => setViewMode("farm_builder")}
            onAlertClick={() => {
              if (!isLoggedIn) {
                setLoginOpen(true);
              } else {
                setShowProfile(false);
                setShowCropManagement(false);
                setShowLivestockManagement(false);
                setShowResourceManagement(false);
                setShowReportGeneration(false);
                setShowChatBot(false);
                setShowServiceReminders((prev) => !prev);
              }
            }}
          />

          {showProfile ? (
            <Profile onClose={toggleProfile} />
          ) : showServiceReminders ? (
            <ServiceReminders onBackToLanding={navigateToLanding} />
          ) : showCropManagement ? (
            <CropManagement onBackToLanding={navigateToLanding} />
          ) : showLivestockManagement ? (
            <LivestockManagement onBackToLanding={navigateToLanding} />
          ) : showResourceManagement ? (
            <ResourceManagement onBackToLanding={navigateToLanding} />
          ) : showReportGeneration ? (
            <ReportGeneration onBackToLanding={navigateToLanding} />
          ) : showChatBot ? (
            <MainChatBot onBackToLanding={navigateToLanding} />
          ) : (
            <LandingPage
              isLoggedIn={isLoggedIn}
              navigateToLogin={() => setLoginOpen(true)}
              onSwitchToVIP={() => setViewMode("farm_builder")}
              onReminderServiceClick={() =>
                handleProtectedClick(setShowServiceReminders)
              }
              onCropManagementClick={() =>
                handleProtectedClick(setShowCropManagement)
              }
              onLivestockManagementClick={() =>
                handleProtectedClick(setShowLivestockManagement)
              }
              onResourceManagementClick={() =>
                handleProtectedClick(setShowResourceManagement)
              }
              onChatBotClick={() => handleProtectedClick(setShowChatBot)}
              onReportGenerationClick={() =>
                handleProtectedClick(setShowReportGeneration)
              }
            />
          )}
        </>
      )}

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSignUpSuccess={handleSignUpSuccess}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default App;

