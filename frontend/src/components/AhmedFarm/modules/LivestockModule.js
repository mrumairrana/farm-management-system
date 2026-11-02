import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaPlus,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaStethoscope,
  FaTimes,
  FaQrcode,
  FaWeight,
  FaTint
} from "react-icons/fa";

const LivestockModule = ({ animals, setAnimals, categories }) => {
  // Filters and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Modals
  const [viewingAnimal, setViewingAnimal] = useState(null);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [idCardAnimal, setIdCardAnimal] = useState(null);
  const [medicalModalAnimal, setMedicalModalAnimal] = useState(null);
  const [weightModalAnimal, setWeightModalAnimal] = useState(null);
  const [milkModalAnimal, setMilkModalAnimal] = useState(null);
  const [deleteConfirmAnimal, setDeleteConfirmAnimal] = useState(null);

  // Weight Entry Form State
  const [weightInput, setWeightInput] = useState({ date: new Date().toISOString().split("T")[0], weight: "" });

  // Milk Entry Form State
  const [milkInput, setMilkInput] = useState({ morning: "", evening: "", fat: "4.2", grade: "A" });

  // Medical Entry Form State
  const [medInput, setMedInput] = useState({
    date: new Date().toISOString().split("T")[0],
    diagnosis: "",
    treatment: "",
    vet: "Dr. Tariq Mahmood",
    cost: 1500
  });

  // New Animal Form State
  const initialFormState = {
    animalId: "",
    name: "",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "",
    age: "",
    dob: "",
    weight: "",
    sex: "Female",
    motherId: "",
    fatherId: "",
    purchaseDate: "",
    purchasePrice: "",
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: new Date().toISOString().split("T")[0],
    milkingQuantity: 0,
    feedType: "Green Fodder + Concentrate",
    notes: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  // Auto Generate Animal ID based on Category
  const generateNewId = (category) => {
    let prefix = "AHMED-C";
    if (category.includes("Beef")) prefix = "AHMED-B";
    else if (category.includes("Sheep")) prefix = "AHMED-S";
    else if (category.includes("Goat")) prefix = "AHMED-G";
    else if (category.includes("Poultry")) prefix = "AHMED-P";
    else if (category.includes("Rabbit")) prefix = "AHMED-R";
    else if (category.includes("Pig")) prefix = "AHMED-PG";

    const nextNum = Math.floor(100 + Math.random() * 900);
    return `${prefix}${nextNum}`;
  };

  // Open Add Modal with generated ID
  const handleOpenAdd = () => {
    setFormData({
      ...initialFormState,
      animalId: generateNewId("Dairy Cattle")
    });
    setIsAddModalOpen(true);
  };

  // Handle Form Submission (Add)
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.breed || !formData.weight) {
      alert("Please fill in required fields: Name, Breed, Weight.");
      return;
    }

    const newAnimal = {
      ...formData,
      _id: `a_${Date.now()}`,
      weight: parseFloat(formData.weight) || 0,
      age: parseFloat(formData.age) || 1,
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      milkingQuantity: parseFloat(formData.milkingQuantity) || 0,
      weightHistory: [{ date: new Date().toISOString().split("T")[0], weight: parseFloat(formData.weight) || 0 }],
      medicalHistory: []
    };

    setAnimals([newAnimal, ...animals]);
    setIsAddModalOpen(false);
  };

  // Handle Edit Submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAnimals(
      animals.map((a) => (a.animalId === editingAnimal.animalId ? editingAnimal : a))
    );
    setEditingAnimal(null);
  };

  // Delete Action with Confirmation
  const confirmDelete = () => {
    if (deleteConfirmAnimal) {
      setAnimals(animals.filter((a) => a.animalId !== deleteConfirmAnimal.animalId));
      setDeleteConfirmAnimal(null);
    }
  };

  // Status Change Actions
  const handleStatusChange = (animalId, newStatus) => {
    setAnimals(
      animals.map((a) => (a.animalId === animalId ? { ...a, status: newStatus } : a))
    );
  };

  // Add Weight Entry Handler
  const handleAddWeightSubmit = (e) => {
    e.preventDefault();
    if (!weightInput.weight) return;
    const w = parseFloat(weightInput.weight);
    setAnimals(
      animals.map((a) => {
        if (a.animalId === weightModalAnimal.animalId) {
          const history = a.weightHistory || [];
          return {
            ...a,
            weight: w,
            weightHistory: [...history, { date: weightInput.date, weight: w }]
          };
        }
        return a;
      })
    );
    setWeightModalAnimal(null);
    setWeightInput({ date: new Date().toISOString().split("T")[0], weight: "" });
  };

  // Add Milk Entry Handler
  const handleAddMilkSubmit = (e) => {
    e.preventDefault();
    const m = parseFloat(milkInput.morning) || 0;
    const ev = parseFloat(milkInput.evening) || 0;
    const total = m + ev;
    setAnimals(
      animals.map((a) => (a.animalId === milkModalAnimal.animalId ? { ...a, milkingQuantity: total } : a))
    );
    alert(`Milking record of ${total} Liters logged for ${milkModalAnimal.name}!`);
    setMilkModalAnimal(null);
    setMilkInput({ morning: "", evening: "", fat: "4.2", grade: "A" });
  };

  // Add Medical Record Handler
  const handleAddMedSubmit = (e) => {
    e.preventDefault();
    if (!medInput.diagnosis || !medInput.treatment) return;
    setAnimals(
      animals.map((a) => {
        if (a.animalId === medicalModalAnimal.animalId) {
          const medHist = a.medicalHistory || [];
          return {
            ...a,
            lastCheckup: medInput.date,
            medicalHistory: [
              ...medHist,
              {
                date: medInput.date,
                diagnosis: medInput.diagnosis,
                treatment: medInput.treatment,
                vet: medInput.vet
              }
            ]
          };
        }
        return a;
      })
    );
    setMedicalModalAnimal(null);
    setMedInput({ date: new Date().toISOString().split("T")[0], diagnosis: "", treatment: "", vet: "Dr. Tariq Mahmood", cost: 1500 });
  };

  // Filter & Sort Pipeline
  const filteredAnimals = useMemo(() => {
    return animals
      .filter((animal) => {
        const matchesSearch =
          animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.species.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          animal.category.toLowerCase().includes(selectedCategory.toLowerCase());

        const matchesStatus =
          selectedStatus === "all" ||
          animal.status.toLowerCase() === selectedStatus.toLowerCase();

        const matchesGender =
          selectedGender === "all" ||
          animal.sex.toLowerCase() === selectedGender.toLowerCase();

        return matchesSearch && matchesCategory && matchesStatus && matchesGender;
      })
      .sort((a, b) => {
        if (sortBy === "id") {
          return sortOrder === "asc"
            ? a.animalId.localeCompare(b.animalId)
            : b.animalId.localeCompare(a.animalId);
        }
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sortBy === "age") {
          return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
        }
        if (sortBy === "weight") {
          return sortOrder === "asc" ? a.weight - b.weight : b.weight - a.weight;
        }
        return 0;
      });
  }, [animals, searchTerm, selectedCategory, selectedStatus, selectedGender, sortBy, sortOrder]);

  // Paginated Results
  const totalPages = Math.ceil(filteredAnimals.length / recordsPerPage) || 1;
  const paginatedAnimals = filteredAnimals.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#d4af37] text-gray-950 font-bold px-2 py-0.5 rounded-full">
              Livestock Census
            </span>
            <span className="text-xs text-gray-400">Total Registered: {animals.length} Heads</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            🐄 LIVESTOCK <span className="text-[#52b788]">MANAGEMENT</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Individual animal profiles, pedigree lineage records, digital ID badges, and health monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Register New Animal
          </button>
        </div>
      </div>

      {/* ANIMAL CATEGORIES WITH COUNTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name.toLowerCase();
          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(isSelected ? "all" : cat.name.toLowerCase());
                setCurrentPage(1);
              }}
              className={`p-3.5 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                isSelected
                  ? "bg-[#2d6a4f] border-[#d4af37] shadow-glow-green scale-105"
                  : "ahmed-glass border-emerald-500/20 hover:border-emerald-500/50 hover:bg-gray-800/60"
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs font-bold text-white truncate">{cat.name}</div>
              <div className="text-lg font-extrabold text-[#d4af37] mt-0.5">
                {cat.count} <span className="text-[10px] text-gray-300 font-normal">{cat.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH, FILTER & SORT CONTROLS */}
      <div className="ahmed-glass p-4 rounded-xl border border-emerald-500/20 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search by Name, Tag ID, Breed, Species..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-900/90 text-white pl-8 pr-3 py-2 rounded-xl text-xs border border-gray-700 focus:border-[#52b788] focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-900/90 text-white px-3 py-2 rounded-xl text-xs border border-gray-700 focus:border-[#52b788] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="sick">Sick / Observation</option>
              <option value="sold">Sold</option>
              <option value="deceased">Deceased</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <select
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-900/90 text-white px-3 py-2 rounded-xl text-xs border border-gray-700 focus:border-[#52b788] focus:outline-none"
            >
              <option value="all">All Genders</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-900/90 text-white px-3 py-2 rounded-xl text-xs border border-gray-700 focus:border-[#52b788] focus:outline-none"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="weight">Sort by Weight</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-xl text-xs text-[#d4af37] font-bold border border-gray-700"
              title="Toggle Sort Order"
            >
              {sortOrder === "asc" ? "▲" : "▼"}
            </button>
          </div>
        </div>
      </div>

      {/* ANIMAL RECORDS TABLE */}
      <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Tag ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category / Species</th>
                <th className="py-3 px-4">Breed</th>
                <th className="py-3 px-4">Age / DOB</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Health</th>
                <th className="py-3 px-4">Last Checkup</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {paginatedAnimals.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-gray-400">
                    No animal records found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedAnimals.map((animal) => (
                  <tr key={animal.animalId} className="hover:bg-gray-800/40 transition duration-150">
                    <td className="py-3 px-4 font-mono font-bold text-[#d4af37]">
                      {animal.animalId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {animal.name}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      <div>{animal.category}</div>
                      <span className="text-[10px] text-gray-400">{animal.species}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{animal.breed}</td>
                    <td className="py-3 px-4 text-gray-300">{animal.age} yrs</td>
                    <td className="py-3 px-4 font-semibold text-emerald-400">
                      {animal.weight} kg
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          animal.status === "Active"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : animal.status === "Sick"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : animal.status === "Sold"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {animal.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          animal.healthStatus === "Healthy"
                            ? "text-emerald-300"
                            : "text-amber-300"
                        }`}
                      >
                        {animal.healthStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{animal.lastCheckup}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {/* View Profile */}
                        <button
                          onClick={() => setViewingAnimal(animal)}
                          className="p-1.5 bg-gray-800 hover:bg-emerald-600 text-gray-300 hover:text-white rounded-lg transition"
                          title="View Full Profile"
                        >
                          <FaEye />
                        </button>

                        {/* ID Card Badge */}
                        <button
                          onClick={() => setIdCardAnimal(animal)}
                          className="p-1.5 bg-gray-800 hover:bg-[#d4af37] text-gray-300 hover:text-gray-950 rounded-lg transition"
                          title="Print Animal ID Card Badge"
                        >
                          <FaQrcode />
                        </button>

                        {/* Add Weight */}
                        <button
                          onClick={() => setWeightModalAnimal(animal)}
                          className="p-1.5 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition text-[11px]"
                          title="Add Weight Entry"
                        >
                          <FaWeight />
                        </button>

                        {/* Add Milk (if Dairy) */}
                        {animal.category.includes("Dairy") && (
                          <button
                            onClick={() => setMilkModalAnimal(animal)}
                            className="p-1.5 bg-gray-800 hover:bg-cyan-600 text-cyan-300 hover:text-white rounded-lg transition text-[11px]"
                            title="Log Daily Milk Yield"
                          >
                            <FaTint />
                          </button>
                        )}

                        {/* Medical Log */}
                        <button
                          onClick={() => setMedicalModalAnimal(animal)}
                          className="p-1.5 bg-gray-800 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg transition"
                          title="Add Medical Examination"
                        >
                          <FaStethoscope />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => setEditingAnimal({ ...animal })}
                          className="p-1.5 bg-gray-800 hover:bg-amber-600 text-gray-300 hover:text-white rounded-lg transition"
                          title="Edit Details"
                        >
                          <FaEdit />
                        </button>

                        {/* Mark Sold / Deceased Dropdown or Delete */}
                        <button
                          onClick={() => setDeleteConfirmAnimal(animal)}
                          className="p-1.5 bg-gray-800 hover:bg-red-700 text-gray-300 hover:text-white rounded-lg transition"
                          title="Delete Record"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Records Count Footer */}
        <div className="p-4 bg-[#131324] border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <div>
            Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
            {Math.min(currentPage * recordsPerPage, filteredAnimals.length)} of{" "}
            {filteredAnimals.length} animal records
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
                className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white hover:bg-gray-700"
              >
                Prev
              </button>
              <span className="px-2 font-bold text-[#d4af37]">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 text-white hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmAnimal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-red-500/40 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-2xl mx-auto">
              <FaTrash />
            </div>
            <h3 className="text-base font-bold text-white">
              Delete Animal Record?
            </h3>
            <p className="text-xs text-gray-300">
              Are you sure you want to delete{" "}
              <strong>{deleteConfirmAnimal.name} ({deleteConfirmAnimal.animalId})</strong>?
              <br />
              <span className="text-[#d4af37] font-semibold mt-1 block">
                — Ahmed Farm System
              </span>
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmAnimal(null)}
                className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD WEIGHT ENTRY MODAL */}
      {weightModalAnimal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-blue-500/40 shadow-2xl relative">
            <button
              onClick={() => setWeightModalAnimal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FaWeight className="text-blue-400" /> Log Weight: {weightModalAnimal.name}
            </h3>
            <form onSubmit={handleAddWeightSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Weighing Date</label>
                <input
                  type="date"
                  value={weightInput.date}
                  onChange={(e) => setWeightInput({ ...weightInput, date: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">New Weight (kg)</label>
                <input
                  type="number"
                  placeholder={`Current: ${weightModalAnimal.weight} kg`}
                  value={weightInput.weight}
                  onChange={(e) => setWeightInput({ ...weightInput, weight: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold text-sm text-emerald-400"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWeightModalAnimal(null)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-lg"
                >
                  Save Weight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MILK RECORD MODAL */}
      {milkModalAnimal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-cyan-500/40 shadow-2xl relative">
            <button
              onClick={() => setMilkModalAnimal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FaTint className="text-cyan-400" /> Log Daily Milk: {milkModalAnimal.name}
            </h3>
            <form onSubmit={handleAddMilkSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 block mb-1">Morning (L)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 7.5"
                    value={milkInput.morning}
                    onChange={(e) => setMilkInput({ ...milkInput, morning: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Evening (L)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 6.5"
                    value={milkInput.evening}
                    onChange={(e) => setMilkInput({ ...milkInput, evening: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 block mb-1">Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={milkInput.fat}
                    onChange={(e) => setMilkInput({ ...milkInput, fat: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Quality</label>
                  <select
                    value={milkInput.grade}
                    onChange={(e) => setMilkInput({ ...milkInput, grade: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="A">Grade A (Premium)</option>
                    <option value="B">Grade B (Standard)</option>
                    <option value="C">Grade C</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMilkModalAnimal(null)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-1.5 rounded-lg"
                >
                  Save Milk Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEDICAL RECORD MODAL */}
      {medicalModalAnimal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-rose-500/40 shadow-2xl relative text-xs">
            <button
              onClick={() => setMedicalModalAnimal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-base"
            >
              <FaTimes />
            </button>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FaStethoscope className="text-rose-400" /> Log Medical Exam: {medicalModalAnimal.name}
            </h3>
            <form onSubmit={handleAddMedSubmit} className="space-y-3">
              <div>
                <label className="text-gray-300 block mb-1">Examination Date</label>
                <input
                  type="date"
                  value={medInput.date}
                  onChange={(e) => setMedInput({ ...medInput, date: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Clinical Diagnosis *</label>
                <input
                  type="text"
                  placeholder="e.g. Routine vaccination / Foot rot inspection"
                  value={medInput.diagnosis}
                  onChange={(e) => setMedInput({ ...medInput, diagnosis: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Treatment / Medicine Prescribed *</label>
                <input
                  type="text"
                  placeholder="e.g. Oxytetracycline 20% + Multivitamin booster"
                  value={medInput.treatment}
                  onChange={(e) => setMedInput({ ...medInput, treatment: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 block mb-1">Attending Vet</label>
                  <input
                    type="text"
                    value={medInput.vet}
                    onChange={(e) => setMedInput({ ...medInput, vet: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Cost (₨)</label>
                  <input
                    type="number"
                    value={medInput.cost}
                    onChange={(e) => setMedInput({ ...medInput, cost: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMedicalModalAnimal(null)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-1.5 rounded-lg"
                >
                  Save Medical Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW FULL PROFILE MODAL */}
      {viewingAnimal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="ahmed-glass p-6 md:p-8 rounded-2xl max-w-2xl w-full border border-emerald-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewingAnimal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] border border-[#d4af37] flex items-center justify-center text-3xl shadow-glow-gold">
                🐄
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {viewingAnimal.name}
                </h3>
                <span className="font-mono text-sm text-[#d4af37] font-bold">
                  {viewingAnimal.animalId}
                </span>
                <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  {viewingAnimal.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Breed</span>
                <strong className="text-white">{viewingAnimal.breed}</strong>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Age & Gender</span>
                <strong className="text-white">{viewingAnimal.age} yrs • {viewingAnimal.sex}</strong>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Current Weight</span>
                <strong className="text-emerald-400">{viewingAnimal.weight} kg</strong>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Mother / Dam ID</span>
                <strong className="text-amber-300">{viewingAnimal.motherId || "N/A"}</strong>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Father / Sire ID</span>
                <strong className="text-amber-300">{viewingAnimal.fatherId || "N/A"}</strong>
              </div>
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Purchase Price</span>
                <strong className="text-white">₨{viewingAnimal.purchasePrice?.toLocaleString()}</strong>
              </div>
            </div>

            {/* Quick Status Modifiers */}
            <div className="flex items-center gap-2 mb-4 bg-gray-900/40 p-3 rounded-xl border border-gray-800 text-xs">
              <span className="text-gray-400 font-bold">Update Status:</span>
              <button
                onClick={() => handleStatusChange(viewingAnimal.animalId, "Active")}
                className="px-2.5 py-1 rounded bg-emerald-600/40 hover:bg-emerald-600 text-emerald-300 hover:text-white"
              >
                Mark Active
              </button>
              <button
                onClick={() => handleStatusChange(viewingAnimal.animalId, "Sold")}
                className="px-2.5 py-1 rounded bg-amber-600/40 hover:bg-amber-600 text-amber-300 hover:text-white"
              >
                Mark Sold
              </button>
              <button
                onClick={() => handleStatusChange(viewingAnimal.animalId, "Deceased")}
                className="px-2.5 py-1 rounded bg-red-600/40 hover:bg-red-600 text-red-300 hover:text-white"
              >
                Mark Deceased
              </button>
            </div>

            {/* Weight History */}
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase text-gray-300 mb-2">Weight History Track</h4>
              <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 flex gap-4 overflow-x-auto text-xs">
                {(viewingAnimal.weightHistory || []).map((w, idx) => (
                  <div key={idx} className="text-center min-w-[70px] bg-gray-800/60 p-2 rounded-lg">
                    <div className="text-[10px] text-gray-400">{w.date}</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{w.weight} kg</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800 text-xs text-gray-300">
              <span className="font-bold text-white block mb-1">Veterinary & Care Notes:</span>
              {viewingAnimal.notes || "No additional notes logged for this animal."}
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE ID CARD BADGE MODAL */}
      {idCardAnimal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-sm w-full border border-[#d4af37]/40 shadow-2xl relative text-center">
            <button
              onClick={() => setIdCardAnimal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            {/* The ID Card Preview */}
            <div className="bg-[#121224] p-5 rounded-2xl border-2 border-[#d4af37] shadow-xl text-left relative overflow-hidden print-area">
              <div className="flex justify-between items-start border-b border-[#d4af37]/40 pb-3 mb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-white tracking-wide">
                    🌾 AHMED FARM
                  </h4>
                  <p className="text-[9px] text-[#d4af37] font-semibold">
                    OFFICIAL LIVESTOCK REGISTRY
                  </p>
                </div>
                <div className="text-xl">🐄</div>
              </div>

              <div className="flex gap-3 items-center mb-3">
                <div className="w-16 h-16 rounded-xl bg-gray-800 border border-emerald-500/40 flex items-center justify-center text-2xl shrink-0">
                  🐂
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{idCardAnimal.name}</h3>
                  <div className="font-mono text-xs text-amber-400 font-black">
                    {idCardAnimal.animalId}
                  </div>
                  <div className="text-[10px] text-gray-300">
                    {idCardAnimal.breed} • {idCardAnimal.sex}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-gray-900/90 p-2.5 rounded-lg border border-gray-800 mb-3">
                <div>Age: <strong>{idCardAnimal.age} Years</strong></div>
                <div>Weight: <strong className="text-emerald-400">{idCardAnimal.weight} kg</strong></div>
                <div>Dam (Mother): <strong>{idCardAnimal.motherId || "N/A"}</strong></div>
                <div>Sire (Father): <strong>{idCardAnimal.fatherId || "N/A"}</strong></div>
              </div>

              {/* Simulated QR Code */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-[9px] text-gray-400">
                <div>
                  <div>Issue: {idCardAnimal.lastCheckup}</div>
                  <div className="text-emerald-400 font-bold">Vaccine: Certified</div>
                </div>
                <div className="w-12 h-12 bg-white rounded p-1 flex items-center justify-center text-gray-950 font-mono text-[8px] font-black">
                  [QR-ID]
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-4 bg-[#d4af37] hover:bg-yellow-400 text-gray-950 font-bold text-xs px-6 py-2.5 rounded-xl transition flex items-center justify-center gap-2 mx-auto shadow-glow-gold"
            >
              <FaPrint /> Print Official Badge
            </button>
          </div>
        </div>
      )}

      {/* ADD / EDIT ANIMAL MODAL */}
      {(isAddModalOpen || editingAnimal) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="ahmed-glass p-6 rounded-2xl max-w-xl w-full border border-emerald-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingAnimal(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
              <FaPlus className="text-emerald-400" />
              {editingAnimal ? "Edit Animal Record" : "Register New Animal"}
            </h3>

            <form
              onSubmit={editingAnimal ? handleEditSubmit : handleAddSubmit}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Tag ID *</label>
                  <input
                    type="text"
                    value={editingAnimal ? editingAnimal.animalId : formData.animalId}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, animalId: e.target.value })
                        : setFormData({ ...formData, animalId: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Name / Identifier *</label>
                  <input
                    type="text"
                    placeholder="e.g. Gulabi"
                    value={editingAnimal ? editingAnimal.name : formData.name}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, name: e.target.value })
                        : setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Category</label>
                  <select
                    value={editingAnimal ? editingAnimal.category : formData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      if (editingAnimal) {
                        setEditingAnimal({ ...editingAnimal, category: cat });
                      } else {
                        setFormData({
                          ...formData,
                          category: cat,
                          animalId: generateNewId(cat)
                        });
                      }
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Breed *</label>
                  <input
                    type="text"
                    placeholder="e.g. Sahiwal / Beetal"
                    value={editingAnimal ? editingAnimal.breed : formData.breed}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, breed: e.target.value })
                        : setFormData({ ...formData, breed: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="3.5"
                    value={editingAnimal ? editingAnimal.age : formData.age}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, age: e.target.value })
                        : setFormData({ ...formData, age: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Weight (kg) *</label>
                  <input
                    type="number"
                    placeholder="420"
                    value={editingAnimal ? editingAnimal.weight : formData.weight}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, weight: e.target.value })
                        : setFormData({ ...formData, weight: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-400 font-bold"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Gender</label>
                  <select
                    value={editingAnimal ? editingAnimal.sex : formData.sex}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, sex: e.target.value })
                        : setFormData({ ...formData, sex: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Dam (Mother ID)</label>
                  <input
                    type="text"
                    placeholder="e.g. AHMED-C000M"
                    value={editingAnimal ? editingAnimal.motherId : formData.motherId}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, motherId: e.target.value })
                        : setFormData({ ...formData, motherId: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Sire (Father ID)</label>
                  <input
                    type="text"
                    placeholder="e.g. AHMED-B001F"
                    value={editingAnimal ? editingAnimal.fatherId : formData.fatherId}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, fatherId: e.target.value })
                        : setFormData({ ...formData, fatherId: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Purchase Price (₨)</label>
                  <input
                    type="number"
                    placeholder="250000"
                    value={editingAnimal ? editingAnimal.purchasePrice : formData.purchasePrice}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, purchasePrice: e.target.value })
                        : setFormData({ ...formData, purchasePrice: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Current Status</label>
                  <select
                    value={editingAnimal ? editingAnimal.status : formData.status}
                    onChange={(e) =>
                      editingAnimal
                        ? setEditingAnimal({ ...editingAnimal, status: e.target.value })
                        : setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Sick">Sick / In Treatment</option>
                    <option value="Sold">Sold</option>
                    <option value="Deceased">Deceased</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingAnimal(null);
                  }}
                  className="bg-gray-800 text-white px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-6 py-2 rounded-xl shadow-glow-green"
                >
                  {editingAnimal ? "Save Changes" : "Register Animal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockModule;
