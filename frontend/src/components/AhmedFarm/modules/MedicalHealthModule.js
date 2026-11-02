import React, { useState } from "react";
import {
  FaStethoscope,
  FaPlus,
  FaTimes,
  FaHeartbeat
} from "react-icons/fa";

const MedicalHealthModule = ({ medicalRecords, setMedicalRecords, animals }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    animalId: "AHMED-C001",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    vetName: "Dr. Tariq Mahmood",
    followUpDate: "2026-09-15",
    quarantineStatus: "None",
    cost: 1500
  });

  const handleAddMedicalSubmit = (e) => {
    e.preventDefault();
    if (!formData.diagnosis || !formData.treatment) {
      alert("Please fill in Diagnosis and Treatment.");
      return;
    }

    const animal = animals.find((a) => a.animalId === formData.animalId);
    const newRecord = {
      id: `med_${Date.now()}`,
      ...formData,
      animalName: animal ? animal.name : formData.animalId,
      category: animal ? animal.category : "Livestock",
      cost: parseFloat(formData.cost) || 0
    };

    setMedicalRecords([newRecord, ...medicalRecords]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full">
              Veterinary Clinic & Health Surveillance
            </span>
            <span className="text-xs text-gray-400">Chief Vet: Dr. Tariq Mahmood</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            💊 MEDICAL & <span className="text-red-400">HEALTH RECORDS</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Vaccination calendars, epidemiological screening, quarantine pen management, and treatment protocols.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 text-sm shadow-glow-green"
          >
            <FaPlus /> Add Health Checkup
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Herd Health Index</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">98.7%</div>
          <p className="text-[11px] text-emerald-300 mt-1">154 of 156 Animals Certified Healthy</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-rose-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Quarantine Bay Status</span>
          <div className="text-3xl font-extrabold text-rose-400 mt-2">1 Animal</div>
          <p className="text-[11px] text-rose-300 mt-1">Bella White (AHMED-C003) - Pen B</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-blue-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Vaccine Compliance</span>
          <div className="text-3xl font-extrabold text-blue-300 mt-2">100%</div>
          <p className="text-[11px] text-gray-400 mt-1">FMD, HS, PPR & Anthrax up to date</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-purple-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Monthly Veterinary Cost</span>
          <div className="text-3xl font-extrabold text-[#d4af37] mt-2">₨34,500</div>
          <p className="text-[11px] text-gray-400 mt-1">Vaccines, Dewormers & Antibiotics</p>
        </div>
      </div>

      {/* QUARANTINE BAY LIVE ALERT */}
      <div className="ahmed-glass p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600/30 text-rose-400 flex items-center justify-center text-xl shrink-0 animate-pulse">
            <FaHeartbeat />
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-rose-400">Active Quarantine Facility: Pen B Isolation</div>
            <p className="text-xs text-gray-200 mt-0.5">
              Subject: <strong>Bella White (AHMED-C003)</strong> • Condition: Early Stage Respiratory Infection (Temp: 39.2°C) • Protocol: Antibiotic Course Day 2/3. Milk withhold active.
            </p>
          </div>
        </div>
        <span className="text-xs bg-rose-600 text-white font-bold px-3 py-1 rounded-full shrink-0">
          Under Quarantine
        </span>
      </div>

      {/* MEDICAL AUDIT LOG TABLE */}
      <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
        <div className="p-4 bg-[#131324] border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <span className="text-red-400"><FaStethoscope /></span> Clinical Veterinary Ledger & Diagnoses
          </h3>
          <span className="text-xs text-gray-400">{medicalRecords.length} Recorded Interventions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Animal Tag & Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Symptoms</th>
                <th className="py-3 px-4">Clinical Diagnosis</th>
                <th className="py-3 px-4">Treatment Administered</th>
                <th className="py-3 px-4">Attending Vet</th>
                <th className="py-3 px-4">Quarantine Status</th>
                <th className="py-3 px-4 text-center">Cost (₨)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {medicalRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 text-gray-300 font-semibold">{rec.date}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{rec.animalName}</div>
                    <span className="font-mono text-amber-300 text-[10px]">{rec.animalId}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{rec.category}</td>
                  <td className="py-3 px-4 text-gray-400">{rec.symptoms || "None"}</td>
                  <td className="py-3 px-4 font-semibold text-rose-300">{rec.diagnosis}</td>
                  <td className="py-3 px-4 text-emerald-300">{rec.treatment}</td>
                  <td className="py-3 px-4 text-gray-300">{rec.vetName}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rec.quarantineStatus.includes("Quarantine")
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-gray-800 text-gray-400"
                    }`}>
                      {rec.quarantineStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-300 text-center">
                    ₨{rec.cost?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD CHECKUP MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-red-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
              <FaStethoscope className="text-red-400" /> Log Veterinary Examination
            </h3>

            <form onSubmit={handleAddMedicalSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Select Animal</label>
                  <select
                    value={formData.animalId}
                    onChange={(e) => setFormData({ ...formData, animalId: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {animals.map((a) => (
                      <option key={a.animalId} value={a.animalId}>
                        {a.name} ({a.animalId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Observed Symptoms</label>
                <input
                  type="text"
                  placeholder="e.g. Mild cough, reduced feed intake"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Clinical Diagnosis *</label>
                <input
                  type="text"
                  placeholder="e.g. Annual FMD Booster / Bovine Mastitis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Treatment / Medicine Prescribed *</label>
                <input
                  type="text"
                  placeholder="e.g. Aftovax 2ml s/c + Multivitamins"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Attending Vet</label>
                  <input
                    type="text"
                    value={formData.vetName}
                    onChange={(e) => setFormData({ ...formData, vetName: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Cost (₨)</label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Quarantine Action</label>
                <select
                  value={formData.quarantineStatus}
                  onChange={(e) => setFormData({ ...formData, quarantineStatus: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                >
                  <option value="None">None (In General Herd)</option>
                  <option value="Quarantined in Pen B">Quarantine in Pen B</option>
                  <option value="Isolated in Maternity Bay">Isolated in Maternity Bay</option>
                </select>
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
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-1.5 rounded-lg"
                >
                  Save Medical Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHealthModule;
