import React, { useState, useEffect } from "react";
import {
  FaPaw,
  FaTint,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaUsers,
  FaSeedling,
  FaSun,
  FaCheckCircle,
  FaChartLine,
  FaLightbulb,
  FaSyncAlt,
  FaClipboardList,
  FaWarehouse,
  FaStethoscope,
  FaArrowUp
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const DashboardModule = ({ farmData, onNavigateModule }) => {
  const [tipIndex, setTipIndex] = useState(0);

  const tips = farmData?.tips || [
    "Maintain regular mineral salt licks in dairy cattle paddocks to optimize milk yield by up to 15%.",
    "Implement drip irrigation during early dawn to minimize evaporation and save up to 40% water.",
    "Quarantine all newly arrived livestock for at least 14 days before introducing them to the main herd.",
    "Test soil nitrogen and pH balance every crop rotation cycle to ensure maximum fertilizer efficiency.",
    "Check tractor engine oil, hydraulic fluid, and air filter before starting daily harvesting operations."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [tips.length]);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  // Pie chart data: Animal category distribution
  const animalPieData = [
    { name: "Dairy Cattle", value: 45, color: "#52b788" },
    { name: "Beef Cattle", value: 30, color: "#2d6a4f" },
    { name: "Sheep", value: 25, color: "#d4af37" },
    { name: "Goats", value: 20, color: "#40916c" },
    { name: "Poultry", value: 200, color: "#f3c64c" },
    { name: "Rabbits", value: 15, color: "#95d5b2" },
    { name: "Pigs", value: 10, color: "#b7e4c7" }
  ];

  // Revenue vs Expense monthly data (Bar chart)
  const financialBarData = [
    { month: "Mar", Revenue: 145000, Expenses: 92000 },
    { month: "Apr", Revenue: 160000, Expenses: 88000 },
    { month: "May", Revenue: 172000, Expenses: 105000 },
    { month: "Jun", Revenue: 168000, Expenses: 98000 },
    { month: "Jul", Revenue: 180000, Expenses: 110000 },
    { month: "Aug", Revenue: 185000, Expenses: 34500 }
  ];

  // 7-day milk line chart
  const milkLineData = farmData?.milkChartData || [
    { day: "Thu (Aug 21)", yield: 395, target: 400 },
    { day: "Fri (Aug 22)", yield: 410, target: 400 },
    { day: "Sat (Aug 23)", yield: 418, target: 410 },
    { day: "Sun (Aug 24)", yield: 405, target: 410 },
    { day: "Mon (Aug 25)", yield: 425, target: 415 },
    { day: "Tue (Aug 26)", yield: 415, target: 415 },
    { day: "Today (Aug 27)", yield: 420, target: 420 }
  ];

  // Crops progress
  const cropsProgress = farmData?.crops || [];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner / Welcome Bar */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 shadow-glass relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow">
              VIP Executive Suite
            </span>
            <span className="text-xs text-emerald-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" /> Live Farm Telemetry
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            🌾 Farm Builder <span className="text-[#d4af37]">COMMAND CENTER</span>
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            "Farm Builder — Managing Your Farm, Maximizing Your Future" • <span className="text-emerald-400">All 14 Operational Subsystems Active</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigateModule("livestock")}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-medium text-xs px-4 py-2 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30"
          >
            🐄 Manage Livestock
          </button>
          <button
            onClick={() => onNavigateModule("milk")}
            className="bg-[#d4af37] hover:bg-yellow-400 text-gray-950 font-semibold text-xs px-4 py-2 rounded-xl transition duration-300 flex items-center gap-2 shadow-glow-gold"
          >
            🥛 Record Milking
          </button>
          <button
            onClick={() => onNavigateModule("reports")}
            className="bg-gray-800/80 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-xl transition duration-300 border border-gray-600 flex items-center gap-2"
          >
            📈 Export PDF Report
          </button>
        </div>
      </div>

      {/* Ahmed Daily Wisdom Tip Banner */}
      <div className="ahmed-glass-gold p-4 rounded-xl border border-amber-500/30 shadow-glass-gold flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl shrink-0">
            <FaLightbulb />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>Farm Builder's Farm Wisdom Today:</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.2 rounded-full">Daily Best Practice</span>
            </div>
            <p className="text-sm text-gray-100 italic mt-0.5">"{tips[tipIndex]}"</p>
          </div>
        </div>
        <button
          onClick={handleNextTip}
          title="Next Tip"
          className="text-amber-400 hover:text-amber-200 hover:scale-110 transition p-2 text-sm shrink-0"
        >
          <FaSyncAlt />
        </button>
      </div>

      {/* 6 MAIN KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Total Animals */}
        <div
          onClick={() => onNavigateModule("livestock")}
          className="ahmed-glass ahmed-card-hover p-5 rounded-2xl cursor-pointer border border-emerald-500/20 relative group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Animals</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaPaw />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#d4af37] tracking-tight">156</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <FaArrowUp className="text-[10px]" /> Cattle + Poultry + Livestock
            </div>
          </div>
        </div>

        {/* KPI 2: Today's Milk */}
        <div
          onClick={() => onNavigateModule("milk")}
          className="ahmed-glass ahmed-card-hover p-5 rounded-2xl cursor-pointer border border-blue-500/20 relative group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Today's Milk</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaTint />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#d4af37] tracking-tight">420 <span className="text-base text-gray-300 font-normal">L</span></div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <FaArrowUp className="text-[10px]" /> 100% Target reached
            </div>
          </div>
        </div>

        {/* KPI 3: Monthly Revenue */}
        <div
          onClick={() => onNavigateModule("expenses")}
          className="ahmed-glass ahmed-card-hover p-5 rounded-2xl cursor-pointer border border-amber-500/20 relative group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaMoneyBillWave />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-[#d4af37] tracking-tight">₨185,000</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <FaArrowUp className="text-[10px]" /> +12.4% vs last month
            </div>
          </div>
        </div>

        {/* KPI 4: Pending Expenses */}
        <div
          onClick={() => onNavigateModule("expenses")}
          className="ahmed-glass ahmed-card-hover p-5 rounded-2xl cursor-pointer border border-rose-500/20 relative group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Pending Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaFileInvoiceDollar />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-[#d4af37] tracking-tight">₨34,500</div>
            <div className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-medium">
              Due within 7 days
            </div>
          </div>
        </div>

        {/* KPI 5: Active Workers */}
        <div
          onClick={() => onNavigateModule("staff")}
          className="ahmed-glass ahmed-card-hover p-5 rounded-2xl cursor-pointer border border-purple-500/20 relative group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Active Workers</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaUsers />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#d4af37] tracking-tight">12</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <FaCheckCircle className="text-[10px]" /> 100% Present Today
            </div>
          </div>
        </div>

        {/* KPI 6: Crops in Field */}
        <div
          onClick={() => onNavigateModule("crops")}
          className="ahmed-glass ahmed-card-hover p-5 rounded-2xl cursor-pointer border border-teal-500/20 relative group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Crops in Field</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaSeedling />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#d4af37] tracking-tight">8</div>
            <div className="text-[11px] text-teal-300 flex items-center gap-1 mt-1 font-medium">
              125 Total Cultivated Acres
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS & GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Milk Production 7-Day Trend (7 cols) */}
        <div className="lg:col-span-7 ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#52b788]"><FaChartLine /></span> Milk Production Trend (7 Days)
              </h2>
              <p className="text-xs text-gray-400">Daily yield in Liters vs Daily target</p>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-1 rounded-full">
              Avg: 412 L/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={milkLineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a44" />
                <XAxis dataKey="day" stroke="#a0aec0" fontSize={11} />
                <YAxis stroke="#a0aec0" fontSize={11} domain={[350, 450]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#131324", borderColor: "#52b788", borderRadius: "8px", color: "#fff" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Line type="monotone" dataKey="yield" name="Actual Milk (L)" stroke="#52b788" strokeWidth={3} dot={{ fill: "#d4af37", r: 5 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="target" name="Daily Target (L)" stroke="#d4af37" strokeDasharray="5 5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Animal Category Distribution (5 cols) */}
        <div className="lg:col-span-5 ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Animal Category Breakdown</h2>
              <p className="text-xs text-gray-400">Total 156 head inventory by species</p>
            </div>
            <button
              onClick={() => onNavigateModule("livestock")}
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              View Table →
            </button>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={animalPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {animalPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#1a1a2e" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#131324", borderColor: "#d4af37", borderRadius: "8px", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Monthly Revenue vs Expenses Bar Chart (7 cols) */}
        <div className="lg:col-span-7 ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Monthly Revenue vs Expenses</h2>
              <p className="text-xs text-gray-400">Past 6 months cashflow (₨ PKR)</p>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-semibold px-2.5 py-1 rounded-full">
              Net Profit: +₨150,500 (Aug)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a44" />
                <XAxis dataKey="month" stroke="#a0aec0" fontSize={11} />
                <YAxis stroke="#a0aec0" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#131324", borderColor: "#52b788", borderRadius: "8px", color: "#fff" }}
                  formatter={(value) => `₨${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Bar dataKey="Revenue" name="Revenue (₨)" fill="#52b788" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" name="Expenses (₨)" fill="#f44336" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Crop Growth Progress (5 cols) */}
        <div className="lg:col-span-5 ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-bold text-white">Crop Growth Progress</h2>
              <p className="text-xs text-gray-400">8 active farm plots lifecycle</p>
            </div>
            <button
              onClick={() => onNavigateModule("crops")}
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              All Plots →
            </button>
          </div>

          <div className="space-y-3 mt-2">
            {cropsProgress.slice(0, 5).map((crop) => (
              <div key={crop.id} className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{crop.plotName.split("-")[0]} • {crop.cropName.split("(")[0]}</span>
                  <span className="text-amber-400 font-bold">{crop.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      crop.progress >= 90 ? "bg-emerald-500" : crop.progress >= 60 ? "bg-[#d4af37]" : "bg-teal-400"
                    }`}
                    style={{ width: `${crop.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Stage: {crop.growthStage}</span>
                  <span className="text-emerald-400">{crop.healthStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 QUICK SUMMARY PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Panel 1: Today's Tasks */}
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-purple-400"><FaClipboardList /></span> Today's Tasks
              </h3>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-medium">
                3 Pending • 5 Done
              </span>
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400"><FaCheckCircle /></span>
                  <span className="text-gray-300 line-through">Morning Milking & Fat Check</span>
                </div>
                <span className="text-[10px] text-gray-500">06:00 AM</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-gray-900/50 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 animate-pulse">●</span>
                  <span className="text-white font-medium">Check Sick Cow AHMED-C003</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">Urgent</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">○</span>
                  <span className="text-gray-300">Plot B Basmati Rice Fertigation</span>
                </div>
                <span className="text-[10px] text-gray-400">04:00 PM</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigateModule("tasks")}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 text-left font-medium"
          >
            Manage Task Board →
          </button>
        </div>

        {/* Panel 2: Recent Milk Records */}
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-blue-400"><FaTint /></span> Recent Milk Records
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">Morning Session</span>
            </div>
            <div className="space-y-2 text-xs">
              {(farmData?.milkRecords || []).slice(0, 3).map((rec) => (
                <div key={rec.id} className="flex justify-between items-center p-2 rounded-lg bg-gray-900/50 border border-gray-800">
                  <div>
                    <span className="font-semibold text-white">{rec.animalName}</span>
                    <span className="text-[10px] text-gray-400 ml-1.5">({rec.animalId})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-bold">{rec.quantity} L</span>
                    <span className="text-[10px] text-gray-400 ml-1.5">Fat: {rec.fatPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onNavigateModule("milk")}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 text-left font-medium"
          >
            View Milking Logs →
          </button>
        </div>

        {/* Panel 3: Upcoming Expenses */}
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-rose-400"><FaFileInvoiceDollar /></span> Upcoming Expenses (Next 7 Days)
              </h3>
              <span className="text-xs text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full font-medium">
                ₨34,500 Due
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Al-Shifa Agro Vet (Med Batch)</p>
                  <p className="text-[10px] text-gray-400">Due: Aug 30, 2026</p>
                </div>
                <span className="text-rose-400 font-bold text-sm">₨34,500</span>
              </div>
              <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-800 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Diesel Fuel 800L Re-order</p>
                  <p className="text-[10px] text-gray-400">Estimated: Sep 02</p>
                </div>
                <span className="text-amber-400 font-bold text-sm">₨228,000</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateModule("expenses")}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 text-left font-medium"
          >
            Financial Ledger →
          </button>
        </div>

        {/* Panel 4: Low Stock Alerts */}
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-amber-400"><FaWarehouse /></span> Low Stock Alerts
              </h3>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">
                3 Critical Items
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">DAP Fertilizer (50kg)</p>
                  <p className="text-[10px] text-amber-300">Min Threshold: 25 Bags</p>
                </div>
                <span className="text-amber-400 font-extrabold text-sm">18 Bags Left</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">Diesel Fuel Reserve</p>
                  <p className="text-[10px] text-amber-300">Min Threshold: 800 L</p>
                </div>
                <span className="text-amber-400 font-extrabold text-sm">650 L Left</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">Aftovax FMD Vaccine</p>
                  <p className="text-[10px] text-amber-300">Min Threshold: 10 Vials</p>
                </div>
                <span className="text-amber-400 font-extrabold text-sm">6 Vials Left</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateModule("inventory")}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 text-left font-medium"
          >
            Order Restock →
          </button>
        </div>

        {/* Panel 5: Recent Medical Alerts */}
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-red-400"><FaStethoscope /></span> Medical Health Alerts
              </h3>
              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-semibold">
                2 Animals
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Bella White (AHMED-C003)</span>
                  <span className="text-[10px] bg-red-600 text-white px-1.5 rounded">Quarantined</span>
                </div>
                <p className="text-[11px] text-gray-300 mt-1">Diagnosis: Early Respiratory Infection • Temp: 39.2°C</p>
                <p className="text-[10px] text-emerald-400">Vet: Dr. Tariq Mahmood • Course: Antibiotics Day 2/3</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Beetal Beauty (AHMED-G001)</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 rounded">Vaccinated</span>
                </div>
                <p className="text-[11px] text-gray-300 mt-1">PPR Booster completed successfully</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateModule("medical")}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 text-left font-medium"
          >
            Veterinary Log →
          </button>
        </div>

        {/* Panel 6: Weather Today */}
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <span className="text-yellow-400"><FaSun /></span> Weather Today
              </h3>
              <span className="text-xs text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                Mianwali Agro Hub
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-900/60 border border-gray-800 mb-2">
              <div>
                <span className="text-4xl font-extrabold text-[#d4af37]">32°C</span>
                <p className="text-xs text-gray-300 font-medium">Sunny & Clear Sky</p>
              </div>
              <div className="text-right text-xs text-gray-400 space-y-0.5">
                <p>Humidity: <span className="text-white">48%</span></p>
                <p>Wind: <span className="text-white">14 km/h NE</span></p>
                <p>Soil Moisture: <span className="text-emerald-400">56%</span></p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-300 italic bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
              💡 Agro Advisory: Ideal window for drone spray before 09:30 AM. Rain expected Saturday.
            </p>
          </div>
          <button
            onClick={() => onNavigateModule("weather")}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 text-left font-medium"
          >
            5-Day Agro Forecast →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;
