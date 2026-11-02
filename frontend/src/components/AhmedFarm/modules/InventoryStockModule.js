import React, { useState } from "react";
import {
  FaWarehouse,
  FaPlus,
  FaExclamationTriangle,
  FaTimes
} from "react-icons/fa";

const InventoryStockModule = ({ inventory, setInventory }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [restockModalItem, setRestockModalItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Animal Feed",
    quantity: "",
    unit: "Bags (50kg)",
    minThreshold: 20,
    unitCost: "",
    location: "Feed Silo Alpha",
    supplier: "Punjab Agro"
  });

  const totalValuation = inventory.reduce(
    (acc, item) => acc + (parseFloat(item.quantity) || 0) * (parseFloat(item.unitCost) || 0),
    0
  );

  const lowStockCount = inventory.filter((item) => item.quantity <= item.minThreshold).length;

  const filteredInventory = inventory.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.unitCost) {
      alert("Please fill in required fields: Item Name, Quantity, and Unit Cost.");
      return;
    }

    const qty = parseFloat(formData.quantity) || 0;
    const thresh = parseFloat(formData.minThreshold) || 10;

    const newItem = {
      id: `inv_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      quantity: qty,
      unit: formData.unit,
      minThreshold: thresh,
      unitCost: parseFloat(formData.unitCost) || 0,
      status: qty <= thresh ? "Low Stock" : "In Stock",
      location: formData.location,
      supplier: formData.supplier
    };

    setInventory([newItem, ...inventory]);
    setIsAddModalOpen(false);
  };

  const handleRestock = (itemId, additionalQty) => {
    const qty = parseFloat(additionalQty) || 0;
    setInventory(
      inventory.map((item) => {
        if (item.id === itemId) {
          const newTotal = item.quantity + qty;
          return {
            ...item,
            quantity: newTotal,
            status: newTotal <= item.minThreshold ? "Low Stock" : "In Stock"
          };
        }
        return item;
      })
    );
    setRestockModalItem(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
              Silo & Warehouse Management
            </span>
            <span className="text-xs text-gray-400">Total Stock Valuation: ₨{totalValuation.toLocaleString()}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            📦 INVENTORY & <span className="text-emerald-400">STOCK CONTROL</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Feed reserves, crop seeds, agricultural fertilizers, veterinary pharmaceuticals, and restock automations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Add Stock Item
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Stock Items</span>
          <div className="text-3xl font-extrabold text-white mt-2">{inventory.length} SKUs</div>
          <p className="text-[11px] text-emerald-400 mt-1">Feed, Seeds, Fertilizers & Meds</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-amber-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Low Stock Alerts</span>
          <div className="text-3xl font-extrabold text-amber-300 mt-2">{lowStockCount} Items</div>
          <p className="text-[11px] text-amber-400 mt-1">Below minimum re-order threshold</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-blue-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Inventory Value</span>
          <div className="text-3xl font-extrabold text-[#d4af37] mt-2">
            ₨{(totalValuation / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-gray-300 mt-1">Current assets valuation</p>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-purple-500/20">
          <span className="text-xs font-semibold text-gray-400 uppercase">Storage Locations</span>
          <div className="text-3xl font-extrabold text-purple-300 mt-2">5 Bays</div>
          <p className="text-[11px] text-purple-300 mt-1">Silos, Barn 3, Cold Vault, Fuel Tank</p>
        </div>
      </div>

      {/* LOW STOCK BANNER (if any) */}
      {lowStockCount > 0 && (
        <div className="ahmed-glass-gold p-4 rounded-xl border border-amber-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-amber-400 text-2xl shrink-0 animate-pulse" />
            <div>
              <h4 className="font-bold text-amber-300 text-sm">Low Inventory Warning Triggered</h4>
              <p className="text-xs text-gray-200">
                {lowStockCount} items have fallen below safety buffer levels (DAP Fertilizer, Diesel, FMD Vaccine).
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-400 text-gray-950 font-bold px-3 py-1 rounded-full">
            Action Required
          </span>
        </div>
      )}

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 text-xs flex-wrap">
        {["all", "Animal Feed", "Roughage", "Fertilizer", "Veterinary Medicine", "Fuel", "Seeds", "Dairy Equipment"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
                : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            {cat === "all" ? "All Inventory" : cat}
          </button>
        ))}
      </div>

      {/* INVENTORY TABLE */}
      <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Min Buffer</th>
                <th className="py-3 px-4">Unit Cost</th>
                <th className="py-3 px-4">Total Value</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                  <td className="py-3 px-4 text-gray-300">{item.category}</td>
                  <td className="py-3 px-4 font-mono font-extrabold text-sm text-amber-300">
                    {item.quantity} <span className="text-[10px] font-normal text-gray-400">{item.unit}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{item.minThreshold} {item.unit}</td>
                  <td className="py-3 px-4 text-gray-300">₨{item.unitCost?.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-400">
                    ₨{(item.quantity * item.unitCost)?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-[11px]">{item.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Low Stock"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setRestockModalItem(item)}
                      className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition"
                    >
                      + Refill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESTOCK MODAL */}
      {restockModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-emerald-500/40 shadow-2xl relative">
            <button
              onClick={() => setRestockModalItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-base font-extrabold text-white mb-2">
              Refill Stock: <span className="text-amber-300">{restockModalItem.name}</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Current stock: {restockModalItem.quantity} {restockModalItem.unit}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const qty = e.target.refillAmount.value;
                handleRestock(restockModalItem.id, qty);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-gray-300 font-semibold block mb-1">
                  Additional Quantity to Ingest ({restockModalItem.unit})
                </label>
                <input
                  type="number"
                  name="refillAmount"
                  required
                  placeholder="e.g. 50"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockModalItem(null)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ITEM MODAL */}
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
              <FaWarehouse className="text-emerald-400" /> Add New Inventory Item
            </h3>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Item Description *</label>
                <input
                  type="text"
                  placeholder="e.g. Super Potash Foliar Grade"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <option value="Animal Feed">Animal Feed</option>
                    <option value="Roughage">Roughage</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Veterinary Medicine">Veterinary Medicine</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Dairy Equipment">Dairy Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    placeholder="e.g. Bags (50kg) / Liters"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Quantity *</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Min Buffer</label>
                  <input
                    type="number"
                    value={formData.minThreshold}
                    onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Unit Cost (₨)</label>
                  <input
                    type="number"
                    value={formData.unitCost}
                    onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Storage Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Silo Beta / Store 2"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Supplier</label>
                  <input
                    type="text"
                    placeholder="e.g. Fauji Fertilizer"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-1.5 rounded-lg"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryStockModule;
