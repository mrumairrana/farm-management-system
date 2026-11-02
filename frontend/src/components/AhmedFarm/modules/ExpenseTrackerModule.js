import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaPlus,
  FaClock,
  FaPrint,
  FaReceipt,
  FaTimes,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

const ExpenseTrackerModule = ({ expenses, setExpenses, revenues, setRevenues }) => {
  const [activeTab, setActiveTab] = useState("all"); // all, expenses, revenues
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");
  const [viewingReceipt, setViewingReceipt] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "Livestock Feed",
    title: "",
    amount: "",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    vendorOrCustomer: "",
    invoiceNumber: `INV-AF-${Math.floor(1000 + Math.random() * 9000)}`
  });

  const totalExpenseAmount = expenses.reduce((acc, e) => acc + (parseFloat(e.amount) || 0), 0);
  const totalRevenueAmount = revenues.reduce((acc, r) => acc + (parseFloat(r.amount) || 0), 0);
  const netCashflow = totalRevenueAmount - totalExpenseAmount;
  const pendingExpenses = expenses
    .filter((e) => e.paymentStatus === "Pending")
    .reduce((acc, e) => acc + (parseFloat(e.amount) || 0), 0);

  const handleAddTransactionSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      alert("Please enter title and amount.");
      return;
    }

    const amt = parseFloat(formData.amount) || 0;

    if (transactionType === "expense") {
      const newExp = {
        id: `exp_${Date.now()}`,
        date: formData.date,
        category: formData.category,
        title: formData.title,
        amount: amt,
        paymentStatus: formData.paymentStatus,
        paymentMethod: formData.paymentMethod,
        vendor: formData.vendorOrCustomer || "Agro Vendor",
        invoiceNumber: formData.invoiceNumber
      };
      setExpenses([newExp, ...expenses]);
    } else {
      const newRev = {
        id: `rev_${Date.now()}`,
        date: formData.date,
        category: formData.category,
        title: formData.title,
        amount: amt,
        customer: formData.vendorOrCustomer || "Farm Buyer",
        paymentStatus: "Paid",
        receiptNo: formData.invoiceNumber
      };
      setRevenues([newRev, ...revenues]);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
              Financial Treasury
            </span>
            <span className="text-xs text-gray-400">All Amounts in Pakistani Rupees (₨ PKR)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            💰 EXPENSE & REVENUE <span className="text-[#d4af37]">TRACKER</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Real-time farm ledger, categorization, supplier invoices, and audit-ready P&L balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTransactionType("expense");
              setIsAddModalOpen(true);
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 text-xs"
          >
            <FaPlus /> Record Expense
          </button>
          <button
            onClick={() => {
              setTransactionType("revenue");
              setIsAddModalOpen(true);
            }}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 text-xs shadow-glow-green"
          >
            <FaPlus /> Record Revenue
          </button>
        </div>
      </div>

      {/* KPI METRIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-gray-400 uppercase">Monthly Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FaArrowUp />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#d4af37] mt-2">
            ₨{totalRevenueAmount.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">Milk Sales + Livestock Sales + Harvest</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-rose-500/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-gray-400 uppercase">Total Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <FaArrowDown />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-400 mt-2">
            ₨{totalExpenseAmount.toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Feed, Fuel, Vet, Labor & Maintenance</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-amber-500/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-gray-400 uppercase">Pending Due Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FaClock />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-300 mt-2">
            ₨{pendingExpenses.toLocaleString()}
          </div>
          <p className="text-[11px] text-rose-400 mt-1">Due within next 7 days</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-teal-500/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-gray-400 uppercase">Net Farm Profit</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <FaMoneyBillWave />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-300 mt-2">
            ₨{netCashflow.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">✓ Profitable Positive Cashflow</p>
        </div>
      </div>

      {/* TAB SELECTOR */}
      <div className="flex justify-between items-center bg-gray-900/60 p-1.5 rounded-xl border border-gray-800 text-xs">
        <div className="flex gap-2">
          {["all", "expenses", "revenues"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg font-bold transition capitalize ${
                activeTab === tab
                  ? "bg-[#2d6a4f] text-white shadow-glow-green"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "all" ? "Full Financial Ledger" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* EXPENSE LEDGER TABLE */}
      {(activeTab === "all" || activeTab === "expenses") && (
        <div className="ahmed-glass rounded-2xl border border-rose-500/20 overflow-hidden shadow-glass">
          <div className="p-4 bg-[#131324] border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="text-rose-400"><FaFileInvoiceDollar /></span> Farm Expense Disbursements
            </h3>
            <span className="text-xs text-gray-400">{expenses.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-200">
              <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Expense Title & Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Vendor / Supplier</th>
                  <th className="py-3 px-4">Amount (₨)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-amber-300">{exp.invoiceNumber}</td>
                    <td className="py-3 px-4 text-gray-300">{exp.date}</td>
                    <td className="py-3 px-4 font-semibold text-white">{exp.title}</td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[10px]">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{exp.vendor}</td>
                    <td className="py-3 px-4 font-bold text-rose-400 text-sm">
                      ₨{exp.amount?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        exp.paymentStatus === "Paid"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400 animate-pulse"
                      }`}>
                        {exp.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setViewingReceipt({ ...exp, type: "Expense" })}
                        className="p-1.5 bg-gray-800 hover:bg-gray-700 text-amber-300 rounded-lg"
                        title="View Official Voucher"
                      >
                        <FaReceipt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REVENUE TABLE */}
      {(activeTab === "all" || activeTab === "revenues") && (
        <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
          <div className="p-4 bg-[#131324] border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="text-emerald-400"><FaMoneyBillWave /></span> Inflows & Farm Revenue
            </h3>
            <span className="text-xs text-gray-400">{revenues.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-200">
              <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Receipt No</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Revenue Stream</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Customer / Buyer</th>
                  <th className="py-3 px-4">Amount Received (₨)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {revenues.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-300">{rev.receiptNo}</td>
                    <td className="py-3 px-4 text-gray-300">{rev.date}</td>
                    <td className="py-3 px-4 font-semibold text-white">{rev.title}</td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">
                        {rev.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{rev.customer}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-400 text-sm">
                      ₨{rev.amount?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {rev.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECEIPT / VOUCHER MODAL */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-amber-500/40 shadow-2xl relative">
            <button
              onClick={() => setViewingReceipt(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <div className="text-center border-b border-gray-800 pb-3 mb-4">
              <h3 className="text-lg font-black text-amber-300 uppercase tracking-wide">
                AHMED FARM MANAGEMENT SYSTEM
              </h3>
              <p className="text-[10px] text-emerald-300">Official Payment Voucher</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Voucher Ref:</span>
                <span className="font-mono font-bold text-white">{viewingReceipt.invoiceNumber || viewingReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Date:</span>
                <span className="text-white">{viewingReceipt.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{viewingReceipt.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Party:</span>
                <span className="text-white">{viewingReceipt.vendor || viewingReceipt.customer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Payment Status:</span>
                <span className="font-bold text-emerald-400">{viewingReceipt.paymentStatus}</span>
              </div>
              <div className="flex justify-between py-2 bg-black/40 p-2 rounded-xl mt-2">
                <span className="text-gray-300 font-bold">Total Voucher Amount:</span>
                <span className="text-base font-extrabold text-[#d4af37]">₨{viewingReceipt.amount?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-800">
              <button
                onClick={() => setViewingReceipt(null)}
                className="bg-gray-800 text-white text-xs px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-[#d4af37] text-gray-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <FaPrint /> Print Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD TRANSACTION MODAL */}
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
              <FaMoneyBillWave className={transactionType === "expense" ? "text-rose-400" : "text-emerald-400"} />
              Record New {transactionType === "expense" ? "Farm Expense" : "Farm Revenue"}
            </h3>

            <form onSubmit={handleAddTransactionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Transaction Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 50 Bags Fertilizer / Cattle Sale"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {transactionType === "expense" ? (
                      <>
                        <option value="Livestock Feed">Livestock Feed</option>
                        <option value="Veterinary & Medicines">Veterinary & Medicines</option>
                        <option value="Machinery & Fuel">Machinery & Fuel</option>
                        <option value="Labor & Wages">Labor & Wages</option>
                        <option value="Seeds & Fertilizers">Seeds & Fertilizers</option>
                        <option value="Electricity & Utilities">Electricity & Utilities</option>
                      </>
                    ) : (
                      <>
                        <option value="Milk Sales">Milk Sales</option>
                        <option value="Livestock Sales">Livestock Sales</option>
                        <option value="Crop Harvest">Crop Harvest</option>
                        <option value="Poultry & Eggs">Poultry & Eggs</option>
                        <option value="Other Farm Income">Other Farm Income</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Amount (₨ PKR) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 45000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

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
                  <label className="text-gray-300 font-semibold block mb-1">
                    {transactionType === "expense" ? "Vendor / Supplier" : "Customer"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Punjab Feeds"
                    value={formData.vendorOrCustomer}
                    onChange={(e) => setFormData({ ...formData, vendorOrCustomer: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              {transactionType === "expense" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending (Due in 7 days)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="JazzCash / EasyPaisa">JazzCash / EasyPaisa</option>
                    </select>
                  </div>
                </div>
              )}

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
                  className={`${
                    transactionType === "expense" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                  } text-white font-bold px-5 py-1.5 rounded-lg`}
                >
                  Record Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTrackerModule;
