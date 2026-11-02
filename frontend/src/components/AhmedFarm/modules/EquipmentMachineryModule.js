import React, { useState } from "react";
import {
  FaTractor,
  FaPlus,
  FaWrench,
  FaTimes,
  FaGasPump,
  FaSearch
} from "react-icons/fa";
import { initialMachineryMaintenance, initialFuelLogs } from "../data/initialFarmData";

const EquipmentMachineryModule = ({ machinery, setMachinery }) => {
  const [activeTab, setActiveTab] = useState("fleet"); // fleet, maintenance, fuel
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [maintenanceLogs, setMaintenanceLogs] = useState(initialMachineryMaintenance);
  const [fuelLogs, setFuelLogs] = useState(initialFuelLogs);

  const [isMntModalOpen, setIsMntModalOpen] = useState(false);
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);

  // New Equipment Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "Tractor",
    model: "2024 Edition",
    serialNumber: "",
    purchasePrice: 2200000,
    purchaseDate: new Date().toISOString().split("T")[0],
    condition: "Good",
    status: "Operational",
    fuelType: "Diesel",
    dailyConsumption: "30 L/day",
    hoursRun: 150,
    operatorName: "Ghulam Rasool",
    nextServiceDue: "2026-10-15",
    notes: ""
  });

  // New Maintenance Form State
  const [mntForm, setMntForm] = useState({
    date: new Date().toISOString().split("T")[0],
    equipmentName: "Massey Ferguson 385",
    workDone: "",
    cost: 5000,
    doneBy: "Ustad Mechanix",
    nextDue: "2026-10-20"
  });

  // New Fuel Form State
  const [fuelForm, setFuelForm] = useState({
    date: new Date().toISOString().split("T")[0],
    equipment: "Massey Ferguson 385",
    litersUsed: 40,
    purpose: "Field B Plowing",
    cost: 11400
  });

  const handleAddEquipment = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const newEq = {
      id: `AHMED-EQ00${machinery.length + 1}`,
      ...formData,
      hoursRun: parseFloat(formData.hoursRun) || 0,
      purchasePrice: parseFloat(formData.purchasePrice) || 0
    };
    setMachinery([...machinery, newEq]);
    setIsAddModalOpen(false);
  };

  const handleAddMaintenance = (e) => {
    e.preventDefault();
    const newLog = {
      id: `mnt_${Date.now()}`,
      ...mntForm,
      cost: parseFloat(mntForm.cost) || 0
    };
    setMaintenanceLogs([newLog, ...maintenanceLogs]);
    setIsMntModalOpen(false);
  };

  const handleAddFuel = (e) => {
    e.preventDefault();
    const newLog = {
      id: `fl_${Date.now()}`,
      ...fuelForm,
      litersUsed: parseFloat(fuelForm.litersUsed) || 0,
      cost: parseFloat(fuelForm.cost) || 0
    };
    setFuelLogs([newLog, ...fuelLogs]);
    setIsFuelModalOpen(false);
  };

  const filteredMachinery = machinery.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.operatorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#d4af37] text-gray-950 font-bold px-2 py-0.5 rounded-full">
              Heavy Machinery & Fleet
            </span>
            <span className="text-xs text-gray-400">Total Machinery Assets: {machinery.length} Units</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            🚜 EQUIPMENT & <span className="text-[#52b788]">MACHINERY</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Heavy tractor fleet, tubewells, harvesters, scheduled overhaul logs, and diesel telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Register Equipment
          </button>
        </div>
      </div>

      {/* SUB-TABS */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab("fleet")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "fleet"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Machinery Fleet Directory ({machinery.length})
        </button>
        <button
          onClick={() => setActiveTab("maintenance")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "maintenance"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Service & Maintenance Log ({maintenanceLogs.length})
        </button>
        <button
          onClick={() => setActiveTab("fuel")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "fuel"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Fuel & Energy Consumption ({fuelLogs.length})
        </button>
      </div>

      {/* VIEW 1: MACHINERY CARDS / TABLE */}
      {activeTab === "fleet" && (
        <div className="space-y-4">
          <div className="ahmed-glass p-3 rounded-xl border border-emerald-500/20">
            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search by equipment name, type, or operator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 text-white pl-8 pr-3 py-1.5 rounded-lg text-xs border border-gray-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMachinery.map((eq) => (
              <div
                key={eq.id}
                className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 shadow-glass flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs text-[#d4af37] font-bold">
                      {eq.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        eq.condition === "Excellent"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : eq.condition === "Good"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      Condition: {eq.condition}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white mb-1">
                    {eq.name}
                  </h3>
                  <div className="text-xs text-gray-400 mb-3">{eq.type} • {eq.model}</div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-900/60 p-3 rounded-xl border border-gray-800 mb-3">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Hours Used</span>
                      <strong className="text-emerald-400">{eq.hoursRun} Hours</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Fuel / Power</span>
                      <strong className="text-white">{eq.dailyConsumption}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Operator</span>
                      <strong className="text-amber-300">{eq.operatorName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Next Service</span>
                      <strong className="text-gray-300">{eq.nextServiceDue}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-xs">
                  <span className="text-gray-400 text-[10px]">Value: ₨{eq.purchasePrice?.toLocaleString()}</span>
                  <button
                    onClick={() => {
                      setMntForm({ ...mntForm, equipmentName: eq.name });
                      setIsMntModalOpen(true);
                    }}
                    className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    <FaWrench className="text-[10px]" /> Log Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: MAINTENANCE LOG */}
      {activeTab === "maintenance" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMntModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FaPlus /> Add Maintenance Log
            </button>
          </div>

          <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
            <table className="w-full text-left text-xs text-gray-200">
              <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Equipment</th>
                  <th className="py-3 px-4">Work Performed</th>
                  <th className="py-3 px-4">Serviced By</th>
                  <th className="py-3 px-4">Cost (₨)</th>
                  <th className="py-3 px-4">Next Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {maintenanceLogs.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 text-gray-300 font-semibold">{m.date}</td>
                    <td className="py-3 px-4 font-bold text-white">{m.equipmentName}</td>
                    <td className="py-3 px-4 text-gray-300">{m.workDone}</td>
                    <td className="py-3 px-4 text-gray-400">{m.doneBy}</td>
                    <td className="py-3 px-4 font-bold text-amber-300">₨{m.cost?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-emerald-400">{m.nextDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: FUEL CONSUMPTION */}
      {activeTab === "fuel" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsFuelModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FaPlus /> Add Fuel Log
            </button>
          </div>

          <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
            <table className="w-full text-left text-xs text-gray-200">
              <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Equipment</th>
                  <th className="py-3 px-4">Liters Consumed</th>
                  <th className="py-3 px-4">Operational Purpose</th>
                  <th className="py-3 px-4">Fuel Cost (₨)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {fuelLogs.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 text-gray-300 font-semibold">{f.date}</td>
                    <td className="py-3 px-4 font-bold text-white">{f.equipment}</td>
                    <td className="py-3 px-4 font-bold text-teal-300">{f.litersUsed} Liters</td>
                    <td className="py-3 px-4 text-gray-300">{f.purpose}</td>
                    <td className="py-3 px-4 font-bold text-amber-300">₨{f.cost?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD EQUIPMENT MODAL */}
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
              <FaTractor className="text-[#52b788]" /> Register Farm Machinery
            </h3>

            <form onSubmit={handleAddEquipment} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Equipment Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Massey Ferguson 385"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Category / Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Tractor">Tractor</option>
                    <option value="Water Pump">Water Pump</option>
                    <option value="Generator">Generator</option>
                    <option value="Thresher">Thresher</option>
                    <option value="Harvester">Harvester</option>
                    <option value="Drone Sprayer">Drone Sprayer</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Needs Repair">Needs Repair</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Hours Used</label>
                  <input
                    type="number"
                    value={formData.hoursRun}
                    onChange={(e) => setFormData({ ...formData, hoursRun: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Operator Name</label>
                  <input
                    type="text"
                    value={formData.operatorName}
                    onChange={(e) => setFormData({ ...formData, operatorName: e.target.value })}
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
                  Register Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MAINTENANCE MODAL */}
      {isMntModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-amber-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsMntModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
              <FaWrench className="text-amber-400" /> Log Maintenance & Repair
            </h3>

            <form onSubmit={handleAddMaintenance} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Equipment</label>
                <select
                  value={mntForm.equipmentName}
                  onChange={(e) => setMntForm({ ...mntForm, equipmentName: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  {machinery.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Work Done *</label>
                <input
                  type="text"
                  placeholder="e.g. Engine oil change & hydraulic overhaul"
                  value={mntForm.workDone}
                  onChange={(e) => setMntForm({ ...mntForm, workDone: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Serviced By</label>
                  <input
                    type="text"
                    value={mntForm.doneBy}
                    onChange={(e) => setMntForm({ ...mntForm, doneBy: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Cost (₨)</label>
                  <input
                    type="number"
                    value={mntForm.cost}
                    onChange={(e) => setMntForm({ ...mntForm, cost: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Next Service Due Date</label>
                <input
                  type="date"
                  value={mntForm.nextDue}
                  onChange={(e) => setMntForm({ ...mntForm, nextDue: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMntModalOpen(false)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-1.5 rounded-lg"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD FUEL LOG MODAL */}
      {isFuelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-teal-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsFuelModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
              <FaGasPump className="text-teal-400" /> Log Fuel Consumption
            </h3>

            <form onSubmit={handleAddFuel} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Equipment</label>
                <select
                  value={fuelForm.equipment}
                  onChange={(e) => setFuelForm({ ...fuelForm, equipment: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  {machinery.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Liters Used</label>
                  <input
                    type="number"
                    value={fuelForm.litersUsed}
                    onChange={(e) => {
                      const l = parseFloat(e.target.value) || 0;
                      setFuelForm({ ...fuelForm, litersUsed: l, cost: Math.round(l * 285) });
                    }}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-teal-300 font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Cost (₨ @ 285/L)</label>
                  <input
                    type="number"
                    value={fuelForm.cost}
                    onChange={(e) => setFuelForm({ ...fuelForm, cost: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Operational Purpose</label>
                <input
                  type="text"
                  placeholder="e.g. Field B Plowing / Harvester Diesel"
                  value={fuelForm.purpose}
                  onChange={(e) => setFuelForm({ ...fuelForm, purpose: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFuelModalOpen(false)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-1.5 rounded-lg"
                >
                  Save Fuel Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentMachineryModule;
