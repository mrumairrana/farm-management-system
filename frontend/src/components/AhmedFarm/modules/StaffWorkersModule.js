import React, { useState } from "react";
import {
  FaUsers,
  FaPlus,
  FaTimes,
  FaPrint,
  FaFileInvoiceDollar
} from "react-icons/fa";

const StaffWorkersModule = ({ staff, setStaff }) => {
  const [activeTab, setActiveTab] = useState("roster"); // roster, attendance, payroll
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStaffSlip, setSelectedStaffSlip] = useState(null);

  // New Staff Form State
  const [formData, setFormData] = useState({
    id: `AHMED-S00${staff.length + 1}`,
    name: "",
    role: "Dairy Worker",
    cnic: "",
    phone: "",
    address: "Mianwali, Punjab",
    joinDate: new Date().toISOString().split("T")[0],
    shift: "Morning (05:00 - 13:00)",
    assignedArea: "Dairy Barn",
    emergencyContact: "",
    salary: 25000,
    status: "Active",
    attendanceStatus: "Present",
    advanceDeduction: 0,
    overtime: 0,
    paymentStatus: "Paid"
  });

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const newStaff = {
      ...formData,
      id: `AHMED-S00${staff.length + 1}`,
      salary: parseFloat(formData.salary) || 25000
    };
    setStaff([...staff, newStaff]);
    setIsAddModalOpen(false);
  };

  const handleAttendanceToggle = (id, status) => {
    setStaff(
      staff.map((s) => (s.id === id ? { ...s, attendanceStatus: status } : s))
    );
  };

  const handlePayrollStatusToggle = (id) => {
    setStaff(
      staff.map((s) =>
        s.id === id
          ? { ...s, paymentStatus: s.paymentStatus === "Paid" ? "Pending" : "Paid" }
          : s
      )
    );
  };

  const totalMonthlyPayroll = staff.reduce((acc, s) => acc + (s.salary || 0), 0);
  const presentCount = staff.filter((s) => s.attendanceStatus === "Present").length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#52b788] text-gray-950 font-bold px-2 py-0.5 rounded-full">
              Human Resources & Payroll
            </span>
            <span className="text-xs text-gray-400">Total Workforce: {staff.length} Active Workers</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            👨‍🌾 STAFF & <span className="text-[#d4af37]">WORKERS</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Shift scheduling, daily biometric attendance, advances, deductions, and monthly salary slips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Add Staff Member
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Active Farm Workers</span>
          <div className="text-3xl font-extrabold text-[#d4af37] mt-2">{staff.length}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Full-time & Specialized Crew</span>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-blue-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Today's Attendance</span>
          <div className="text-3xl font-extrabold text-blue-300 mt-2">
            {presentCount} / {staff.length}
          </div>
          <span className="text-[11px] text-emerald-300 mt-1 block">
            {Math.round((presentCount / staff.length) * 100)}% On-Duty Rate
          </span>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-purple-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Monthly Payroll Budget</span>
          <div className="text-3xl font-extrabold text-purple-300 mt-2">
            ₨{totalMonthlyPayroll.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Across All 8 Farm Departments</span>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-teal-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Payroll Status</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">Processed</div>
          <span className="text-[11px] text-gray-400 mt-1 block">Settled via Direct Bank/Cash</span>
        </div>
      </div>

      {/* SUB-TABS */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab("roster")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "roster"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Staff Directory & Roles ({staff.length})
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "attendance"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Daily Attendance Tracker
        </button>
        <button
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === "payroll"
              ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
              : "bg-gray-900 text-gray-400 hover:text-white"
          }`}
        >
          Monthly Payroll & Salary Slips
        </button>
      </div>

      {/* VIEW 1: STAFF DIRECTORY */}
      {activeTab === "roster" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {staff.map((s) => (
            <div
              key={s.id}
              className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 shadow-glass flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs text-[#d4af37] font-bold">{s.id}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    {s.attendanceStatus}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white mb-0.5">{s.name}</h3>
                <div className="text-xs font-semibold text-[#52b788] mb-2">{s.role}</div>

                <div className="space-y-1.5 text-xs text-gray-300 bg-gray-900/60 p-3 rounded-xl border border-gray-800 mb-3">
                  <div>
                    <span className="text-gray-400 text-[10px] block">Shift</span>
                    <strong>{s.shift}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Assigned Domain</span>
                    <strong>{s.assignedArea}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Contact</span>
                    <strong className="text-emerald-300">{s.phone}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">CNIC</span>
                    <span className="font-mono text-gray-400">{s.cnic || "38302-XXXXXXX-X"}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-xs">
                <span className="font-bold text-amber-300">₨{s.salary?.toLocaleString()}/mo</span>
                <button
                  onClick={() => setSelectedStaffSlip(s)}
                  className="bg-gray-800 hover:bg-[#d4af37] hover:text-gray-950 text-gray-300 text-xs px-2.5 py-1 rounded-lg transition flex items-center gap-1"
                >
                  <FaFileInvoiceDollar /> Salary Slip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: ATTENDANCE TRACKER */}
      {activeTab === "attendance" && (
        <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
          <div className="p-4 bg-[#131324] border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-white text-sm">
              Today's Daily Attendance Register — {new Date().toLocaleDateString()}
            </h3>
            <span className="text-xs text-emerald-400 font-bold">
              {presentCount} of {staff.length} Present
            </span>
          </div>

          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-gray-900 text-gray-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Staff ID</th>
                <th className="py-3 px-4">Worker Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Shift Schedule</th>
                <th className="py-3 px-4 text-center">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">{s.id}</td>
                  <td className="py-3 px-4 font-bold text-white">{s.name}</td>
                  <td className="py-3 px-4 text-emerald-300">{s.role}</td>
                  <td className="py-3 px-4 text-gray-300">{s.shift}</td>
                  <td className="py-3 px-4 text-center space-x-1.5">
                    <button
                      onClick={() => handleAttendanceToggle(s.id, "Present")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        s.attendanceStatus === "Present"
                          ? "bg-emerald-600 text-white shadow-glow-green"
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceToggle(s.id, "Half Day")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        s.attendanceStatus === "Half Day"
                          ? "bg-amber-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      Half Day
                    </button>
                    <button
                      onClick={() => handleAttendanceToggle(s.id, "Leave")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        s.attendanceStatus === "Leave"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      Leave
                    </button>
                    <button
                      onClick={() => handleAttendanceToggle(s.id, "Absent")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        s.attendanceStatus === "Absent"
                          ? "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: PAYROLL MANAGEMENT */}
      {activeTab === "payroll" && (
        <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Staff ID</th>
                <th className="py-3 px-4">Worker Name</th>
                <th className="py-3 px-4">Base Salary</th>
                <th className="py-3 px-4">Advance Deduction</th>
                <th className="py-3 px-4">Overtime</th>
                <th className="py-3 px-4">Net Payable (₨)</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {staff.map((s) => {
                const net = (s.salary || 0) - (s.advanceDeduction || 0) + (s.overtime || 0);
                return (
                  <tr key={s.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-amber-300">{s.id}</td>
                    <td className="py-3 px-4 font-bold text-white">{s.name}</td>
                    <td className="py-3 px-4 text-gray-300">₨{s.salary?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-red-400">-₨{(s.advanceDeduction || 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-emerald-400">+₨{(s.overtime || 0).toLocaleString()}</td>
                    <td className="py-3 px-4 font-black text-amber-300">₨{net.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handlePayrollStatusToggle(s.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.paymentStatus === "Paid"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {s.paymentStatus || "Paid"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedStaffSlip(s)}
                        className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold text-xs px-3 py-1 rounded-lg transition flex items-center gap-1 mx-auto"
                      >
                        <FaPrint /> Print Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* SALARY SLIP PRINT MODAL */}
      {selectedStaffSlip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-[#d4af37]/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedStaffSlip(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            {/* Salary Slip Document */}
            <div className="bg-[#121224] p-5 rounded-2xl border-2 border-[#d4af37] shadow-xl text-xs space-y-3">
              <div className="text-center border-b border-[#d4af37]/40 pb-3">
                <h3 className="font-black text-base text-white">🌾 AHMED FARM MANAGEMENT</h3>
                <p className="text-[10px] text-[#d4af37] font-semibold uppercase">
                  Official Monthly Salary & Wages Slip
                </p>
                <div className="text-[9px] text-gray-400">Period: August 2026 • Mianwali Punjab</div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-[11px]">
                <div>Staff ID: <strong className="text-amber-300 font-mono">{selectedStaffSlip.id}</strong></div>
                <div>Name: <strong className="text-white">{selectedStaffSlip.name}</strong></div>
                <div>Designation: <strong className="text-emerald-400">{selectedStaffSlip.role}</strong></div>
                <div>Shift: <strong className="text-gray-300">{selectedStaffSlip.shift}</strong></div>
              </div>

              <div className="space-y-1.5 border-t border-gray-800 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Monthly Salary:</span>
                  <strong className="text-white">₨{selectedStaffSlip.salary?.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Overtime & Allowances:</span>
                  <strong>+₨{(selectedStaffSlip.overtime || 0).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Advance / Loan Deductions:</span>
                  <strong>-₨{(selectedStaffSlip.advanceDeduction || 0).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2 text-sm">
                  <span className="font-bold text-white">NET PAYABLE:</span>
                  <strong className="font-black text-[#d4af37]">
                    ₨{(
                      (selectedStaffSlip.salary || 0) -
                      (selectedStaffSlip.advanceDeduction || 0) +
                      (selectedStaffSlip.overtime || 0)
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] text-gray-500 pt-3 border-t border-gray-800">
                <div>Authorized: Ahmed Khan (Proprietor)</div>
                <div>Status: Certified Paid</div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => window.print()}
                className="bg-[#d4af37] hover:bg-yellow-400 text-gray-950 font-bold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-glow-gold"
              >
                <FaPrint /> Print Official Salary Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
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
              <FaUsers className="text-[#52b788]" /> Add Farm Worker
            </h3>

            <form onSubmit={handleAddStaff} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Tariq Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Role / Designation</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Farm Manager">Farm Manager</option>
                    <option value="Dairy Worker">Dairy Worker</option>
                    <option value="Field Worker">Field Worker</option>
                    <option value="Tractor Driver">Tractor Driver</option>
                    <option value="Night Guard">Night Guard</option>
                    <option value="Veterinary Assistant">Veterinary Assistant</option>
                    <option value="Irrigation & Solar Tech">Irrigation Tech</option>
                    <option value="Cook / Housekeeper">Cook / Housekeeper</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Shift</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Morning (05:00 - 13:00)">Morning</option>
                    <option value="Evening (14:00 - 22:00)">Evening</option>
                    <option value="Night (20:00 - 08:00)">Night</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Monthly Salary (₨)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Assigned Area / Barn</label>
                <input
                  type="text"
                  placeholder="e.g. Milking Parlor & Dairy Shed 1"
                  value={formData.assignedArea}
                  onChange={(e) => setFormData({ ...formData, assignedArea: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
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
                  Register Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffWorkersModule;
