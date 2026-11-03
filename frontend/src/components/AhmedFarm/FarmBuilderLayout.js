import React, { useState, useEffect } from "react";
import {
  FaChartPie,
  FaTint,
  FaSeedling,
  FaMoneyBillWave,
  FaWarehouse,
  FaUsers,
  FaTractor,
  FaClipboardList,
  FaStethoscope,
  FaSun,
  FaFileAlt,
  FaCog,
  FaBell,
  FaBars,
  FaTimes,
  FaExternalLinkAlt,
  FaClock,
  FaRobot,
  FaPlus,
  FaLanguage
} from "react-icons/fa";

// Import All 14 Modules
import DashboardModule from "./modules/DashboardModule";
import LivestockModule from "./modules/LivestockModule";
import MilkProductionModule from "./modules/MilkProductionModule";
import CropManagementModule from "./modules/CropManagementModule";
import ExpenseTrackerModule from "./modules/ExpenseTrackerModule";
import InventoryStockModule from "./modules/InventoryStockModule";
import StaffWorkersModule from "./modules/StaffWorkersModule";
import EquipmentMachineryModule from "./modules/EquipmentMachineryModule";
import TaskManagementModule from "./modules/TaskManagementModule";
import MedicalHealthModule from "./modules/MedicalHealthModule";
import WeatherLogModule from "./modules/WeatherLogModule";
import ReportsAnalyticsModule from "./modules/ReportsAnalyticsModule";
import SettingsModule from "./modules/SettingsModule";
import NotificationsModule from "./modules/NotificationsModule";

import {
  initialFarmBuilderTips,
  initialAnimalCategories,
  initialAnimals,
  initialMilkRecords,
  initialMilkChartData,
  initialCrops,
  initialExpenses,
  initialRevenues,
  initialInventory,
  initialStaff,
  initialMachinery,
  initialTasks,
  initialMedicalRecords,
  initialWeather,
  initialNotifications,
  initialSettings
} from "./data/initialFarmData";

