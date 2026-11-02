import React, { useState, useMemo } from "react";
import {
  FaTint,
  FaPlus,
  FaTimes,
  FaSearch,
  FaTrash,
  FaAward
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { initialMilkBuyers, initialMilkChartData } from "../data/initialFarmData";

const MilkProductionModule = ({ milkRecords, setMilkRecords, animals }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("records"); // records, analytics, buyers

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Daily Milk Entry Form State
  const initialFormState = {
    date: new Date().toISOString().split("T")[0],
    animalId: "AHMED-C001",
    morning: 6.5,
    evening: 6.0,
    qualityGrade: "A",
    fatPercent: 4.2,
    snf: 8.9,
    soldStatus: "Sold (Bulk Supply)",
    pricePerLiter: 185,
    storageTank: "Tank A (Cold 4°C)",
    loggedBy: "Rashid Ali",
    notes: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  // Auto calculate total and revenue
  const totalLiters = (parseFloat(formData.morning) || 0) + (parseFloat(formData.evening) || 0);
  const totalRevenue = Math.round(totalLiters * (parseFloat(formData.pricePerLiter) || 0));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const animal = animals.find((a) => a.animalId === formData.animalId);
    const m = parseFloat(formData.morning) || 0;
    const ev = parseFloat(formData.evening) || 0;
    const total = parseFloat((m + ev).toFixed(1));
    const rev = Math.round(total * (parseFloat(formData.pricePerLiter) || 185));

    const newRecord = {
      id: `m_${Date.now()}`,
      date: formData.date,
      session: "Full Day",
      animalId: formData.animalId,
      animalName: animal ? animal.name : formData.animalId,
      morning: m,
      evening: ev,
      quantity: total,
      fatPercent: parseFloat(formData.fatPercent) || 4.0,
      snf: parseFloat(formData.snf) || 8.8,
      qualityGrade: formData.qualityGrade,
      soldStatus: formData.soldStatus,
      pricePerLiter: parseFloat(formData.pricePerLiter) || 185,
      revenue: rev,
      storageTank: formData.storageTank,
      loggedBy: formData.loggedBy,
      notes: formData.notes
    };

    setMilkRecords([newRecord, ...milkRecords]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this milk record? — Ahmed Farm System")) {
      setMilkRecords(milkRecords.filter((r) => r.id !== id));
    }
  };

  // Filtered & Paginated records
  const filteredRecords = useMemo(() => {
    return milkRecords.filter((r) => {
      const matchesSearch =
        r.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.date.includes(searchTerm);

      const matchesQuality =
        selectedQuality === "all" || r.qualityGrade === selectedQuality;

      return matchesSearch && matchesQuality;
    });
  }, [milkRecords, searchTerm, selectedQuality]);

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Animal-wise comparison for chart
  const animalYieldComparison = [
    { name: "Gulabi", yield: 12.5, fat: 4.2 },
    { name: "Kali", yield: 13.5, fat: 3.9 },
    { name: "Chanda", yield: 10.5, fat: 4.5 },
    { name: "Ruby Red", yield: 11.5, fat: 4.8 },
    { name: "Sitara", yield: 14.5, fat: 4.1 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#52b788] text-gray-950 font-bold px-2 py-0.5 rounded-full">
              Dairy Parlor Telemetry
            </span>
            <span className="text-xs text-gray-400">Cold Storage Tank Alpha Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            🥛 MILK PRODUCTION <span className="text-[#d4af37]">RECORDS</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Morning and evening milking sessions, fat % testing, bulk buyer logs, and 30-day analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Daily Milk Entry
          </button>
        </div>
      </div>

      {/* 6 TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="ahmed-glass p-4 rounded-2xl border border-cyan-500/20">
          <span className="text-[10px] font-semibold text-gray-400 uppercase">Today Total Milk</span>
          <div className="text-2xl font-extrabold text-cyan-300 mt-1">420 L</div>
          <span className="text-[10px] text-emerald-400">Target 420 L Met</span>
        </div>

        <div className="ahmed-glass p-4 rounded-2xl border border-blue-500/20">
          <span className="text-[10px] font-semibold text-gray-400 uppercase">This Week</span>
          <div className="text-2xl font-extrabold text-blue-300 mt-1">2,940 L</div>
          <span className="text-[10px] text-gray-400">Avg 420 L/day</span>
        </div>

        <div className="ahmed-glass p-4 rounded-2xl border border-emerald-500/20">
          <span className="text-[10px] font-semibold text-gray-400 uppercase">This Month</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">12,600 L</div>
          <span className="text-[10px] text-emerald-300">+4.5% vs Prev</span>
        </div>

        <div className="ahmed-glass p-4 rounded-2xl border border-amber-500/20">
          <span className="text-[10px] font-semibold text-gray-400 uppercase">Avg / Cow / Day</span>
          <div className="text-2xl font-extrabold text-[#d4af37] mt-1">9.3 L</div>
          <span className="text-[10px] text-gray-400">45 Lactating Cows</span>
        </div>

        <div className="ahmed-glass p-4 rounded-2xl border border-yellow-500/20">
          <span className="text-[10px] font-semibold text-gray-400 uppercase">Monthly Milk Revenue</span>
          <div className="text-2xl font-extrabold text-yellow-300 mt-1">₨185,000</div>
          <span className="text-[10px] text-emerald-400">@ ₨185 / Liter</span>
        </div>

        <div className="ahmed-glass p-4 rounded-2xl border border-purple-500/20">
          <span className="text-[10px] font-semibold text-gray-400 uppercase flex items-center gap-1">
            <FaAward className="text-purple-400" /> Best Producer
          </span>
          <div className="text-lg font-extrabold text-purple-300 mt-1 truncate">Gulabi</div>
          <span className="text-[10px] text-amber-300">12.5 L/day avg</span>
        </div>
      </div>

      {/* SUB-TABS: RECORDS / ANALYTICS / BUYERS */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab("records")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "records"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Daily Milk Ledger ({milkRecords.length} Entries)
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "analytics"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Milk Production Analytics & Charts
        </button>
        <button
          onClick={() => setActiveTab("buyers")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "buyers"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Bulk Milk Buyers Log
        </button>
      </div>

      {/* VIEW 1: RECORDS TABLE */}
      {activeTab === "records" && (
        <div className="space-y-4">
          {/* Search & Quality Filter */}
          <div className="ahmed-glass p-3 rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search by Animal, Tag ID, or Date..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-900 text-white pl-8 pr-3 py-1.5 rounded-lg text-xs border border-gray-700 focus:outline-none"
              />
            </div>

            <select
              value={selectedQuality}
              onChange={(e) => {
                setSelectedQuality(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs border border-gray-700"
            >
              <option value="all">All Quality Grades</option>
              <option value="A">Grade A (Premium)</option>
              <option value="B">Grade B (Standard)</option>
              <option value="C">Grade C</option>
            </select>
          </div>

          <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-200">
                <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Animal</th>
                    <th className="py-3 px-4">Morning (L)</th>
                    <th className="py-3 px-4">Evening (L)</th>
                    <th className="py-3 px-4">Total Yield</th>
                    <th className="py-3 px-4">Quality</th>
                    <th className="py-3 px-4">Fat %</th>
                    <th className="py-3 px-4">Revenue (₨)</th>
                    <th className="py-3 px-4">Staff</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {paginatedRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-800/40 transition">
                      <td className="py-3 px-4 text-gray-300 font-semibold">{r.date}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{r.animalName}</div>
                        <span className="font-mono text-[10px] text-amber-300">{r.animalId}</span>
                      </td>
                      <td className="py-3 px-4 text-cyan-300">{r.morning || (r.quantity / 2).toFixed(1)} L</td>
                      <td className="py-3 px-4 text-blue-300">{r.evening || (r.quantity / 2).toFixed(1)} L</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">{r.quantity} L</td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Grade {r.qualityGrade || "A"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-amber-300">{r.fatPercent}%</td>
                      <td className="py-3 px-4 font-bold text-[#d4af37]">
                        ₨{(r.revenue || Math.round(r.quantity * 185)).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{r.loggedBy}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1.5 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-lg transition"
                          title="Delete Record"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 bg-[#131324] border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
              <div>
                Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
                {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of{" "}
                {filteredRecords.length} milk records
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span>Per page:</span>
                  <select
                    value={recordsPerPage}
                    onChange={(e) => {
                      setRecordsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 bg-gray-800 rounded text-white disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="font-bold text-[#d4af37] px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 bg-gray-800 rounded text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ANALYTICS & CHARTS */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: 30-Day Production Trend */}
          <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 shadow-glass">
            <h3 className="text-sm font-bold text-white mb-3">
              30-Day Production Trend (Liters)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={initialMilkChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="day" stroke="#a0aec0" fontSize={10} />
                  <YAxis stroke="#a0aec0" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", borderColor: "#2d6a4f" }} />
                  <Line type="monotone" dataKey="yield" stroke="#52b788" strokeWidth={3} name="Daily Yield (L)" />
                  <Line type="monotone" dataKey="target" stroke="#d4af37" strokeDasharray="5 5" name="Target (420L)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Animal Comparison */}
          <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 shadow-glass">
            <h3 className="text-sm font-bold text-white mb-3">
              Animal-Wise Production Comparison (Liters/Day)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={animalYieldComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="name" stroke="#a0aec0" fontSize={11} />
                  <YAxis stroke="#a0aec0" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", borderColor: "#2d6a4f" }} />
                  <Bar dataKey="yield" fill="#2d6a4f" name="Yield (Liters)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Morning vs Evening Split */}
          <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 shadow-glass">
            <h3 className="text-sm font-bold text-white mb-3">
              Morning vs Evening Milking Split
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={initialMilkChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="day" stroke="#a0aec0" fontSize={10} />
                  <YAxis stroke="#a0aec0" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", borderColor: "#2d6a4f" }} />
                  <Legend />
                  <Bar dataKey="morning" stackId="a" fill="#00b4d8" name="Morning (L)" />
                  <Bar dataKey="evening" stackId="a" fill="#2d6a4f" name="Evening (L)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Revenue Trend Area Chart */}
          <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 shadow-glass">
            <h3 className="text-sm font-bold text-white mb-3">
              Milk Revenue Trend (₨ PKR)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={initialMilkChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="day" stroke="#a0aec0" fontSize={10} />
                  <YAxis stroke="#a0aec0" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", borderColor: "#2d6a4f" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#d4af37" fill="#d4af37" fillOpacity={0.3} name="Revenue (₨)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: BUYERS LOG */}
      {activeTab === "buyers" && (
        <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Buyer Company / Name</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Supply Agreement</th>
                <th className="py-3 px-4">Outstanding Balance</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {initialMilkBuyers.map((b) => (
                <tr key={b.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white">{b.name}</td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">{b.contact}</td>
                  <td className="py-3 px-4 text-gray-300">{b.supplyAgreement}</td>
                  <td className="py-3 px-4 font-bold text-amber-300">
                    ₨{b.outstandingAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DAILY MILK ENTRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-emerald-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
              <FaTint className="text-[#52b788]" /> Log Daily Milking Entry
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Select Dairy Cow *</label>
                  <select
                    value={formData.animalId}
                    onChange={(e) => setFormData({ ...formData, animalId: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {animals.filter(a => a.category.includes("Dairy") || a.category.includes("Goat")).map((a) => (
                      <option key={a.animalId} value={a.animalId}>
                        {a.name} ({a.animalId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Morning Session (L)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.morning}
                    onChange={(e) => setFormData({ ...formData, morning: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Evening Session (L)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.evening}
                    onChange={(e) => setFormData({ ...formData, evening: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              {/* Auto Calculated Preview */}
              <div className="bg-gray-900/90 p-2.5 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                <div>Total Yield: <strong className="text-emerald-400 font-bold">{totalLiters.toFixed(1)} Liters</strong></div>
                <div>Revenue: <strong className="text-[#d4af37] font-bold">₨{totalRevenue.toLocaleString()}</strong></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-gray-300 block mb-1">Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.fatPercent}
                    onChange={(e) => setFormData({ ...formData, fatPercent: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Grade</label>
                  <select
                    value={formData.qualityGrade}
                    onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="A">Grade A</option>
                    <option value="B">Grade B</option>
                    <option value="C">Grade C</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Price / L (₨)</label>
                  <input
                    type="number"
                    value={formData.pricePerLiter}
                    onChange={(e) => setFormData({ ...formData, pricePerLiter: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Storage Tank</label>
                  <select
                    value={formData.storageTank}
                    onChange={(e) => setFormData({ ...formData, storageTank: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Tank A (Cold 4°C)">Tank A (Cold 4°C)</option>
                    <option value="Tank B (Standard)">Tank B (Standard)</option>
                    <option value="Goat Milk Unit 1">Goat Milk Unit 1</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Recorded By</label>
                  <input
                    type="text"
                    value={formData.loggedBy}
                    onChange={(e) => setFormData({ ...formData, loggedBy: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-5 py-1.5 rounded-lg shadow-glow-green"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilkProductionModule;
