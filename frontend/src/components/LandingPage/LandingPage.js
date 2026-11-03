import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sprout,
  Leaf,
  Tractor,
  Bot,
  BellRing,
  ChartNoAxesCombined,
  ShieldCheck,
  Activity,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

import HeroSectionImage from "../../assets/main_page.jpeg";
import visionImage from "../../assets/vision.jpg";
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import service4 from "../../assets/service4.jpg";
import service5 from "../../assets/service5.jpg";
import service6 from "../../assets/service6.jpg";

import "./LandingPage.css";

const LandingPage = ({
  isLoggedIn,
  navigateToLogin,
  onReminderServiceClick,
  onCropManagementClick,
  onLivestockManagementClick,
  onResourceManagementClick,
  onChatBotClick,
  onReportGenerationClick,
  onSwitchToVIP,
}) => {
  const handleGetStarted = () => {
    if (onSwitchToVIP) {
      onSwitchToVIP();
    } else {
      document
        .getElementById("services-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProtectedClick = (callback) => {
    if (!isLoggedIn) {
      navigateToLogin?.();
      return;
    }
    callback?.();
  };

  const services = [
    {
      number: "01",
      title: "Crop Management",
      description:
        "Manage field plots, monitor soil conditions, track sowing cycles, fertilizers, irrigation and harvest performance.",
      image: service1,
      icon: Sprout,
      tag: "Field Operations",
      action: () => handleProtectedClick(onCropManagementClick),
    },
    {
      number: "02",
      title: "Livestock Management",
      description:
        "Centralize animal profiles, breeding records, health histories, pedigree information and livestock performance.",
      image: service2,
      icon: Leaf,
      tag: "Animal Management",
      action: () => handleProtectedClick(onLivestockManagementClick),
    },
    {
      number: "03",
      title: "Inventory & Resources",
      description:
        "Track feed, seeds, equipment, fertilizers and farm supplies with organized inventory and stock monitoring.",
      image: service3,
      icon: Tractor,
      tag: "Resource Planning",
      action: () => handleProtectedClick(onResourceManagementClick),
    },
    {
      number: "04",
      title: "Farm Builder AI",
      description:
        "Access intelligent farming assistance for agricultural planning, livestock questions and crop management.",
      image: service4,
      icon: Bot,
      tag: "AI Assistance",
      action: () => handleProtectedClick(onChatBotClick),
    },
    {
      number: "05",
      title: "Reminders & Tasks",
      description:
        "Stay organized with important reminders for vaccination, feeding, irrigation, planting and daily farm tasks.",
      image: service5,
      icon: BellRing,
      tag: "Smart Scheduling",
      action: () => onReminderServiceClick?.(),
    },
    {
      number: "06",
      title: "Reports & Analytics",
      description:
        "Turn farm records into useful insights with performance summaries, production reports and downloadable PDFs.",
      image: service6,
      icon: ChartNoAxesCombined,
      tag: "Business Intelligence",
      action: () => handleProtectedClick(onReportGenerationClick),
    },
  ];

  const benefits = [
    "Centralized farm operations",
    "Better resource visibility",
    "Data-driven farm decisions",
    "Organized production records",
  ];

  return (
    <main className="fb-landing">

      {/* HERO SECTION */}
      <section
        className="fb-hero"
        id="hero-section"
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            rgba(5, 30, 22, 0.97) 0%,
            rgba(5, 30, 22, 0.88) 43%,
            rgba(5, 30, 22, 0.35) 100%
          ), url(${HeroSectionImage})`,
        }}
      >
        <div className="fb-container fb-hero-inner">
          <div className="fb-hero-content">
            <div className="fb-eyebrow">
              <span className="fb-live-dot" />
              NEXT-GENERATION FARM MANAGEMENT
            </div>

            <h1>
              Smarter Farming.
              <br />
              <span>Stronger Future.</span>
            </h1>

            <p className="fb-hero-description">
              Welcome to Farm Builder — your intelligent
              agricultural management platform. Manage
              livestock, crops, resources, operations
              and analytics from one powerful system.
            </p>

            <div className="fb-hero-actions">
              <button
                type="button"
                className="fb-btn fb-btn-gold"
                onClick={handleGetStarted}
              >
                <LayoutDashboard size={19} />
                Explore VIP Dashboard
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="fb-btn fb-btn-outline"
                onClick={() =>
                  document
                    .getElementById("services-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Solutions
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="fb-hero-trust">
              <span>
                <ShieldCheck size={17} />
                Organized Operations
              </span>
              <span>
                <Activity size={17} />
                Farm Analytics
              </span>
              <span>
                <Sparkles size={17} />
                AI Assistance
              </span>
            </div>
          </div>

          <div className="fb-hero-floating">
            <div className="fb-floating-icon">
              <Sprout size={24} />
            </div>
            <div>
              <span>FARM BUILDER ENTERPRISE</span>
              <strong>One Farm. One Platform.</strong>
              <small>Complete Digital Farm Management</small>
            </div>
          </div>
        </div>

        <div className="fb-hero-bottom-line" />
      </section>

      {/* PLATFORM HIGHLIGHTS */}
      <section className="fb-highlights">
        <div className="fb-container fb-highlights-grid">
          {[
            {
              value: "14",
              label: "Enterprise Modules",
              icon: LayoutDashboard,
            },
            {
              value: "360",
              label: "Farm Visibility",
              icon: Activity,
            },
            {
              value: "AI",
              label: "Smart Assistance",
              icon: Bot,
            },
            {
              value: "24/7",
              label: "Digital Record Access",
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div className="fb-highlight" key={item.label}>
                <div className="fb-highlight-icon">
                  <Icon size={23} />
                </div>
                <div>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="fb-vision" id="vision-section">
        <div className="fb-container fb-vision-grid">
          <div className="fb-vision-image-wrap">
            <img
              src={visionImage}
              alt="Farm Builder agricultural vision"
              className="fb-vision-image"
              loading="lazy"
            />

            <div className="fb-vision-image-badge">
              <div className="fb-vision-badge-icon">
                <Leaf size={23} />
              </div>
              <div>
                <strong>Growing Together</strong>
                <span>Building smarter farms</span>
              </div>
            </div>
          </div>

          <div className="fb-vision-content">
            <span className="fb-section-label">
              <span className="fb-label-line" />
              OUR VISION
            </span>

            <h2>
              Transforming Agriculture
              Through <span>Innovation.</span>
            </h2>

            <p>
              At Farm Builder, we believe modern farming
              deserves modern technology. Our vision is
              to simplify complex agricultural operations
              through one connected digital ecosystem.
            </p>

            <p>
              From livestock monitoring and crop planning
              to inventory control and financial insights,
              Farm Builder helps farm operators make
              informed decisions with greater confidence.
            </p>

            <div className="fb-benefits">
              {benefits.map((benefit) => (
                <div className="fb-benefit" key={benefit}>
                  <CheckCircle2 size={19} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="fb-text-link"
              onClick={() =>
                document
                  .getElementById("services-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Discover Our Solutions
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="fb-services" id="services-section">
        <div className="fb-container">
          <div className="fb-section-heading">
            <span className="fb-section-label fb-center-label">
              <span className="fb-label-line" />
              OUR SOLUTIONS
              <span className="fb-label-line" />
            </span>

            <h2>
              Everything Your Farm Needs.
              <br />
              <span>One Powerful Platform.</span>
            </h2>

            <p>
              Explore our integrated farm management
              solutions designed to streamline operations,
              improve visibility and support smarter decisions.
            </p>
          </div>

          <div className="fb-services-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  type="button"
                  className="fb-service-card"
                  key={service.number}
                  onClick={service.action}
                >
                  <div className="fb-service-image-wrap">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                    />

                    <span className="fb-service-number">
                      {service.number}
                    </span>
                  </div>

                  <div className="fb-service-content">
                    <div className="fb-service-top">
                      <div className="fb-service-icon">
                        <Icon size={24} />
                      </div>
                      <span className="fb-service-tag">
                        {service.tag}
                      </span>
                    </div>

                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <div className="fb-service-link">
                      Explore Module
                      <span>
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="fb-cta-section">
        <div className="fb-container">
          <div className="fb-cta">
            <div className="fb-cta-decoration">
              <Sprout size={180} strokeWidth={1} />
            </div>

            <div className="fb-cta-content">
              <span className="fb-cta-label">
                YOUR FARM. YOUR FUTURE.
              </span>

              <h2>
                Ready to Build a
                <br />
                Smarter Farm?
              </h2>

              <p>
                Bring your farm operations together with
                intelligent tools, organized records
                and powerful management capabilities.
              </p>
            </div>

            <button
              type="button"
              className="fb-btn fb-btn-gold fb-cta-button"
              onClick={handleGetStarted}
            >
              Get Started Today
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fb-footer" id="about-section">
        <div className="fb-container">
          <div className="fb-footer-grid">
            <div className="fb-footer-brand">
              <div className="fb-brand-logo">
                <div className="fb-brand-icon">
                  <Sprout size={26} />
                </div>
                <div>
                  <strong>Farm Builder</strong>
                  <span>MANAGEMENT SYSTEM</span>
                </div>
              </div>

              <p>
                Empowering agricultural businesses
                with intelligent digital tools for
                efficient, sustainable and
                data-driven farm management.
              </p>

              <div className="fb-footer-brand-tag">
                <Leaf size={16} />
                Growing Smarter. Farming Better.
              </div>
            </div>

            <div className="fb-footer-column">
              <h4>Quick Links</h4>
              <a href="#hero-section">
                <ChevronRight size={15} /> Home
              </a>
              <a href="#vision-section">
                <ChevronRight size={15} /> Our Vision
              </a>
              <a href="#services-section">
                <ChevronRight size={15} /> Our Solutions
              </a>
              <a href="#about-section">
                <ChevronRight size={15} /> About Us
              </a>
            </div>

            <div className="fb-footer-column">
              <h4>Our Solutions</h4>
              <a href="#services-section">Crop Management</a>
              <a href="#services-section">Livestock Management</a>
              <a href="#services-section">Inventory Control</a>
              <a href="#services-section">AI Farm Advisor</a>
              <a href="#services-section">Farm Analytics</a>
            </div>

            <div className="fb-footer-column fb-contact">
              <h4>Get In Touch</h4>

              <div>
                <MapPin size={19} />
                <span>Lahore, Punjab, Pakistan</span>
              </div>

              <div>
                <Mail size={19} />
                <a href="mailto:admin@farmbuilder.pk">
                  admin@farmbuilder.pk
                </a>
              </div>

              <div>
                <Mail size={19} />
                <a href="mailto:support@farmbuilder.pk">
                  support@farmbuilder.pk
                </a>
              </div>

              <div>
                <Phone size={19} />
                <a href="tel:+923094093333">
                  +92 309 409 3333
                </a>
              </div>
            </div>
          </div>

          <div className="fb-footer-bottom">
            <span>
              © {new Date().getFullYear()} Farm Builder.
              All rights reserved.
            </span>

            <span>
              Farm Builder — Managing Your Farm,
              Maximizing Your Future.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
