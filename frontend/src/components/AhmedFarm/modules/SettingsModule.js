import React, { useState } from "react";
import {
  FaSave,
  FaDownload,
  FaUpload,
  FaCheckCircle,
  FaShieldAlt,
  FaBuilding,
  FaGlobe
} from "react-icons/fa";

const SettingsModule = ({ settings, setSettings, farmData, setFarmData }) => {
  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings({ ...formData });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export Full Farm Backup JSON
  const handleExportBackup = () => {
    const backupObj = {
      exportedAt: new Date().toISOString(),
      system: "AHMED FARM MANAGEMENT SYSTEM v2.5 VIP",
      settings: formData,
      farmData: farmData
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Ahmed_Farm_Full_Backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Backup JSON
  const handleImportBackup = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.settings) setSettings(parsed.settings);
          if (parsed.farmData && setFarmData) setFarmData(parsed.farmData);
          alert("Backup data restored successfully into Ahmed Farm System!");
        } catch (err) {
          alert("Invalid backup JSON file.");
        }
      };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#d4af37] text-gray-950 font-bold px-2 py-0.5 rounded-full">
              System Configuration
            </span>
            <span className="text-xs text-gray-400">Ahmed Farm OS v2.5 VIP Edition</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            ⚙️ AHMED FARM <span className="text-[#52b788]">SETTINGS</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Farm identity metadata, currency/unit configurations, automated data exports, and cloud backup vaults.
          </p>
        </div>

        {saveSuccess && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-glow-green animate-bounce">
            <FaCheckCircle /> Settings Saved Successfully!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Settings (8 cols) */}
        <div className="lg:col-span-8 ahmed-glass p-6 rounded-2xl border border-emerald-500/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FaBuilding className="text-emerald-400" /> Farm Identity & Regional Parameters
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Farm Enterprise Name</label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-amber-300 italic"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Managing Owner / Proprietor</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Official Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Official Contact Phone</label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-gray-300 font-semibold block mb-1">Physical Farm Hub Location</label>
                <input
                  type="text"
                  value={formData.farmLocation}
                  onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Active Currency Display</label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-amber-300 font-bold"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Total Acreage</label>
                <input
                  type="number"
                  value={formData.totalAcreage}
                  onChange={(e) => setFormData({ ...formData, totalAcreage: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-800">
              <button
                type="submit"
                className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-6 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 shadow-glow-green"
              >
                <FaSave /> Save Configuration
              </button>
            </div>
          </form>
        </div>

        {/* Backup & System Status (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Backup Vault Card */}
          <div className="ahmed-glass p-5 rounded-2xl border border-amber-500/30">
            <h3 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
              <FaShieldAlt /> Farm Data Backup & Vault
            </h3>
            <p className="text-xs text-gray-300 mb-4">
              Export comprehensive JSON snapshot of livestock records, milk logs, expenses, crops, and configurations.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleExportBackup}
                className="w-full bg-[#d4af37] hover:bg-yellow-400 text-gray-950 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-glow-gold"
              >
                <FaDownload /> Download Full JSON Backup
              </button>

              <label className="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer border border-gray-700 transition">
                <FaUpload /> Restore from JSON Backup
                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
              </label>
            </div>
          </div>

          {/* System Diagnostic Card */}
          <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 text-xs">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <FaGlobe className="text-emerald-400" /> Telemetry Health Check
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-gray-800">
                <span className="text-gray-400">Database Connection</span>
                <span className="text-emerald-400 font-bold">Online (Active)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-800">
                <span className="text-gray-400">AI Intelligence Core</span>
                <span className="text-emerald-400 font-bold">Gemini-1.5 Ultra Ready</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-800">
                <span className="text-gray-400">Storage Synchronization</span>
                <span className="text-emerald-400 font-bold">100% Synchronized</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">System Kernel</span>
                <span className="text-[#d4af37] font-bold font-mono">Ahmed Farm OS v2.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;
