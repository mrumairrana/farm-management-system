import React, { useState } from "react";
import {
  FaSun,
  FaWind,
  FaTint,
  FaTemperatureHigh,
  FaLightbulb,
  FaSearch,
  FaHeartbeat
} from "react-icons/fa";
import { initialWeatherLogs } from "../data/initialFarmData";

const WeatherLogModule = ({ weather }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const current = weather.current || {
    temp: 32,
    condition: "Sunny & Clear",
    icon: "☀️",
    humidity: 48,
    windSpeed: "14 km/h (NE)",
    uvIndex: "8 (Very High)",
    soilMoisture: "56%",
    soilTemp: "28°C",
    precipitationChance: "5%",
    airQuality: "Good (AQI 42)",
    sprayAdvisory: "Ideal spraying conditions between 06:00 - 09:30 AM before wind picks up."
  };

  const forecast = weather.forecast || [];
  const weatherLogs = initialWeatherLogs || [];

  const filteredLogs = weatherLogs.filter(
    (log) =>
      log.date.includes(searchTerm) ||
      log.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.cropImpact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogs.length / recordsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="ahmed-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
              Meteorological Telemetry
            </span>
            <span className="text-xs text-gray-400">Mianwali Agro Station Alpha Online</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            🌦️ WEATHER & <span className="text-yellow-400">AGRO CLIMATE LOG</span>
          </h1>
          <p className="text-gray-300 text-xs mt-0.5">
            Micro-climate tracking, soil temperature probes, heat-stress prevention, and 30-day agro-weather logs.
          </p>
        </div>

        <div className="bg-gray-900/80 border border-amber-500/30 px-4 py-2 rounded-xl flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-300 font-semibold">Sensor Array Live</span>
        </div>
      </div>

      {/* CURRENT LIVE READOUT HERO */}
      <div className="ahmed-glass p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#1a1a2e] via-[#1b4332]/40 to-[#1a1a2e] shadow-glass relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 flex items-center gap-6">
            <div className="text-7xl">{current.icon}</div>
            <div>
              <div className="text-5xl font-black text-[#d4af37] tracking-tight">{current.temp}°C</div>
              <div className="text-base font-bold text-white mt-0.5">{current.condition}</div>
              <p className="text-xs text-gray-300">Feels like: 34°C • Mianwali Punjab</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
              <div className="text-gray-400 flex items-center gap-1 mb-1">
                <FaTint className="text-blue-400" /> Humidity
              </div>
              <div className="text-lg font-bold text-white">{current.humidity}%</div>
              <span className="text-[10px] text-emerald-400">Comfortable</span>
            </div>

            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
              <div className="text-gray-400 flex items-center gap-1 mb-1">
                <FaWind className="text-teal-400" /> Wind
              </div>
              <div className="text-lg font-bold text-white">{current.windSpeed}</div>
              <span className="text-[10px] text-gray-400">Gentle Breeze</span>
            </div>

            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
              <div className="text-gray-400 flex items-center gap-1 mb-1">
                <FaSun className="text-amber-400" /> UV Index
              </div>
              <div className="text-lg font-bold text-amber-300">{current.uvIndex}</div>
              <span className="text-[10px] text-amber-400">High Protection</span>
            </div>

            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
              <div className="text-gray-400 flex items-center gap-1 mb-1">
                <FaTemperatureHigh className="text-emerald-400" /> Soil Temp
              </div>
              <div className="text-lg font-bold text-emerald-300">{current.soilTemp}</div>
              <span className="text-[10px] text-emerald-400">Moisture: {current.soilMoisture}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HEAT STRESS & SPRAY ADVISORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="ahmed-glass p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
          <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2 mb-2">
            <FaLightbulb /> Field Spraying & Fertilizer Advisory
          </h3>
          <p className="text-xs text-gray-200 leading-relaxed">
            {current.sprayAdvisory}
          </p>
          <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Plot C Cotton Drone Spreading Window: 06:30 - 08:30 AM.
          </div>
        </div>

        <div className="ahmed-glass p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20">
          <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2 mb-2">
            <FaHeartbeat className="text-amber-400" /> Livestock Heat Stress Prevention Protocol
          </h3>
          <p className="text-xs text-gray-200 leading-relaxed">
            Ambient afternoon temperature expected to reach 34°C. Automatic misting fans activated in Dairy Shed 1 and 2. Fresh electrolyte mineral water verified in all drinking troughs.
          </p>
          <div className="mt-3 text-[11px] text-amber-300 flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Heat Index: Normal (Below 35°C Alert Threshold)
          </div>
        </div>
      </div>

      {/* 5-DAY AGRO FORECAST */}
      <div className="ahmed-glass rounded-2xl border border-emerald-500/20 p-5 shadow-glass">
        <h3 className="font-bold text-white text-sm mb-4">
          5-Day Agricultural Extended Forecast
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {forecast.map((f, idx) => (
            <div
              key={idx}
              className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 text-center flex flex-col justify-between items-center"
            >
              <div className="text-xs font-bold text-amber-300">{f.day}</div>
              <div className="text-4xl my-2">{f.icon}</div>
              <div className="text-sm font-extrabold text-white">
                {f.tempMax}° / <span className="text-gray-400 font-normal text-xs">{f.tempMin}°</span>
              </div>
              <div className="text-[11px] text-gray-300 mt-1">{f.condition}</div>
              <div className="text-[10px] text-blue-400 font-semibold mt-1">Rain: {f.rain}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-DAY WEATHER LOG TABLE */}
      <div className="ahmed-glass rounded-2xl border border-emerald-500/20 overflow-hidden shadow-glass">
        <div className="p-4 bg-[#131324] border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="font-bold text-white text-sm">
            30-Day Agro-Meteorological History & Crop Impact Log
          </h3>

          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search weather date or condition..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-gray-900 text-white pl-8 pr-3 py-1.5 rounded-lg text-xs border border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-[#131324] text-gray-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Morning / Afternoon / Evening</th>
                <th className="py-3 px-4">Humidity</th>
                <th className="py-3 px-4">Rainfall</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4">Heat Stress</th>
                <th className="py-3 px-4">Crop Impact Notes</th>
                <th className="py-3 px-4">Animal Precautions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">{log.date}</td>
                  <td className="py-3 px-4 font-mono text-amber-300">
                    {log.morningTemp}° / <strong className="text-red-400">{log.afternoonTemp}°</strong> / {log.eveningTemp}°C
                  </td>
                  <td className="py-3 px-4 text-cyan-300">{log.humidity}%</td>
                  <td className="py-3 px-4 text-blue-400">{log.rainfall} mm</td>
                  <td className="py-3 px-4">{log.condition}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.heatStress.includes("High")
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {log.heatStress}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300 max-w-xs truncate" title={log.cropImpact}>
                    {log.cropImpact}
                  </td>
                  <td className="py-3 px-4 text-gray-400 max-w-xs truncate" title={log.animalPrecautions}>
                    {log.animalPrecautions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#131324] border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
          <div>
            Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
            {Math.min(currentPage * recordsPerPage, filteredLogs.length)} of{" "}
            {filteredLogs.length} logs
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-800 rounded text-white disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-bold text-[#d4af37] px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-800 rounded text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLogModule;
