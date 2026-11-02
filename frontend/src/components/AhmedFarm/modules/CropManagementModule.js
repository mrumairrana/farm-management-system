import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const CropManagementModule = ({ crops, setCrops }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const initialFormState = {
    plotName: "",
    cropName: "",
    acreage: "",
    sowingDate: new Date().toISOString().split("T")[0],
    expectedHarvest: "",
    growthStage: "Germination & Seedling",
    progress: 25,
    healthStatus: "Healthy",
    soilMoisture: "55%",
    fertilizerApplied: "DAP + Urea",
    expectedYield: "40 Maunds/Acre",
    estimatedRevenue: 1500000,
    expenses: 500000
  };

  const [formData, setFormData] = useState(initialFormState);

  const totalAcreage = crops.reduce((acc, c) => acc + (parseFloat(c.acreage) || 0), 0);
  const totalEstimatedRevenue = crops.reduce((acc, c) => acc + (parseFloat(c.estimatedRevenue) || 0), 0);
  const totalExpenses = crops.reduce((acc, c) => acc + (parseFloat(c.expenses) || 0), 0);
  const totalProfit = totalEstimatedRevenue - totalExpenses;

  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    if (!formData.plotName || !formData.cropName || !formData.acreage) {
      alert("Please fill in Plot Name, Crop Name, and Acreage.");
      return;
    }

    const rev = parseFloat(formData.estimatedRevenue) || 0;
    const exp = parseFloat(formData.expenses) || 0;

    const newCrop = {
      id: `c_${Date.now()}`,
      ...formData,
      acreage: parseFloat(formData.acreage) || 0,
      progress: parseInt(formData.progress) || 20,
      estimatedRevenue: rev,
      expenses: exp,
      profit: rev - exp
    };

    setCrops([newCrop, ...crops]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
              Agronomy Operations
            </span>
            <span className="text-xs text-gray-400">Total Cultivated Area: {totalAcreage} Acres across 8 Plots</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            🌾 CROP <span className="text-emerald-400">MANAGEMENT</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Plot activity tracking, irrigation scheduling, precision fertilizer monitoring, and harvest yield analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Add New Crop Plot
          </button>
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Active Crop Plots</span>
          <div className="text-3xl font-extrabold text-[#d4af37] mt-2">{crops.length} Plots</div>
          <p className="text-[11px] text-emerald-400 mt-1">100% Monitored by Sensor Array</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-teal-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Field Acreage</span>
          <div className="text-3xl font-extrabold text-teal-300 mt-2">{totalAcreage} Acres</div>
          <p className="text-[11px] text-gray-400 mt-1">Wheat, Rice, Cotton, Maize, Lucerne</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-amber-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Projected Crop Value</span>
          <div className="text-3xl font-extrabold text-[#d4af37] mt-2">
            ₨{(totalEstimatedRevenue / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">Est. Gross Harvest Value</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-blue-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Forecast Net Profit</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">
            ₨{(totalProfit / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-emerald-300 mt-1">After input & operational costs</p>
        </div>
      </div>

      {/* PLOT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {crops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => setSelectedCrop(crop)}
            className="ahmed-glass ahmed-card-hover p-5 rounded-2xl border border-emerald-500/20 cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {crop.plotName}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  {crop.acreage} Acres
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{crop.cropName}</h3>
              <p className="text-xs text-gray-400 mb-3">Stage: <strong className="text-emerald-300">{crop.growthStage}</strong></p>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Growth Cycle</span>
                  <span className="text-[#d4af37] font-bold">{crop.progress}%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      crop.progress >= 90 ? "bg-emerald-500" : crop.progress >= 60 ? "bg-[#d4af37]" : "bg-teal-400"
                    }`}
                    style={{ width: `${crop.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300 bg-gray-900/50 p-2.5 rounded-xl border border-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-400">Soil Moisture:</span>
                  <span className="font-semibold text-blue-400">{crop.soilMoisture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Yield:</span>
                  <span className="font-semibold text-white">{crop.expectedYield}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Net Margin:</span>
                  <span className="font-bold text-emerald-400">₨{crop.profit?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs">
              <span className="text-gray-400 text-[10px]">Harvest: {crop.expectedHarvest}</span>
              <span className="text-emerald-400 font-semibold hover:underline">Details →</span>
            </div>
          </div>
        ))}
      </div>

      {/* CROP DETAILS MODAL */}
      {selectedCrop && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-xl w-full border border-emerald-500/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedCrop(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <div className="border-b border-gray-800 pb-3 mb-4">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                {selectedCrop.plotName}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">{selectedCrop.cropName}</h2>
              <p className="text-xs text-amber-300 font-semibold">{selectedCrop.acreage} Acres Cultivation</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Sowing Date</span>
                <span className="font-semibold text-white">{selectedCrop.sowingDate}</span>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Expected Harvest</span>
                <span className="font-semibold text-white">{selectedCrop.expectedHarvest}</span>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Fertilizer Applied</span>
                <span className="font-semibold text-emerald-300">{selectedCrop.fertilizerApplied}</span>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Expected Yield</span>
                <span className="font-bold text-amber-300">{selectedCrop.expectedYield}</span>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Estimated Revenue</span>
                <span className="font-bold text-emerald-400">₨{selectedCrop.estimatedRevenue?.toLocaleString()}</span>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Total Expenses</span>
                <span className="font-bold text-rose-400">₨{selectedCrop.expenses?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCrop(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2 rounded-lg"
              >
                Close Field Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW CROP MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="ahmed-glass p-6 rounded-2xl max-w-lg w-full border border-emerald-500/40 shadow-2xl relative my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-1 flex items-center gap-2">
              <span className="text-emerald-400"><FaPlus /></span> Add New Crop Field Record
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Enter plot acreage, sowing dates, and harvest projection values.
            </p>

            <form onSubmit={handleAddCropSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Plot Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot I - High Ridge"
                    value={formData.plotName}
                    onChange={(e) => setFormData({ ...formData, plotName: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Crop Name / Variety *</label>
                  <input
                    type="text"
                    placeholder="e.g. Canola (Super-10)"
                    value={formData.cropName}
                    onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Acreage *</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={formData.acreage}
                    onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Growth Stage</label>
                  <select
                    value={formData.growthStage}
                    onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Land Prep & Sowing">Land Prep & Sowing</option>
                    <option value="Germination & Seedling">Germination & Seedling</option>
                    <option value="Tillering & Vegetative">Tillering & Vegetative</option>
                    <option value="Flowering & Grain Formation">Flowering & Grain Formation</option>
                    <option value="Maturation & Harvesting">Maturation & Harvesting</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Sowing Date</label>
                  <input
                    type="date"
                    value={formData.sowingDate}
                    onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Expected Harvest</label>
                  <input
                    type="date"
                    value={formData.expectedHarvest}
                    onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Estimated Revenue (₨)</label>
                  <input
                    type="number"
                    value={formData.estimatedRevenue}
                    onChange={(e) => setFormData({ ...formData, estimatedRevenue: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-400 font-bold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Input Expenses (₨)</label>
                  <input
                    type="number"
                    value={formData.expenses}
                    onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-400 font-bold"
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-1.5 rounded-lg shadow-glow-green"
                >
                  Add Field Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropManagementModule;
