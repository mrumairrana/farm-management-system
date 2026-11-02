import React, { useState } from "react";
import {
  FaClipboardList,
  FaPlus,
  FaUser,
  FaTimes
} from "react-icons/fa";

const TaskManagementModule = ({ tasks, setTasks, staff }) => {
  const [viewMode, setViewMode] = useState("kanban"); // kanban, list
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Dairy",
    priority: "High",
    status: "Pending",
    dueDate: new Date().toISOString().split("T")[0],
    assignee: "Rashid Ali",
    description: ""
  });

  const pendingTasks = tasks.filter((t) => t.status === "Pending");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const completedTasks = tasks.filter((t) => t.status === "Done");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please enter Task Title.");
      return;
    }

    const newTask = {
      id: `t_${Date.now()}`,
      ...formData
    };

    setTasks([newTask, ...tasks]);
    setIsAddModalOpen(false);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full">
              Operational Task Pipeline
            </span>
            <span className="text-xs text-gray-400">Total Active Operations: {tasks.length}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            📋 TASK <span className="text-purple-400">MANAGEMENT</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Real-time farm chores, urgent veterinarian alerts, agronomy assignments, and completion tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-900 border border-gray-700 p-1 rounded-xl text-xs">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === "kanban" ? "bg-[#2d6a4f] text-white" : "text-gray-400"
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === "list" ? "bg-[#2d6a4f] text-white" : "text-gray-400"
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 border border-emerald-400/30 text-sm shadow-glow-green"
          >
            <FaPlus /> Create Task
          </button>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Pending */}
          <div className="ahmed-glass p-4 rounded-2xl border border-gray-700/60 flex flex-col">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-800">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Pending ({pendingTasks.length})
              </h3>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="ahmed-glass p-4 rounded-2xl border border-blue-500/20 flex flex-col">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-800">
              <h3 className="font-bold text-blue-300 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" /> In Progress ({inProgressTasks.length})
              </h3>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
              ))}
            </div>
          </div>

          {/* Column 3: Completed */}
          <div className="ahmed-glass p-4 rounded-2xl border border-emerald-500/20 flex flex-col">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-800">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Completed ({completedTasks.length})
              </h3>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-[#131324] text-gray-300 font-semibold border-b border-emerald-500/20 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Task Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4 text-center">Move Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      task.status === "Done"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : task.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{task.title}</div>
                    <div className="text-[10px] text-gray-400">{task.description}</div>
                  </td>
                  <td className="py-3 px-4">{task.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === "Urgent" ? "bg-red-600 text-white" : task.priority === "High" ? "bg-amber-500 text-black" : "bg-gray-700 text-gray-300"
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{task.dueDate}</td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">{task.assignee}</td>
                  <td className="py-3 px-4 text-center space-x-1">
                    <button
                      onClick={() => handleUpdateStatus(task.id, "Pending")}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(task.id, "In Progress")}
                      className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                    >
                      Progress
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(task.id, "Done")}
                      className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded"
                    >
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD TASK MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ahmed-glass p-6 rounded-2xl max-w-md w-full border border-purple-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
              <FaClipboardList className="text-purple-400" /> Create Operation Task
            </h3>

            <form onSubmit={handleAddTask} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Task Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Plot B Fertilizer Drip"
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
                    <option value="Dairy">Dairy</option>
                    <option value="Veterinary">Veterinary</option>
                    <option value="Crops">Crops</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Management">Management</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Assignee</label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.role.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Instructions / Description</label>
                <textarea
                  rows="2"
                  placeholder="Task guidance and details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-1.5 rounded-lg"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskCard = ({ task, onUpdateStatus }) => {
  return (
    <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800 hover:border-gray-700 transition">
      <div className="flex justify-between items-start mb-1.5">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
          task.priority === "Urgent" ? "bg-red-600 text-white animate-pulse" : task.priority === "High" ? "bg-amber-500/20 text-amber-300" : "bg-gray-800 text-gray-400"
        }`}>
          {task.priority}
        </span>
        <span className="text-[10px] text-gray-400">{task.category}</span>
      </div>

      <h4 className="font-bold text-white text-xs mb-1">{task.title}</h4>
      <p className="text-[11px] text-gray-400 mb-2.5">{task.description}</p>

      <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-800/80 pt-2">
        <div className="flex items-center gap-1 text-emerald-300 font-medium">
          <FaUser className="text-[9px]" /> {task.assignee}
        </div>
        <div>Due: {task.dueDate}</div>
      </div>

      {/* Move Buttons */}
      <div className="flex justify-end gap-1.5 mt-2 pt-1 border-t border-gray-800/50">
        {task.status !== "Pending" && (
          <button
            onClick={() => onUpdateStatus(task.id, "Pending")}
            className="text-[9px] bg-gray-800 text-gray-300 hover:text-white px-2 py-0.5 rounded"
          >
            ← Pending
          </button>
        )}
        {task.status !== "In Progress" && (
          <button
            onClick={() => onUpdateStatus(task.id, "In Progress")}
            className="text-[9px] bg-blue-600/40 text-blue-300 hover:bg-blue-600 px-2 py-0.5 rounded"
          >
            In Progress
          </button>
        )}
        {task.status !== "Done" && (
          <button
            onClick={() => onUpdateStatus(task.id, "Done")}
            className="text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded font-bold"
          >
            ✓ Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskManagementModule;
