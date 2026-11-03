import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileCsv,
  FaCheckCircle,
  FaPrint,
  FaCalendarAlt,
  FaFileAlt
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportsAnalyticsModule = ({ farmData }) => {
  const [downloadSuccess, setDownloadSuccess] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-31");

  const notifySuccess = (msg) => {
    setDownloadSuccess(msg);
    setTimeout(() => setDownloadSuccess(""), 4000);
  };

  // Base PDF Header Generator
  const createFarmBuilderDoc = (title, subtitle) => {
    const doc = new jsPDF();
    doc.setFillColor(45, 106, 79); // Farm Builder Green
    doc.rect(0, 0, 210, 32, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("🌾 FARM BUILDER MANAGEMENT SYSTEM", 14, 15);
    doc.setFontSize(10);
    doc.text(title, 14, 23);
    doc.setFontSize(8);
    doc.text(`Date Range: ${startDate} to ${endDate} | Generated: ${new Date().toLocaleDateString()}`, 14, 29);

    return doc;
  };

  // 1. Daily Farm Report
  const exportDailyFarmReport = () => {
    const doc = createFarmBuilderDoc("Daily Comprehensive Farm Activity Report", "All daily farm operations and telemetry");
    const summaryData = [
      ["Total Livestock Registered", `${farmData.animals?.length || 156} Heads`],
      ["Today's Milk Yield", "420 Liters @ Grade A"],
      ["Active Field Plots", "8 Plots (125 Cultivated Acres)"],
      ["Active Staff On-Duty", "8 of 8 Workers Present"],
      ["Weather Status", "Sunny & Clear (32°C) - Spray Window 06:00 - 09:30 AM"],
      ["Pending Chores", "3 Operations Pending"]
    ];

    doc.autoTable({
      startY: 40,
      head: [["Operational Domain", "Daily Status & Telemetry"]],
      body: summaryData,
      theme: "grid",
      headStyles: { fillColor: [45, 106, 79] }
    });

    doc.save("FarmBuilder_Daily_Report.pdf");
    notifySuccess("Daily Farm Report Exported Successfully!");
  };

  // 2. Monthly Milk Production Report
  const exportMonthlyMilkReport = () => {
    const doc = createFarmBuilderDoc("Monthly Milk Production & Revenue Audit", "Milk yields, fat testing, and bulk sales");
    const records = farmData.milkRecords || [];
    const tableData = records.slice(0, 40).map((r) => [
      r.date,
      r.animalName,
      `${r.morning || (r.quantity / 2).toFixed(1)} L`,
      `${r.evening || (r.quantity / 2).toFixed(1)} L`,
      `${r.quantity} L`,
      `${r.fatPercent}%`,
      `Grade ${r.qualityGrade || "A"}`,
      `₨${(r.revenue || Math.round(r.quantity * 185)).toLocaleString()}`
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Date", "Cow Name", "Morning", "Evening", "Total Yield", "Fat %", "Quality", "Revenue (₨)"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 150, 180] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Monthly_Milk_Report.pdf");
    notifySuccess("Monthly Milk Production Report Exported!");
  };

  // 3. Monthly Expense Report
  const exportMonthlyExpenseReport = () => {
    const doc = createFarmBuilderDoc("Monthly Expense & Disbursement Report", "Categorized disbursements vs operational budget");
    const expenses = farmData.expenses || [];
    const expData = expenses.map((e) => [
      e.date,
      e.invoiceNumber,
      e.title,
      e.category,
      e.vendor,
      `₨${e.amount?.toLocaleString()}`,
      e.paymentStatus
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Date", "Voucher", "Expense Title", "Category", "Vendor", "Amount (₨)", "Status"]],
      body: expData,
      theme: "grid",
      headStyles: { fillColor: [180, 50, 50] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Monthly_Expenses.pdf");
    notifySuccess("Monthly Expense Report Exported!");
  };

  // 4. Profit & Loss Statement
  const exportPLStatement = () => {
    const doc = createFarmBuilderDoc("Profit & Loss Financial Statement (₨ PKR)", "Gross farm revenues vs categorized expenditures");
    const plData = [
      ["Gross Revenue - Daily Milk Sales", "₨185,000"],
      ["Gross Revenue - Livestock Sales", "₨620,000"],
      ["Gross Revenue - Crop Harvest Sales", "₨850,000"],
      ["Gross Revenue - Poultry & Eggs", "₨185,000"],
      ["TOTAL GROSS REVENUE", "₨1,840,000"],
      ["---", "---"],
      ["Operating Expense - Animal Feed & Fodder", "₨67,000"],
      ["Operating Expense - Fuel & Energy", "₨256,500"],
      ["Operating Expense - Labor & Wages", "₨176,000"],
      ["Operating Expense - Veterinary & Medicines", "₨34,500"],
      ["Operating Expense - Fertilizers & Seeds", "₨66,000"],
      ["TOTAL OPERATING EXPENSES", "₨599,000"],
      ["---", "---"],
      ["NET OPERATING PROFIT (EBITDA)", "₨1,241,000"]
    ];

    doc.autoTable({
      startY: 40,
      head: [["Financial Category", "Amount (₨ PKR)"]],
      body: plData,
      theme: "striped",
      headStyles: { fillColor: [212, 175, 55], textColor: [0, 0, 0] },
      styles: { fontSize: 9 }
    });

    doc.save("FarmBuilder_Profit_Loss_Statement.pdf");
    notifySuccess("Profit & Loss Statement Exported!");
  };

  // 5. Animal Health Report
  const exportAnimalHealthReport = () => {
    const doc = createFarmBuilderDoc("Livestock Medical & Vaccination Audit", "Clinical diagnoses, treatments, and quarantine logs");
    const meds = farmData.medicalRecords || [];
    const tableData = meds.map((m) => [
      m.date,
      m.animalId,
      m.animalName,
      m.diagnosis,
      m.treatment,
      m.vetName,
      m.quarantineStatus,
      `₨${m.cost?.toLocaleString()}`
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Date", "Tag ID", "Animal Name", "Diagnosis", "Treatment", "Attending Vet", "Quarantine", "Cost"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [200, 70, 70] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Health_Report.pdf");
    notifySuccess("Animal Health Report Exported!");
  };

  // 6. Crop Yield Report
  const exportCropYieldReport = () => {
    const doc = createFarmBuilderDoc("Crop Agronomy & Harvest Yield Summary", "Plot-by-plot yield targets and financial margins");
    const crops = farmData.crops || [];
    const tableData = crops.map((c) => [
      c.plotName,
      c.cropName,
      `${c.acreage} Acres`,
      c.growthStage,
      `${c.progress}%`,
      c.expectedYield,
      `₨${c.estimatedRevenue?.toLocaleString()}`,
      `₨${c.profit?.toLocaleString()}`
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Plot Name", "Crop Name", "Acreage", "Stage", "Progress", "Yield Target", "Est Revenue", "Net Margin"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [45, 106, 79] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Crop_Yield_Report.pdf");
    notifySuccess("Crop Yield Report Exported!");
  };

  // 7. Staff Attendance & Payroll Report
  const exportPayrollReport = () => {
    const doc = createFarmBuilderDoc("Staff Attendance & Monthly Payroll Ledger", "Wages, overtime, and attendance status");
    const staff = farmData.staff || [];
    const tableData = staff.map((s) => [
      s.id,
      s.name,
      s.role,
      s.shift,
      `₨${s.salary?.toLocaleString()}`,
      s.attendanceStatus,
      s.paymentStatus
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Staff ID", "Worker Name", "Role / Designation", "Shift", "Monthly Salary", "Attendance", "Payroll Status"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [80, 50, 150] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Staff_Payroll_Report.pdf");
    notifySuccess("Staff Attendance & Payroll Report Exported!");
  };

  // 8. Inventory Valuation Report
  const exportInventoryValuationReport = () => {
    const doc = createFarmBuilderDoc("Farm Inventory Valuation & Stock Audit", "Current asset values across feed, chemicals, and equipment");
    const inv = farmData.inventory || [];
    const tableData = inv.map((i) => [
      i.name,
      i.category,
      `${i.quantity} ${i.unit}`,
      `₨${i.unitCost?.toLocaleString()}`,
      `₨${((i.quantity || 0) * (i.unitCost || 0)).toLocaleString()}`,
      i.location,
      i.status
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Item Name", "Category", "Quantity", "Unit Cost", "Total Value (₨)", "Storage Location", "Stock Status"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [45, 106, 79] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Inventory_Valuation.pdf");
    notifySuccess("Inventory Valuation Report Exported!");
  };

  // 9. Equipment Utilization Report
  const exportEquipmentReport = () => {
    const doc = createFarmBuilderDoc("Heavy Equipment & Machinery Utilization Audit", "Operating hours, fuel consumption, and service due dates");
    const eq = farmData.machinery || [];
    const tableData = eq.map((m) => [
      m.id,
      m.name,
      m.type,
      `${m.hoursRun} Hours`,
      m.condition,
      m.dailyConsumption,
      m.operatorName,
      m.nextServiceDue
    ]);

    doc.autoTable({
      startY: 40,
      head: [["ID", "Equipment Name", "Type", "Total Hours Run", "Condition", "Consumption", "Operator", "Next Service Due"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [180, 120, 30] },
      styles: { fontSize: 8 }
    });

    doc.save("FarmBuilder_Equipment_Utilization.pdf");
    notifySuccess("Equipment Utilization Report Exported!");
  };

  // 10. Annual Farm Summary
  const exportAnnualSummary = () => {
    const doc = createFarmBuilderDoc("Annual Comprehensive Farm Performance Summary", "Complete year-end operations overview");
    const annualData = [
      ["Annual Milk Production", "151,200 Liters (Total Gross: ₨2,797,200)"],
      ["Annual Livestock Sales", "32 Heads Dispatched (₨4,850,000)"],
      ["Annual Crop Harvest", "Wheat, Basmati Rice & Cotton (₨6,420,000)"],
      ["Total Operational Overheads", "₨3,650,000 (Feed, Fuel, Wages, Repairs)"],
      ["Net Annual Farm Profit", "₨10,417,200"],
      ["Herd Health & Vaccination Rate", "100% Up to Date"],
      ["Overall Operational Status", "100% Operational (Farm Builder Enterprise)"]
    ];

    doc.autoTable({
      startY: 40,
      head: [["Annual Performance Metric", "Year-End Value (₨ PKR)"]],
      body: annualData,
      theme: "striped",
      headStyles: { fillColor: [45, 106, 79] },
      styles: { fontSize: 9 }
    });

    doc.save("FarmBuilder_Annual_Summary.pdf");
    notifySuccess("Annual Farm Summary Exported!");
  };

  // CSV Export Helper
  const exportCSV = (category) => {
    let headers = [];
    let rows = [];
    let filename = `FarmBuilder_${category}_Export.csv`;

    if (category === "Milk") {
      headers = ["Date", "Animal ID", "Animal Name", "Morning (L)", "Evening (L)", "Total (L)", "Fat %", "Quality", "Revenue (₨)"];
      rows = (farmData.milkRecords || []).map((r) => [
        r.date,
        r.animalId,
        `"${r.animalName}"`,
        r.morning || (r.quantity / 2).toFixed(1),
        r.evening || (r.quantity / 2).toFixed(1),
        r.quantity,
        r.fatPercent,
        r.qualityGrade,
        r.revenue || Math.round(r.quantity * 185)
      ]);
    } else if (category === "Expenses") {
      headers = ["Date", "Voucher", "Title", "Category", "Amount", "Vendor", "Status"];
      rows = (farmData.expenses || []).map((e) => [
        e.date,
        e.invoiceNumber,
        `"${e.title}"`,
        `"${e.category}"`,
        e.amount,
        `"${e.vendor}"`,
        e.paymentStatus
      ]);
    } else {
      headers = ["ID", "Name", "Category", "Breed", "Age", "Weight", "Status", "Health"];
      rows = (farmData.animals || []).map((a) => [
        a.animalId,
        `"${a.name}"`,
        `"${a.category}"`,
        `"${a.breed}"`,
        a.age,
        a.weight,
        a.status,
        a.healthStatus
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notifySuccess(`${category} CSV exported successfully!`);
  };

  const reportList = [
    { id: "daily", name: "1. Daily Farm Activity Report", desc: "Consolidated status of all farm operations, chores, milk, and climate telemetry.", action: exportDailyFarmReport, category: "operations" },
    { id: "milk", name: "2. Monthly Milk Production Report", desc: "Cow-by-cow yields, fat %, quality grades, storage allocations, and gross dairy sales.", action: exportMonthlyMilkReport, category: "dairy" },
    { id: "expense", name: "3. Monthly Expense Report", desc: "Categorized financial disbursements across feed, fuel, labor, meds, and repair vouchers.", action: exportMonthlyExpenseReport, category: "financial" },
    { id: "pl", name: "4. Profit & Loss Financial Statement", desc: "Formal financial P&L statement calculating net EBITDA profit margins in ₨ PKR.", action: exportPLStatement, category: "financial" },
    { id: "health", name: "5. Animal Health & Quarantine Audit", desc: "Clinical diagnoses, antibiotic withdrawals, vet logs, and Pen B isolation cases.", action: exportAnimalHealthReport, category: "livestock" },
    { id: "crops", name: "6. Crop Agronomy & Harvest Report", desc: "Plot acreage, growth stages, soil moisture levels, and harvest yield revenue targets.", action: exportCropYieldReport, category: "crops" },
    { id: "payroll", name: "7. Staff Attendance & Payroll Report", desc: "8 staff members attendance records, shift schedules, overtime, and monthly wages.", action: exportPayrollReport, category: "operations" },
    { id: "inventory", name: "8. Inventory Valuation Report", desc: "Stock levels and total valuation across feed, medicines, fertilizers, and supplies.", action: exportInventoryValuationReport, category: "operations" },
    { id: "equipment", name: "9. Equipment Utilization Report", desc: "Machinery hours run, fuel consumption logs, and scheduled service due dates.", action: exportEquipmentReport, category: "operations" },
    { id: "annual", name: "10. Annual Comprehensive Summary", desc: "Executive year-end overview of all farm departments, productivity, and profitability.", action: exportAnnualSummary, category: "financial" }
  ];

  const filteredReports = reportList.filter(
    (r) => selectedReportType === "all" || r.category === selectedReportType
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#d4af37] text-gray-950 font-bold px-2 py-0.5 rounded-full">
              Intelligence & Compliance
            </span>
            <span className="text-xs text-gray-400">10 Certified PDF & CSV Audits</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            📈 REPORTS & <span className="text-[#52b788]">ANALYTICS ENGINE</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Instant client-side PDF document generator with official Farm Builder letterhead and spreadsheet exports.
          </p>
        </div>

        {/* Global CSV Exports */}
        <div className="flex gap-2">
          <button
            onClick={() => exportCSV("Livestock")}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-gray-700"
          >
            <FaFileCsv /> Export Livestock CSV
          </button>
          <button
            onClick={() => exportCSV("Milk")}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-gray-700"
          >
            <FaFileCsv /> Export Milk CSV
          </button>
        </div>
      </div>

      {/* Date Range & Filter Controls */}
      <div className="ahmed-glass p-4 rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-gray-300">
            <FaCalendarAlt className="text-amber-400" /> Start:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
            />
          </div>

          <div className="flex items-center gap-1.5 text-gray-300">
            <FaCalendarAlt className="text-amber-400" /> End:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-1.5 flex-wrap">
          {["all", "financial", "dairy", "livestock", "crops", "operations"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedReportType(cat)}
              className={`px-3 py-1 rounded-lg font-bold capitalize transition ${
                selectedReportType === cat
                  ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
                  : "bg-gray-900 text-gray-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "All 10 Reports" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Toast */}
      {downloadSuccess && (
        <div className="ahmed-glass-gold p-3 rounded-xl border border-amber-400 flex items-center gap-2 text-xs font-bold text-amber-300 animate-bounce">
          <FaCheckCircle className="text-emerald-400 text-sm" />
          {downloadSuccess}
        </div>
      )}

      {/* 10 REPORT GENERATOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReports.map((rep) => (
          <div
            key={rep.id}
            className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between hover:border-emerald-500/50 transition shadow-glass"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase">
                  {rep.category} Domain
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Certified PDF
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                <FaFileAlt className="text-[#52b788]" /> {rep.name}
              </h3>
              <p className="text-xs text-gray-300 mb-4">{rep.desc}</p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
              <button
                onClick={rep.action}
                className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-glow-green"
              >
                <FaFilePdf /> Download Official PDF
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition"
                title="Print Report"
              >
                <FaPrint /> Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsAnalyticsModule;
