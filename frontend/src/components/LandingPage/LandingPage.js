import React from "react";
import HeroSectionImage from "../../assets/main_page.jpeg";
import visionImage from "../../assets/vision.jpg";
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import service4 from "../../assets/service4.jpg";
import service5 from "../../assets/service5.jpg";
import service6 from "../../assets/service6.jpg";
import "./HeroSection.css";
import "./Vision.css";
import "./Services.css";
import "./Footer.css";

const LandingPage = ({
  isLoggedIn,
  navigateToLogin,
  onReminderServiceClick,
  onCropManagementClick,
  onLivestockManagementClick,
  onResourceManagementClick,
  onChatBotClick,
  onReportGenerationClick,
  onSwitchToVIP
}) => {
  const handleGetStarted = () => {
    if (onSwitchToVIP) {
      onSwitchToVIP();
    } else {
      const servicesSection = document.getElementById("services-section");
      servicesSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <section
        className="hero"
        id="hero-section"
        style={{
          backgroundImage: `url(${HeroSectionImage})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="inline-block bg-[#d4af37] text-gray-950 text-xs font-black uppercase px-3 py-1 rounded-full mb-3 shadow-glow-gold">
            🌾 Farm Builder ENTERPRISE
          </div>
          <h1>Farm Builder — Managing Your Farm, Maximizing Your Future</h1>
          <p className="w-[600px] max-w-full mx-auto text-gray-200">
            A comprehensive, data-rich Farm Management System for precision livestock monitoring, daily milk production logs, crop plot lifecycle analytics, financial tracking, and intelligent farm assistance.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button className="button bg-[#d4af37] text-gray-950 hover:bg-yellow-400 font-black shadow-glow-gold" onClick={handleGetStarted}>
              🚀 Launch 14-Module VIP Dashboard
            </button>
          </div>
        </div>
      </section>

      <section className="vision">
        <div className="text">
          <h2>Our Vision</h2>
          <p>
            To empower modern agricultural operations through comprehensive digital tools branded as the <strong>Farm Builder Management System</strong>. Our centralized platform provides real-time livestock tracking, milk yield auditing, crop field growth mapping, financial ledger analytics, veterinary medical history, and AI-powered farming advisory.
          </p>
        </div>
        <div className="image">
          <img src={visionImage} alt="Vision" />
        </div>
      </section>

      <section className="services" id="services-section">
        <h2>Farm Builder Core Modules & Services</h2>
        <div className="service-list">
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onCropManagementClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service1} alt="Crop Management" />
            <h3>Crop Management</h3>
            <p>
              Record and monitor 8 field plots, sowing dates, moisture levels, fertilization, and harvest profit margins.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onLivestockManagementClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service2} alt="Livestock Management" />
            <h3>Livestock Management</h3>
            <p>
              Pedigree tracking for 156 animals across Dairy, Beef, Sheep, Goats, Poultry, Rabbits, and Pigs with printable ID cards.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onResourceManagementClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service3} alt="Resource Management" />
            <h3>Inventory & Stock Control</h3>
            <p>
              Streamline feed, seeds, fertilizers, and machinery maintenance tracking with automatic low stock alerts.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onChatBotClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service4} alt="ChatBot" />
            <h3>Farm Builder AI Advisor</h3>
            <p>
              Get real-time answers to agricultural, dairy, and crop queries in English and Urdu using Gemini AI.
            </p>
          </div>
          <div className="service-item" onClick={onReminderServiceClick}>
            <img src={service5} alt="Reminders Service" />
            <h3>Reminders & Task Board</h3>
            <p>
              Create automated alerts for planting, milking, vaccination, and field irrigation schedules.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onReportGenerationClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service6} alt="Report Generation" />
            <h3>Analytics & PDF Records</h3>
            <p>
              Generate and download official PDF summaries of livestock, milk yields, crop harvests, and financial statements.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer" id="about-section">
        <h3>Farm Builder Management System</h3>
        <p className="text-amber-300 font-semibold mb-2">
          "Farm Builder — Managing Your Farm, Maximizing Your Future"
        </p>
        <p>
          <strong>Headquarters:</strong> Lahore, Punjab, Pakistan
        </p>
        <p>
          <strong>Proprietor:</strong> Farm Builder
        </p>
        <p>
          <strong>Email:</strong> admin@farmbuilder.pk • support@farmbuilder.pk
        </p>
        <p>
          <strong>Direct Line:</strong> +92 309 409 3333
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

