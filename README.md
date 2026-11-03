# 🌾 AHMED FARM MANAGEMENT SYSTEM (AFMS) — Next-Gen Enterprise AgriTech OS

<p align="center">
  <img src="https://img.shields.io/badge/Status-Super%20VIP%20Production%20Ready-2d6a4f?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-MIT-d4af37?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>🌾 "Ahmed — Managing Your Farm, Maximizing Your Future"</strong><br>
  A comprehensive, full-stack, enterprise-grade Farm Management System & AgriTech operating platform designed to manage livestock census, dairy parlor milk yields, crop cultivation cycles, categorized financial ledgers, inventory supply chain, staff attendance & payroll, machinery telematics, climate telemetry, and instant PDF/CSV reporting.
</p>

<p align="center">
  <a href="#-key-features--14-core-modules">Explore Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start-installation">Quick Start</a> •
  <a href="#-10-certified-pdf-reports">PDF Engine</a> •
  <a href="#-bilingual-support-english--اردو">Bilingual</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌟 Visual Identity & Executive Design
- **Theme Palette**: Executive Nature Dark Theme (`#1a1a2e` / `#121224`), Ahmed Emerald Green (`#2d6a4f`), Mint Accent (`#52b788`), and Gold Accents (`#d4af37`).
- **Glassmorphism UI**: High-end translucent cards (`backdrop-blur-md`), glowing borders (`border-emerald-500/20`), smooth micro-animations, and responsive layouts.
- **Currency & Regionalization**: Built-in support for Pakistani Rupees (`PKR ₨`) and regional agro-climatic conditions.

---

## 🚀 Key Features & 14 Core Modules

```
🌾 AHMED FARM MANAGEMENT SYSTEM (AFMS)
├── 01. 📊 Executive Dashboard (Real-time KPIs, Recharts data analytics, rotating agro tips)
├── 02. 🐄 Livestock Management (156 heads across 7 species, pedigree lineage, printable QR ID cards)
├── 03. 🥛 Milk Production Ledger (Daily session yields, fat % testing, bulk buyer accounts)
├── 04. 🌱 Crop & Plot Agronomy (8 plots / 125 acres, soil moisture telemetry, harvest margins)
├── 05. 💰 Expense Tracker & Accounting (14 categorized disbursements, printable payment vouchers)
├── 06. 📦 Warehouse & Inventory (6 categories, automated min-stock threshold alarms, movement log)
├── 07. 👨‍🌾 Staff & Payroll Register (8 staff members, biometric-style attendance, salary slips)
├── 08. 🚜 Machinery & Fleet Telematics (Hours run, scheduled overhaul alerts, diesel telemetry)
├── 09. 📋 Kanban Chore Board (Drag-and-drop tasks, priority tags, worker assignments)
├── 10. 🩺 Veterinary & Quarantine Bay (Pen B isolation monitor, antibiotic withdrawal timers)
├── 11. 🌦️ Agro-Meteorology & Weather (32°C telemetry, heat-stress alarms, 30-day history)
├── 12. 📈 Certified PDF & CSV Reporting (10 official reports with letterhead & instant downloads)
├── 13. ⚙️ Farm Profile & Settings (Farm metadata, currency formatting, JSON backup & restore)
└── 14. 🔔 Notifications & Compliance Hub (Severity-filtered alerts with deep module links)
```

---

### 🌟 Interactive Super VIP Highlights

1. **⚡ Floating Rapid Entry Mode (`+` Button)**:
   - Always-accessible floating action button on bottom-right for instant logging of daily milk yields, expense vouchers, or worker tasks without page reloads.

2. **🌐 Bilingual Support (English & اردو)**:
   - 1-Click language toggle that instantly translates navigation labels and flips layouts to native Right-to-Left (RTL) mode for Urdu users.

3. **🪪 Printable Livestock ID Badges**:
   - Digital animal identification cards with simulated QR Code, barcode, breed genetics, parent pedigree (Dam/Sire), and vaccination tags.

4. **📄 10 Certified PDF Reports & CSV Exports**:
   - Built-in `jsPDF` & `jspdf-autotable` engine generating executive farm letterhead reports with `#2d6a4f` headers and downloadable CSV spreadsheets:
     - *1. Daily Farm Activity Report*
     - *2. Monthly Milk Production Audit*
     - *3. Monthly Expense & Disbursement Report*
     - *4. Profit & Loss Financial Statement (₨ PKR)*
     - *5. Animal Health & Quarantine Audit*
     - *6. Crop Agronomy & Harvest Yield Summary*
     - *7. Staff Attendance & Payroll Ledger*
     - *8. Farm Inventory Valuation & Stock Audit*
     - *9. Heavy Equipment Utilization Audit*
     - *10. Annual Comprehensive Farm Summary*

5. **🛡️ Universal Confirmation & LocalStorage Persistence**:
   - Accidental data loss prevention (`Are you sure? — Ahmed Farm System`).
   - Full client-side sync across browser sessions with pre-loaded 150+ realistic Pakistani agro records.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
|---|---|
| **Frontend UI/UX** | React 19, Tailwind CSS 3.4, React Icons, Glassmorphism CSS |
| **Data Visualization** | Recharts (Area, Line, Bar, Stacked Charts), Chart.js |
| **Document Generation** | jsPDF, jspdf-autotable, html2canvas |
| **Backend & APIs** | Node.js, Express.js 4.21, CORS, Dotenv |
| **Database & ODM** | MongoDB, Mongoose 8.9 (with fallback fault tolerance) |
| **AI Integration** | Google Gemini Generative AI SDK (`@google/generative-ai`) |

---

## 📥 Quick Start Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (Optional - local fallback supported)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ahmed-farm-management-system.git
cd ahmed-farm-management-system
```

### 2. Configure Backend Server
```bash
cd backend
npm install
npm start
```
> Server will start on `http://localhost:5000`

### 3. Launch Frontend Client
Open a second terminal window:
```bash
cd frontend
npm install
npm start
```
> The application will open automatically at `http://localhost:3000`

---

## ⚙️ Environment Variables Configuration

### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ahmed_farm_db
JWT_SECRET=ahmed_farm_secret_jwt_key_2026
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📁 Repository Structure

```
FYP_FMS/
├── backend/
│   ├── config/             # Database connection with fallback safety
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose schemas (Animals, Crops, Staff, Milk, etc.)
│   ├── routes/             # REST API endpoints
│   ├── .env                # Backend environment configuration
│   ├── package.json
│   └── server.js           # Express application entrypoint
├── frontend/
│   ├── public/             # Static assets & index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AhmedFarm/  # 🌾 AHMED FARM SUPER VIP SUITE
│   │   │   │   ├── data/   # 150+ realistic initial Pakistani seed records
│   │   │   │   ├── modules/# 14 Dedicated Functional Modules
│   │   │   │   └── AhmedLayout.js # Main Layout with Header, Sidebar & Quick +
│   │   │   ├── ChatBot/    # AI Farm Assistant
│   │   │   ├── LandingPage/# Classic View & Services Portal
│   │   │   └── Navbar.js
│   │   ├── App.js          # ViewMode Toggle (VIP / Classic)
│   │   ├── index.css       # Tailwind & Glassmorphism theme styles
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project (`https://github.com/YOUR_USERNAME/ahmed-farm-management-system/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <strong>🌾 FARM BUILDER MANAGEMENT SYSTEM</strong><br>
  Built with ❤️ for Modern Agricultural Innovation & Enterprise Farming.
</p>