const FarmBuilderLayout = ({
  onNavigateToClassic,
  onOpenChatBot,
  onOpenProfile,
  onOpenReminders,
  isLoggedIn,
  onLoginClick
}) => {
  // Navigation & UI States
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState("en"); // "en" or "ur"

  // Quick Action Modal States (Floating +)
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [quickActionModal, setQuickActionModal] = useState(null); // "milk", "expense", "task"

  // Quick Form States
  const [quickMilk, setQuickMilk] = useState({ date: new Date().toISOString().split("T")[0], cowName: "Gulabi", quantity: 12.5 });
  const [quickExpense, setQuickExpense] = useState({ date: new Date().toISOString().split("T")[0], title: "", amount: "", category: "Animal Feed & Fodder" });
  const [quickTask, setQuickTask] = useState({ title: "", assignee: "Farm Manager", priority: "High", dueDate: new Date().toISOString().split("T")[0] });

  // Farm Data States (with LocalStorage caching for persistence)
  const [animals, setAnimals] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_animals");
    return saved ? JSON.parse(saved) : initialAnimals;
  });

  const [milkRecords, setMilkRecords] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_milk");
    return saved ? JSON.parse(saved) : initialMilkRecords;
  });

  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_crops");
    return saved ? JSON.parse(saved) : initialCrops;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [revenues, setRevenues] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_revenues");
    return saved ? JSON.parse(saved) : initialRevenues;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_inventory");
    return saved ? JSON.parse(saved) : initialInventory;
  });

  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_staff");
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [machinery, setMachinery] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_machinery");
    return saved ? JSON.parse(saved) : initialMachinery;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [medicalRecords, setMedicalRecords] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_medical");
    return saved ? JSON.parse(saved) : initialMedicalRecords;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_notifications");
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("farmbuilder_settings");
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem("farmbuilder_animals", JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_milk", JSON.stringify(milkRecords));
  }, [milkRecords]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_crops", JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_revenues", JSON.stringify(revenues));
  }, [revenues]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("farmbuilder_settings", JSON.stringify(settings));
  }, [settings]);

  // Live Clock
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  // Urdu Translations Dictionary for Navigation
  const urduModules = {
    dashboard: "01. ڈیش بورڈ (جائزہ)",
    livestock: "02. لائیو اسٹاک مینجمنٹ",
    milk: "03. دودھ کی پیداوار ریکارڈ",
    crops: "04. فصلوں کا انتظام",
    expenses: "05. اخراجات و آمدنی ٹریکر",
    inventory: "06. گودام و انوینٹری اسٹاک",
    staff: "07. ملازمین و لیبر رجسٹر",
    machinery: "08. زرعی مشینری و ٹریکٹر",
    tasks: "09. روزمرہ کام و ٹاسک بورڈ",
    medical: "10. ویٹرنری و میڈیکل ریکارڈ",
    weather: "11. موسمیاتی لاگ و اسپرے",
    reports: "12. رپورٹس و پی ڈی ایف آڈٹ",
    settings: "13. فارم بلڈر سیٹنگز",
    notifications: "14. الرٹس و نوٹیفکیشن سینٹر"
  };

  // 14 Module Definitions
  const navigationModules = [
    { id: "dashboard", name: language === "ur" ? urduModules.dashboard : "01. Dashboard", icon: <FaChartPie />, badge: null },
    { id: "livestock", name: language === "ur" ? urduModules.livestock : "02. Livestock Management", icon: <span className="text-base">🐄</span>, badge: `${animals.length}` },
    { id: "milk", name: language === "ur" ? urduModules.milk : "03. Milk Production Records", icon: <FaTint />, badge: "420L" },
    { id: "crops", name: language === "ur" ? urduModules.crops : "04. Crop Management", icon: <FaSeedling />, badge: `${crops.length}` },
    { id: "expenses", name: language === "ur" ? urduModules.expenses : "05. Expense Tracker", icon: <FaMoneyBillWave />, badge: "₨" },
    { id: "inventory", name: language === "ur" ? urduModules.inventory : "06. Inventory & Stock", icon: <FaWarehouse />, badge: `${inventory.filter(i => i.quantity <= i.minThreshold).length || null}` },
    { id: "staff", name: language === "ur" ? urduModules.staff : "07. Staff & Workers", icon: <FaUsers />, badge: `${staff.length}` },
    { id: "machinery", name: language === "ur" ? urduModules.machinery : "08. Equipment & Machinery", icon: <FaTractor />, badge: `${machinery.length}` },
    { id: "tasks", name: language === "ur" ? urduModules.tasks : "09. Task Management", icon: <FaClipboardList />, badge: `${tasks.filter(t => t.status === "Pending").length}` },
    { id: "medical", name: language === "ur" ? urduModules.medical : "10. Medical & Health", icon: <FaStethoscope />, badge: "Alert" },
    { id: "weather", name: language === "ur" ? urduModules.weather : "11. Weather Log", icon: <FaSun />, badge: "32°C" },
    { id: "reports", name: language === "ur" ? urduModules.reports : "12. Reports & Analytics", icon: <FaFileAlt />, badge: "PDF" },
    { id: "settings", name: language === "ur" ? urduModules.settings : "13. Farm Builder Settings", icon: <FaCog />, badge: null },
    { id: "notifications", name: language === "ur" ? urduModules.notifications : "14. Notifications Center", icon: <FaBell />, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null }
  ];

  // Quick Action Handlers
  const handleQuickMilkSubmit = (e) => {
    e.preventDefault();
    const qty = parseFloat(quickMilk.quantity) || 10;
    const newRecord = {
      id: `m_${Date.now()}`,
      date: quickMilk.date,
      session: "Morning",
      animalId: "FB-C001",
      animalName: quickMilk.cowName,
      morning: qty / 2,
      evening: qty / 2,
      quantity: qty,
      fatPercent: 4.2,
      snf: 8.9,
      qualityGrade: "A",
      soldStatus: "Sold (Bulk Supply)",
      pricePerLiter: 185,
      revenue: Math.round(qty * 185),
      storageTank: "Tank A (Cold 4°C)",
      loggedBy: "Farm Builder (Quick Entry)",
      notes: "Quick rapid entry"
    };
    setMilkRecords([newRecord, ...milkRecords]);
    setQuickActionModal(null);
    alert(`Quick Milk Record of ${qty} Liters saved!`);
  };

  const handleQuickExpenseSubmit = (e) => {
    e.preventDefault();
    if (!quickExpense.title || !quickExpense.amount) return;
    const amt = parseFloat(quickExpense.amount) || 0;
    const newExp = {
      id: `exp_${Date.now()}`,
      date: quickExpense.date,
      title: quickExpense.title,
      category: quickExpense.category,
      amount: amt,
      paymentStatus: "Paid",
      paymentMethod: "Cash",
      vendor: "Local Agro Vendor",
      invoiceNumber: `INV-FB-${Math.floor(1000 + Math.random() * 9000)}`,
      approvedBy: "Farm Builder (Owner)"
    };
    setExpenses([newExp, ...expenses]);
    setQuickActionModal(null);
    alert(`Quick Expense of ₨${amt.toLocaleString()} saved in ledger!`);
  };

  const handleQuickTaskSubmit = (e) => {
    e.preventDefault();
    if (!quickTask.title) return;
    const newTask = {
      id: `t_${Date.now()}`,
      title: quickTask.title,
      category: "Operations",
      priority: quickTask.priority,
      status: "Pending",
      dueDate: quickTask.dueDate,
      assignee: quickTask.assignee,
      description: "Quick rapid task dispatch"
    };
    setTasks([newTask, ...tasks]);
    setQuickActionModal(null);
    alert(`Task "${quickTask.title}" created and assigned to ${quickTask.assignee}!`);
  };

  // Aggregated data object passed to sub-modules
  const combinedFarmData = {
    tips: initialFarmBuilderTips,
    animals,
    milkRecords,
    milkChartData: initialMilkChartData,
    crops,
    expenses,
    revenues,
    inventory,
    staff,
    machinery,
    tasks,
    medicalRecords,
    weather: initialWeather,
    notifications,
    settings
  };

  // Render Dynamic Module View
  const renderModuleView = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <DashboardModule
            farmData={combinedFarmData}
            onNavigateModule={(mod) => setActiveModule(mod)}
          />
        );
      case "livestock":
        return (
          <LivestockModule
            animals={animals}
            setAnimals={setAnimals}
            categories={initialAnimalCategories}
          />
        );
      case "milk":
        return (
          <MilkProductionModule
            milkRecords={milkRecords}
            setMilkRecords={setMilkRecords}
            animals={animals}
          />
        );
      case "crops":
        return <CropManagementModule crops={crops} setCrops={setCrops} />;
      case "expenses":
        return (
          <ExpenseTrackerModule
            expenses={expenses}
            setExpenses={setExpenses}
            revenues={revenues}
            setRevenues={setRevenues}
          />
        );
      case "inventory":
        return (
          <InventoryStockModule
            inventory={inventory}
            setInventory={setInventory}
          />
        );
      case "staff":
        return <StaffWorkersModule staff={staff} setStaff={setStaff} />;
      case "machinery":
        return (
          <EquipmentMachineryModule
            machinery={machinery}
            setMachinery={setMachinery}
          />
        );
      case "tasks":
        return (
          <TaskManagementModule
            tasks={tasks}
            setTasks={setTasks}
            staff={staff}
          />
        );
      case "medical":
        return (
          <MedicalHealthModule
            medicalRecords={medicalRecords}
            setMedicalRecords={setMedicalRecords}
            animals={animals}
          />
        );
      case "weather":
        return <WeatherLogModule weather={initialWeather} />;
      case "reports":
        return <ReportsAnalyticsModule farmData={combinedFarmData} />;
      case "settings":
        return (
          <SettingsModule
            settings={settings}
            setSettings={setSettings}
            farmData={combinedFarmData}
          />
        );
      case "notifications":
        return (
          <NotificationsModule
            notifications={notifications}
            setNotifications={setNotifications}
            onNavigateModule={(mod) => setActiveModule(mod)}
          />
        );
      default:
        return (
          <DashboardModule
            farmData={combinedFarmData}
            onNavigateModule={(mod) => setActiveModule(mod)}
          />
        );
    }
  };

  return (
    <div
      dir={language === "ur" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#1a1a2e] text-white flex flex-col font-sans selection:bg-[#52b788] selection:text-gray-950"
    >
      {/* ========================================================================= */}
      {/* 1. FIXED TOP HEADER */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#131324]/95 backdrop-blur-md border-b border-emerald-500/25 z-40 px-4 md:px-6 flex justify-between items-center shadow-lg">
        {/* Left: Brand Logo & Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 text-gray-300 hover:text-[#52b788] hover:bg-gray-800 rounded-lg transition"
            title="Toggle Sidebar"
          >
            <FaBars />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-[#52b788] hover:bg-gray-800 rounded-lg transition"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div
            onClick={() => setActiveModule("dashboard")}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] border border-[#d4af37]/60 flex items-center justify-center text-xl shadow-glow-gold group-hover:scale-105 transition">
              🌾
            </div>
            <div>
              <div className="font-extrabold text-sm md:text-base tracking-wide text-white flex items-center gap-1.5">
                <span>Farm Builder</span>
                <span className="text-[#d4af37] font-black text-xs md:text-sm bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  MANAGEMENT SYSTEM
                </span>
              </div>
              <p className="text-[10px] text-gray-400 hidden sm:block italic leading-none">
                Farm Builder — Managing Your Farm, Maximizing Your Future
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Date & Clock */}
        <div className="hidden xl:flex items-center gap-3 bg-gray-900/80 px-3.5 py-1.5 rounded-full border border-emerald-500/20 text-xs text-gray-300">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <FaClock className="text-emerald-400 text-[11px]" />
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300 font-medium">
            {currentTime.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-[#d4af37] font-semibold text-[11px]">VIP Operations Active</span>
        </div>

        {/* Right Action Icons & Portal Switch */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-gray-700"
            title="Toggle English / Urdu Language"
          >
            <FaLanguage className="text-amber-400" />
            <span>{language === "en" ? "اردو" : "English"}</span>
          </button>

          {/* AI Chatbot Button */}
          <button
            onClick={onOpenChatBot}
            className="bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-emerald-500/30 shadow-glow-green"
            title="Ask Farm Builder AI Chatbot"
          >
            <FaRobot className="text-sm" />
            <span className="hidden md:inline">Farm AI</span>
          </button>

          {/* Switch to Classic Portal Toggle */}
          <button
            onClick={onNavigateToClassic}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-[#d4af37] px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-gray-700"
            title="Switch to Landing Page / Classic Services Portal"
          >
            <FaExternalLinkAlt className="text-[10px]" />
            <span className="hidden sm:inline">Classic View</span>
          </button>

          {/* Notifications Bell */}
          <div
            onClick={() => setActiveModule("notifications")}
            className="relative cursor-pointer p-2 text-gray-300 hover:text-amber-300 transition text-lg"
            title="Notifications Center"
          >
            <FaBell />
            {unreadNotifCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifCount}
              </span>
            )}
          </div>

          {/* Profile Badge */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2 cursor-pointer p-1 bg-gray-900/90 rounded-full border border-emerald-500/30 hover:border-[#d4af37] transition"
            title="Farm Builder Owner Profile"
          >
            <div className="w-8 h-8 rounded-full bg-[#2d6a4f] text-[#d4af37] font-extrabold flex items-center justify-center text-xs">
              UR
            </div>
            <div className="hidden md:block pr-2 text-left">
              <div className="text-xs font-bold text-white leading-none">Umair Rana</div>
              <span className="text-[9px] text-[#d4af37] font-semibold">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BODY LAYOUT: SIDEBAR + MAIN DYNAMIC CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex pt-16 pb-12 overflow-hidden">
        {/* LEFT COLLAPSIBLE SIDEBAR */}
        <aside
          className={`fixed lg:sticky top-16 h-[calc(100vh-7rem)] bg-[#121224]/95 backdrop-blur-md border-r border-emerald-500/20 z-30 transition-all duration-300 flex flex-col justify-between overflow-y-auto ${
            sidebarCollapsed ? "w-20" : "w-64"
          } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
              {!sidebarCollapsed ? (language === "ur" ? "14 زرعی ماڈیولز" : "14 System Modules") : "Modules"}
            </div>

            {navigationModules.map((mod) => {
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveModule(mod.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 text-left relative group ${
                    isActive
                      ? "bg-[#2d6a4f] text-white shadow-glow-green border border-emerald-400/40"
                      : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
                  }`}
                  title={mod.name}
                >
                  <span
                    className={`text-base shrink-0 ${
                      isActive ? "text-[#d4af37]" : "text-gray-400 group-hover:text-emerald-400"
                    }`}
                  >
                    {mod.icon}
                  </span>

                  {!sidebarCollapsed && (
                    <span className="truncate flex-1 font-medium">{mod.name}</span>
                  )}

                  {!sidebarCollapsed && mod.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-amber-400 text-gray-950"
                          : "bg-gray-800 text-gray-400 group-hover:text-amber-300"
                      }`}
                    >
                      {mod.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Branding */}
          <div className="p-3 border-t border-gray-800 text-center">
            {!sidebarCollapsed ? (
              <div className="text-[11px] text-gray-400">
                <span className="text-[#d4af37] font-bold">Farm Builder OS</span> v2.5 VIP
              </div>
            ) : (
              <div className="text-[10px] font-bold text-[#d4af37]">FB-VIP</div>
            )}
          </div>
        </aside>

        {/* MAIN DYNAMIC CONTENT AREA */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-[#1a1a2e] max-w-7xl mx-auto w-full relative">
          {renderModuleView()}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. FLOATING QUICK ENTRY ACTION BUTTON (Bottom Right) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-14 right-6 z-50">
        {quickMenuOpen && (
          <div className="mb-3 bg-gray-900 border border-[#d4af37]/50 rounded-2xl p-2 shadow-2xl space-y-1 animate-fadeIn w-48 text-xs font-bold">
            <button
              onClick={() => {
                setQuickActionModal("milk");
                setQuickMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-[#2d6a4f] flex items-center gap-2 transition"
            >
              <FaTint className="text-cyan-400" /> Quick Add Milk
            </button>
            <button
              onClick={() => {
                setQuickActionModal("expense");
                setQuickMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-[#2d6a4f] flex items-center gap-2 transition"
            >
              <FaMoneyBillWave className="text-amber-400" /> Quick Add Expense
            </button>
            <button
              onClick={() => {
                setQuickActionModal("task");
                setQuickMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-[#2d6a4f] flex items-center gap-2 transition"
            >
              <FaClipboardList className="text-purple-400" /> Quick Add Task
            </button>
          </div>
        )}

        <button
          onClick={() => setQuickMenuOpen(!quickMenuOpen)}
          className="w-13 h-13 rounded-full bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-950 p-4 text-xl font-bold shadow-glow-gold flex items-center justify-center hover:scale-110 transition duration-300 border-2 border-white/40"
          title="Quick Rapid Entry Mode"
        >
          {quickMenuOpen ? <FaTimes /> : <FaPlus />}
        </button>
      </div>

      {/* QUICK ENTRY MODALS */}
      {quickActionModal === "milk" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-cyan-500/40 shadow-2xl relative text-xs">
            <button onClick={() => setQuickActionModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <FaTimes />
            </button>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FaTint className="text-cyan-400" /> Rapid Milk Entry
            </h3>
            <form onSubmit={handleQuickMilkSubmit} className="space-y-3">
              <div>
                <label className="text-gray-300 block mb-1">Cow Name</label>
                <select
                  value={quickMilk.cowName}
                  onChange={(e) => setQuickMilk({ ...quickMilk, cowName: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  <option value="Gulabi">Gulabi (FB-C001)</option>
                  <option value="Kali">Kali (FB-C002)</option>
                  <option value="Chanda">Chanda (FB-C006)</option>
                  <option value="Ruby Red">Ruby Red (FB-C010)</option>
                  <option value="Sitara">Sitara (FB-C011)</option>
                </select>
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Total Milk Yield (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={quickMilk.quantity}
                  onChange={(e) => setQuickMilk({ ...quickMilk, quantity: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-cyan-300 font-bold text-base"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setQuickActionModal(null)} className="bg-gray-800 text-white px-3 py-1.5 rounded-lg">Cancel</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-1.5 rounded-lg">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {quickActionModal === "expense" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-amber-500/40 shadow-2xl relative text-xs">
            <button onClick={() => setQuickActionModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <FaTimes />
            </button>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FaMoneyBillWave className="text-amber-400" /> Rapid Expense Entry
            </h3>
            <form onSubmit={handleQuickExpenseSubmit} className="space-y-3">
              <div>
                <label className="text-gray-300 block mb-1">Expense Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Bags Urea Fertilizer"
                  value={quickExpense.title}
                  onChange={(e) => setQuickExpense({ ...quickExpense, title: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Amount (₨) *</label>
                <input
                  type="number"
                  placeholder="e.g. 14000"
                  value={quickExpense.amount}
                  onChange={(e) => setQuickExpense({ ...quickExpense, amount: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold text-base"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Category</label>
                <select
                  value={quickExpense.category}
                  onChange={(e) => setQuickExpense({ ...quickExpense, category: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  <option value="Animal Feed & Fodder">Animal Feed & Fodder</option>
                  <option value="Veterinary & Medicine">Veterinary & Medicine</option>
                  <option value="Labor / Wages">Labor / Wages</option>
                  <option value="Fuel & Energy">Fuel & Energy</option>
                  <option value="Fertilizers & Pesticides">Fertilizers & Pesticides</option>
                  <option value="Equipment Repair">Equipment Repair</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setQuickActionModal(null)} className="bg-gray-800 text-white px-3 py-1.5 rounded-lg">Cancel</button>
                <button type="submit" className="bg-[#d4af37] hover:bg-yellow-400 text-gray-950 font-bold px-4 py-1.5 rounded-lg">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {quickActionModal === "task" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-purple-500/40 shadow-2xl relative text-xs">
            <button onClick={() => setQuickActionModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <FaTimes />
            </button>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FaClipboardList className="text-purple-400" /> Rapid Task Dispatch
            </h3>
            <form onSubmit={handleQuickTaskSubmit} className="space-y-3">
              <div>
                <label className="text-gray-300 block mb-1">Task Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Spray Plot C Cotton"
                  value={quickTask.title}
                  onChange={(e) => setQuickTask({ ...quickTask, title: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Assign Worker</label>
                <select
                  value={quickTask.assignee}
                  onChange={(e) => setQuickTask({ ...quickTask, assignee: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Priority</label>
                <select
                  value={quickTask.priority}
                  onChange={(e) => setQuickTask({ ...quickTask, priority: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setQuickActionModal(null)} className="bg-gray-800 text-white px-3 py-1.5 rounded-lg">Cancel</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-1.5 rounded-lg">Dispatch Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PERSISTENT BOTTOM STATUS BAR */}
      {/* ========================================================================= */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-[#121224]/95 backdrop-blur-md border-t border-emerald-500/25 z-40 px-4 md:px-6 flex items-center justify-between text-xs text-gray-300 shadow-2xl">
        <div className="flex items-center gap-4 text-[11px] overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">Farm Builder Status:</span>
            <span className="text-white">Online & Synced</span>
          </div>

          <span className="text-gray-600 hidden sm:inline">•</span>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-gray-400">Total Animals:</span>
            <strong className="text-amber-400">{animals.length}</strong>
          </div>

          <span className="text-gray-600 hidden sm:inline">•</span>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-gray-400">Today's Milk:</span>
            <strong className="text-blue-400">420 Liters</strong>
          </div>

          <span className="text-gray-600 hidden md:inline">•</span>

          <div className="hidden md:flex items-center gap-1">
            <span className="text-gray-400">Active Workers:</span>
            <strong className="text-purple-300">{staff.length} / {staff.length}</strong>
          </div>

          <span className="text-gray-600 hidden lg:inline">•</span>

          <div className="hidden lg:flex items-center gap-1">
            <span className="text-gray-400">Weather:</span>
            <strong className="text-yellow-400">Sunny 32°C</strong>
          </div>
        </div>

        <div className="text-[11px] font-mono text-gray-400 flex items-center gap-2 shrink-0">
          <span className="text-[#d4af37] font-semibold">Farm Builder OS v2.5 VIP</span>
        </div>
      </footer>
    </div>
  );
};

export default FarmBuilderLayout;
