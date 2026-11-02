import React, { useState } from "react";
import {
  FaBell,
  FaCheckDouble,
  FaTrash,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight
} from "react-icons/fa";

const NotificationsModule = ({ notifications, setNotifications, onNavigateModule }) => {
  const [filterSeverity, setFilterSeverity] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter(
    (n) => filterSeverity === "all" || n.severity === filterSeverity
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full">
              Alerts & Notifications Hub
            </span>
            <span className="text-xs text-gray-400">{unreadCount} Unread Notifications</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            🔔 NOTIFICATIONS <span className="text-amber-400">CENTER</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Real-time farm event dispatch, low stock triggers, medical warnings, and environmental advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-gray-800 hover:bg-gray-700 text-emerald-400 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-gray-700"
            >
              <FaCheckDouble /> Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 text-xs flex-wrap">
        {["all", "critical", "warning", "info", "success"].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition capitalize ${
              filterSeverity === sev
                ? "bg-[#2d6a4f] text-white border border-[#d4af37]"
                : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            {sev === "all" ? "All Alerts" : sev}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="ahmed-glass p-8 rounded-2xl border border-gray-800 text-center text-gray-400">
            <FaBell className="text-3xl mx-auto mb-2 text-gray-600" />
            <p>No notifications under this filter category.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`ahmed-glass p-4 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 ${
                !notif.read
                  ? "border-emerald-500/50 bg-emerald-950/20 shadow-glow-green"
                  : "border-gray-800/80 bg-gray-900/40"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 mt-0.5 ${
                    notif.severity === "critical"
                      ? "bg-rose-500/20 text-rose-400"
                      : notif.severity === "warning"
                      ? "bg-amber-500/20 text-amber-400"
                      : notif.severity === "success"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {notif.severity === "critical" ? (
                    <FaExclamationCircle />
                  ) : notif.severity === "warning" ? (
                    <FaExclamationTriangle />
                  ) : notif.severity === "success" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaInfoCircle />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{notif.title}</h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5">{notif.message}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {notif.linkModule && (
                  <button
                    onClick={() => {
                      markAsRead(notif.id);
                      onNavigateModule(notif.linkModule);
                    }}
                    className="bg-[#2d6a4f] hover:bg-[#52b788] hover:text-gray-950 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    Open <FaArrowRight className="text-[10px]" />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-2 text-gray-500 hover:text-rose-400 transition text-xs"
                  title="Dismiss notification"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsModule;
