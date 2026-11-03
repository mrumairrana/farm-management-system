// Farm Builder Initial Data Store & Seed Data (SUPER VIP 150+ Records)
// Tagline: "Farm Builder — Managing Your Farm, Maximizing Your Future"
// Currency: Pakistani Rupees (₨ PKR)

export const initialFarmBuilderTips = [
  "Maintain regular mineral salt licks in dairy cattle paddocks to optimize milk yield by up to 15%.",
  "Implement drip irrigation during early dawn to minimize evaporation and save up to 40% water.",
  "Quarantine all newly arrived livestock for at least 14 days before introducing them to the main herd.",
  "Test soil nitrogen and pH balance every crop rotation cycle to ensure maximum fertilizer efficiency.",
  "Check tractor engine oil, hydraulic fluid, and air filter before starting daily harvesting operations.",
  "Calibrate automatic milking parlor suction pressure weekly to prevent bovine mastitis.",
  "Store harvested grain in hermetically sealed silos with moisture levels strictly below 12%."
];

export const initialAnimalCategories = [
  { id: "dairy_cattle", name: "Dairy Cattle", icon: "🐄", count: 45, species: "Cattle", unit: "Heads" },
  { id: "beef_cattle", name: "Beef Cattle", icon: "🐂", count: 30, species: "Cattle", unit: "Heads" },
  { id: "sheep", name: "Sheep", icon: "🐑", count: 25, species: "Sheep", unit: "Heads" },
  { id: "goats", name: "Goats", icon: "🐐", count: 20, species: "Goats", unit: "Heads" },
  { id: "poultry", name: "Poultry", icon: "🐓", count: 200, species: "Poultry", unit: "Birds" },
  { id: "rabbits", name: "Rabbits", icon: "🐇", count: 15, species: "Rabbits", unit: "Heads" },
  { id: "pigs", name: "Pigs", icon: "🐖", count: 10, species: "Pigs", unit: "Heads" }
];

export const initialAnimals = [
  {
    _id: "a1",
    animalId: "FB-C001",
    name: "Gulabi",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "Sahiwal Purebred",
    age: 4.0,
    dob: "2022-08-10",
    weight: 420,
    sex: "Female",
    motherId: "FB-C000M",
    fatherId: "FB-B001F",
    purchaseDate: "2023-01-15",
    purchasePrice: 280000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date (FMD + HS)",
    lastCheckup: "2026-08-15",
    milkingQuantity: 28,
    feedType: "Green Silage + High-Protein Concentrate",
    symptoms: "None",
    medicine: "Multivitamin B-Complex booster",
    notes: "Prime dairy cow. High fat percentage (4.2%) and champion temperament.",
    weightHistory: [
      { date: "2025-12-01", weight: 390 },
      { date: "2026-04-01", weight: 405 },
      { date: "2026-08-15", weight: 420 }
    ],
    medicalHistory: [
      { date: "2026-08-15", diagnosis: "Routine Health & Milk Audit", treatment: "Vitamins injected", vet: "Dr. Tariq Mahmood" },
      { date: "2026-02-10", diagnosis: "Annual FMD Vaccination", treatment: "Aftovax vaccine", vet: "Dr. Tariq Mahmood" }
    ]
  },
  {
    _id: "a2",
    animalId: "FB-C002",
    name: "Kali",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "Holstein Friesian",
    age: 3.0,
    dob: "2023-05-12",
    weight: 480,
    sex: "Female",
    motherId: "FB-C000X",
    fatherId: "FB-B002S",
    purchaseDate: "2023-09-05",
    purchasePrice: 295000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-10",
    milkingQuantity: 24,
    feedType: "Alfalfa Grass + Wheat Bran",
    symptoms: "None",
    medicine: "None",
    notes: "Friesian high producer averaging 24L per day.",
    weightHistory: [
      { date: "2026-01-10", weight: 460 },
      { date: "2026-08-10", weight: 480 }
    ],
    medicalHistory: [
      { date: "2026-08-10", diagnosis: "Routine Checkup", treatment: "Deworming administered", vet: "Dr. Asif Raza" }
    ]
  },
  {
    _id: "a3",
    animalId: "FB-C003",
    name: "Motia",
    species: "Goats",
    category: "Goats",
    breed: "Beetal Amritsari",
    age: 2.0,
    dob: "2024-06-15",
    weight: 45,
    sex: "Female",
    motherId: "FB-GT03",
    fatherId: "FB-GT01",
    purchaseDate: "2024-09-01",
    purchasePrice: 52000,
    status: "Active",
    healthStatus: "Checkup Due",
    vaccinationStatus: "PPR Due in 7 days",
    lastCheckup: "2026-07-20",
    milkingQuantity: 3.8,
    feedType: "Tree Leaves + Pulse Husks",
    symptoms: "None",
    medicine: "None",
    notes: "High milk yield dairy goat. Active grazing.",
    weightHistory: [{ date: "2026-07-20", weight: 45 }],
    medicalHistory: []
  },
  {
    _id: "a4",
    animalId: "FB-C004",
    name: "Sultan",
    species: "Cattle",
    category: "Beef Cattle",
    breed: "Nili-Ravi Purebred",
    age: 5.0,
    dob: "2021-04-10",
    weight: 550,
    sex: "Male",
    motherId: "FB-C010",
    fatherId: "FB-SIRE01",
    purchaseDate: "2021-08-12",
    purchasePrice: 380000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date (Anthrax + Blackleg)",
    lastCheckup: "2026-08-20",
    milkingQuantity: 0,
    feedType: "High-Energy Corn Mash + Hay",
    symptoms: "None",
    medicine: "Mineral Premix",
    notes: "Prime breeding stud bull with champion pedigree lineage.",
    weightHistory: [
      { date: "2025-11-01", weight: 510 },
      { date: "2026-08-20", weight: 550 }
    ],
    medicalHistory: [
      { date: "2026-08-20", diagnosis: "Breeding fitness inspection", treatment: "Electrolyte booster", vet: "Dr. Tariq Mahmood" }
    ]
  },
  {
    _id: "a5",
    animalId: "FB-C005",
    name: "Rani",
    species: "Sheep",
    category: "Sheep",
    breed: "Kajli Purebred",
    age: 3.0,
    dob: "2023-05-18",
    weight: 55,
    sex: "Female",
    motherId: "FB-SH02",
    fatherId: "FB-SH01",
    purchaseDate: "2023-08-20",
    purchasePrice: 58000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date (Enterotoxemia)",
    lastCheckup: "2026-08-05",
    milkingQuantity: 2.0,
    feedType: "Rhodes Grass + Crushed Oats",
    symptoms: "None",
    medicine: "None",
    notes: "Lustrous white wool fleece, ideal mother ewe.",
    weightHistory: [{ date: "2026-08-05", weight: 55 }],
    medicalHistory: []
  },
  {
    _id: "a6",
    animalId: "FB-C006",
    name: "Chanda",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "Cholistani Cross",
    age: 3.5,
    dob: "2023-02-14",
    weight: 460,
    sex: "Female",
    motherId: "FB-C008",
    fatherId: "FB-B002",
    purchaseDate: "2023-06-01",
    purchasePrice: 240000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-18",
    milkingQuantity: 20,
    feedType: "Silage + Mustard Cake",
    symptoms: "None",
    medicine: "None",
    notes: "Hardy desert breed cross with exceptional heat tolerance.",
    weightHistory: [{ date: "2026-08-18", weight: 460 }],
    medicalHistory: []
  },
  {
    _id: "a7",
    animalId: "FB-C007",
    name: "Suraj",
    species: "Cattle",
    category: "Beef Cattle",
    breed: "Dhanni Spotted",
    age: 2.5,
    dob: "2024-01-20",
    weight: 520,
    sex: "Male",
    motherId: "FB-C015",
    fatherId: "FB-B004",
    purchaseDate: "2024-04-10",
    purchasePrice: 260000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-07-28",
    milkingQuantity: 0,
    feedType: "Crushed Barley + Green Maize",
    symptoms: "None",
    medicine: "None",
    notes: "Active, athletic Dhanni bullock with fast weight gain.",
    weightHistory: [{ date: "2026-07-28", weight: 520 }],
    medicalHistory: []
  },
  {
    _id: "a8",
    animalId: "FB-C008",
    name: "Bella White",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "Jersey Cross",
    age: 3.0,
    dob: "2023-06-20",
    weight: 480,
    sex: "Female",
    motherId: "FB-C004",
    fatherId: "FB-B001F",
    purchaseDate: "2023-08-15",
    purchasePrice: 210000,
    status: "Sick",
    healthStatus: "Under Observation",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-25",
    milkingQuantity: 18,
    feedType: "Green Fodder + Electrolytes",
    symptoms: "Mild lethargy, slight fever (39.2°C)",
    medicine: "Flunixin meglumine + Enrofloxacin",
    notes: "Quarantined in Pen B. Milk withheld for 72 hrs withdrawal period.",
    weightHistory: [{ date: "2026-08-25", weight: 480 }],
    medicalHistory: [
      { date: "2026-08-25", diagnosis: "Early stage respiratory infection", treatment: "Antibiotics course 3 days", vet: "Dr. Tariq Mahmood" }
    ]
  },
  {
    _id: "a9",
    animalId: "FB-C009",
    name: "Kamori Prince",
    species: "Goats",
    category: "Goats",
    breed: "Kamori Sindhi",
    age: 2.8,
    dob: "2023-11-10",
    weight: 75,
    sex: "Male",
    motherId: "FB-GT09",
    fatherId: "FB-GT02",
    purchaseDate: "2024-02-15",
    purchasePrice: 95000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-12",
    milkingQuantity: 0,
    feedType: "Lush Green Forage + Mineral Mix",
    symptoms: "None",
    medicine: "None",
    notes: "Exotic patterned Kamori buck used for premium breeding stock.",
    weightHistory: [{ date: "2026-08-12", weight: 75 }],
    medicalHistory: []
  },
  {
    _id: "a10",
    animalId: "FB-P001",
    name: "Aseel Mianwali Trio",
    species: "Poultry",
    category: "Poultry",
    breed: "Aseel Pure",
    age: 1.2,
    dob: "2025-06-15",
    weight: 4.5,
    sex: "Male",
    motherId: "FB-PL01",
    fatherId: "FB-PL00",
    purchaseDate: "2025-08-01",
    purchasePrice: 22000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "ND + IB Vaccinated",
    lastCheckup: "2026-08-01",
    milkingQuantity: 0,
    feedType: "Layer Mash + Crushed Corn",
    symptoms: "None",
    medicine: "Vitamin AD3E in water",
    notes: "Prized local Aseel breed roosters with robust immunity.",
    weightHistory: [{ date: "2026-08-01", weight: 4.5 }],
    medicalHistory: []
  },
  {
    _id: "a11",
    animalId: "FB-P002",
    name: "Golden Misri Layers (200 Birds)",
    species: "Poultry",
    category: "Poultry",
    breed: "Golden Misri Commercial",
    age: 0.9,
    dob: "2025-11-20",
    weight: 1.8,
    sex: "Female",
    motherId: "FB-PL10",
    fatherId: "FB-PL09",
    purchaseDate: "2026-01-15",
    purchasePrice: 110000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Gumboro + Lasota done",
    lastCheckup: "2026-08-12",
    milkingQuantity: 0,
    feedType: "Layer Feed 16% CP + Calcium Grit",
    symptoms: "None",
    medicine: "None",
    notes: "Flock laying rate currently at 89% (178 eggs daily).",
    weightHistory: [{ date: "2026-08-12", weight: 1.8 }],
    medicalHistory: []
  },
  {
    _id: "a12",
    animalId: "FB-R001",
    name: "Silver Rex Buck",
    species: "Rabbits",
    category: "Rabbits",
    breed: "Rex Chinchilla",
    age: 1.1,
    dob: "2025-07-10",
    weight: 4.6,
    sex: "Male",
    motherId: "FB-RB03",
    fatherId: "FB-RB01",
    purchaseDate: "2025-09-15",
    purchasePrice: 6500,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "RHDV Vaccinated",
    lastCheckup: "2026-07-30",
    milkingQuantity: 0,
    feedType: "Timothy Hay + Rabbit Pellets",
    symptoms: "None",
    medicine: "None",
    notes: "Dense velvet coat. Active stud buck.",
    weightHistory: [{ date: "2026-07-30", weight: 4.6 }],
    medicalHistory: []
  },
  {
    _id: "a13",
    animalId: "FB-R002",
    name: "Snow White Doe",
    species: "Rabbits",
    category: "Rabbits",
    breed: "New Zealand White",
    age: 1.0,
    dob: "2025-08-14",
    weight: 5.1,
    sex: "Female",
    motherId: "FB-RB02",
    fatherId: "FB-RB01",
    purchaseDate: "2025-10-15",
    purchasePrice: 5500,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-08",
    milkingQuantity: 0,
    feedType: "Alfalfa Hay + Pellets",
    symptoms: "None",
    medicine: "None",
    notes: "Nurturing doe with 6 healthy kits.",
    weightHistory: [{ date: "2026-08-08", weight: 5.1 }],
    medicalHistory: []
  },
  {
    _id: "a14",
    animalId: "FB-PG01",
    name: "Berkshire Major",
    species: "Pigs",
    category: "Pigs",
    breed: "Berkshire Heritage",
    age: 1.5,
    dob: "2025-02-18",
    weight: 210,
    sex: "Male",
    motherId: "FB-PG00M",
    fatherId: "FB-PG00F",
    purchaseDate: "2025-05-10",
    purchasePrice: 85000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Swine Erysipelas + Parvo",
    lastCheckup: "2026-08-02",
    milkingQuantity: 0,
    feedType: "Cooked Grain Mash + Whey",
    symptoms: "None",
    medicine: "Iron booster",
    notes: "Fast growth conversion rate. Registered stock.",
    weightHistory: [{ date: "2026-08-02", weight: 210 }],
    medicalHistory: []
  },
  {
    _id: "a15",
    animalId: "FB-C010",
    name: "Ruby Red",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "Red Sindhi",
    age: 5.0,
    dob: "2021-06-15",
    weight: 510,
    sex: "Female",
    motherId: "FB-C000R",
    fatherId: "FB-B001S",
    purchaseDate: "2021-09-01",
    purchasePrice: 225000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-20",
    milkingQuantity: 22,
    feedType: "Silage + Cottonseed Cake",
    symptoms: "None",
    medicine: "None",
    notes: "High butterfat milk producer.",
    weightHistory: [{ date: "2026-08-20", weight: 510 }],
    medicalHistory: []
  },
  {
    _id: "a16",
    animalId: "FB-C011",
    name: "Sitara",
    species: "Cattle",
    category: "Dairy Cattle",
    breed: "Friesian Cross",
    age: 3.2,
    dob: "2023-04-10",
    weight: 490,
    sex: "Female",
    motherId: "FB-C002",
    fatherId: "FB-B001",
    purchaseDate: "2023-07-15",
    purchasePrice: 270000,
    status: "Active",
    healthStatus: "Healthy",
    vaccinationStatus: "Up to Date",
    lastCheckup: "2026-08-22",
    milkingQuantity: 26,
    feedType: "Green Maize + Corn Silage",
    symptoms: "None",
    medicine: "None",
    notes: "Consistent milker. 26 Liters per day average.",
    weightHistory: [{ date: "2026-08-22", weight: 490 }],
    medicalHistory: []
  }
];

// Helper to generate 30 days of realistic milk records for 5 dairy cows (150 records)
const generate30DayMilkRecords = () => {
  const records = [];
  const cows = [
    { id: "FB-C001", name: "Gulabi", avgM: 6.5, avgE: 6.0, fat: 4.2, grade: "A" },
    { id: "FB-C002", name: "Kali", avgM: 7.0, avgE: 6.5, fat: 3.9, grade: "A" },
    { id: "FB-C006", name: "Chanda", avgM: 5.5, avgE: 5.0, fat: 4.5, grade: "A" },
    { id: "FB-C010", name: "Ruby Red", avgM: 6.0, avgE: 5.5, fat: 4.8, grade: "A" },
    { id: "FB-C011", name: "Sitara", avgM: 7.5, avgE: 7.0, fat: 4.1, grade: "A" }
  ];

  let recordCounter = 1;
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    for (const cow of cows) {
      const variationM = (Math.random() * 0.8 - 0.4);
      const variationE = (Math.random() * 0.8 - 0.4);
      const mQty = parseFloat((cow.avgM + variationM).toFixed(1));
      const eQty = parseFloat((cow.avgE + variationE).toFixed(1));
      const total = parseFloat((mQty + eQty).toFixed(1));
      const pricePerL = 185;
      const revenue = Math.round(total * pricePerL);

      records.push({
        id: `m_${recordCounter++}`,
        date: dateStr,
        session: i === 0 ? "Morning" : "Full Day",
        animalId: cow.id,
        animalName: cow.name,
        morning: mQty,
        evening: eQty,
        quantity: total,
        fatPercent: parseFloat((cow.fat + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        snf: 8.9,
        qualityGrade: cow.grade,
        soldStatus: "Sold (Bulk Supply)",
        pricePerLiter: pricePerL,
        revenue: revenue,
        storageTank: "Tank A (Cold 4°C)",
        loggedBy: i % 2 === 0 ? "Malik Anwar" : "Rashid Ali",
        notes: "Machine milked in sanitized parlor"
      });
    }
  }
  return records;
};

export const initialMilkRecords = generate30DayMilkRecords();

export const initialMilkBuyers = [
  { id: "b1", name: "Gourmet Dairies Lahore", contact: "+92 300 8492011", supplyAgreement: "Daily 300 Liters @ ₨185/L", outstandingAmount: 45000, status: "Active Contract" },
  { id: "b2", name: "Engro Foods / Olpers Hub", contact: "+92 321 9988223", supplyAgreement: "Daily 100 Liters @ ₨182/L", outstandingAmount: 0, status: "Active Contract" },
  { id: "b3", name: "Mianwali Sweet Palace & Bakery", contact: "+92 333 4567890", supplyAgreement: "Weekly 150 Liters Goat Milk @ ₨220/L", outstandingAmount: 12500, status: "Active Contract" },
  { id: "b4", name: "Local Village Community Counter", contact: "+92 308 1122334", supplyAgreement: "Daily Retail Cash Sales (20 Liters)", outstandingAmount: 0, status: "Daily Cash" }
];

export const initialMilkChartData = [
  { day: "Day 1-5", yield: 410, target: 400, morning: 220, evening: 190, revenue: 75850 },
  { day: "Day 6-10", yield: 415, target: 400, morning: 225, evening: 190, revenue: 76775 },
  { day: "Day 11-15", yield: 405, target: 410, morning: 215, evening: 190, revenue: 74925 },
  { day: "Day 16-20", yield: 425, target: 410, morning: 230, evening: 195, revenue: 78625 },
  { day: "Day 21-25", yield: 418, target: 415, morning: 225, evening: 193, revenue: 77330 },
  { day: "Day 26-30", yield: 420, target: 420, morning: 228, evening: 192, revenue: 77700 }
];

export const initialCrops = [
  { id: "c1", plotName: "Field-A (North Plot)", cropName: "Wheat", variety: "Faisalabad-08", acreage: 5, sowingDate: "2025-11-15", expectedHarvest: "2026-04-15", irrigationType: "Canal + Tube Well", growthStage: "Growing", progress: 85, healthStatus: "Good", soilMoisture: "45%", seedSource: "Punjab Seed Corp", seedCost: 25000, fertilizerPlan: "DAP + Urea Split", pesticideSchedule: "Weedicide spray done", expectedYield: "42 Maunds/Acre", estimatedRevenue: 850000, expenses: 240000, profit: 610000, harvestDone: false },
  { id: "c2", plotName: "Field-B (East Canal)", cropName: "Rice", variety: "Super Basmati-515", acreage: 3, sowingDate: "2026-06-01", expectedHarvest: "2026-09-30", irrigationType: "Flood Irrigation", growthStage: "Harvesting", progress: 95, healthStatus: "Excellent", soilMoisture: "75%", seedSource: "Certified Agro Seed", seedCost: 18000, fertilizerPlan: "Potash + Zinc + Urea", pesticideSchedule: "Stem borer preventive spray", expectedYield: "48 Maunds/Acre", estimatedRevenue: 650000, expenses: 180000, profit: 470000, harvestDone: false },
  { id: "c3", plotName: "Field-C (River Valley)", cropName: "Cotton", variety: "BT Cotton-33", acreage: 4, sowingDate: "2026-04-20", expectedHarvest: "2026-10-20", irrigationType: "Drip Fertigation", growthStage: "Flowering", progress: 70, healthStatus: "Good", soilMoisture: "52%", seedSource: "Four Brothers Seeds", seedCost: 32000, fertilizerPlan: "NPK 20-20-20 Fertigation", pesticideSchedule: "Whitefly & Pink bollworm scouting", expectedYield: "35 Maunds/Acre", estimatedRevenue: 780000, expenses: 260000, profit: 520000, harvestDone: false },
  { id: "c4", plotName: "Field-D (South Acres)", cropName: "Maize", variety: "Pioneer Silage-3335", acreage: 2, sowingDate: "2026-03-10", expectedHarvest: "2026-07-10", irrigationType: "Solar Tube Well", growthStage: "Seeding / Fresh Ratoon", progress: 40, healthStatus: "Fair", soilMoisture: "60%", seedSource: "Pioneer Seeds Ltd", seedCost: 16000, fertilizerPlan: "Urea Top Dressing", pesticideSchedule: "Fall armyworm control", expectedYield: "650 Maunds Green Silage", estimatedRevenue: 320000, expenses: 95000, profit: 225000, harvestDone: false },
  { id: "c5", plotName: "Field-E (Central Strip)", cropName: "Sugarcane", variety: "CPF-249", acreage: 6, sowingDate: "2025-09-25", expectedHarvest: "2026-12-10", irrigationType: "Canal Water", growthStage: "Growing", progress: 80, healthStatus: "Good", seedSource: "Sugarcane Research Institute", seedCost: 45000, fertilizerPlan: "Farmyard Manure + DAP", pesticideSchedule: "Gurdaspur borer treatment", expectedYield: "950 Maunds/Acre", estimatedRevenue: 1250000, expenses: 410000, profit: 840000, harvestDone: false },
  { id: "c6", plotName: "Field-F (Orchard Block)", cropName: "Lucerne / Alfalfa", variety: "Sindhi Berseem", acreage: 3, sowingDate: "2025-10-01", expectedHarvest: "2026-10-01", irrigationType: "Sprinkler Irrigation", growthStage: "Growing", progress: 90, healthStatus: "Excellent", seedSource: "Local Agro Store", seedCost: 12000, fertilizerPlan: "Bio-Fertilizer Extract", pesticideSchedule: "None (Organic Fodder)", expectedYield: "High Protein Dairy Fodder", estimatedRevenue: 380000, expenses: 80000, profit: 300000, harvestDone: false },
  { id: "c7", plotName: "Field-G (Solar Well Zone)", cropName: "Canola", variety: "Super Canola-2023", acreage: 4, sowingDate: "2026-09-15", expectedHarvest: "2027-02-15", irrigationType: "Solar Drip", growthStage: "Pre-Sowing Ready", progress: 15, healthStatus: "Good", seedSource: "Ayub Research Institute", seedCost: 20000, fertilizerPlan: "Pre-emergence gypsum + DAP", pesticideSchedule: "Aphid control planned", expectedYield: "28 Maunds/Acre", estimatedRevenue: 560000, expenses: 160000, profit: 400000, harvestDone: false },
  { id: "c8", plotName: "Field-H (Polyhouse Block)", cropName: "Tunnel Vegetables", variety: "Cucumber & Tomato Hybrid", acreage: 1, sowingDate: "2026-08-01", expectedHarvest: "2026-11-30", irrigationType: "Precision Drip", growthStage: "Growing", progress: 50, healthStatus: "Excellent", seedSource: "Syngenta Pakistan", seedCost: 28000, fertilizerPlan: "Water Soluble NPK", pesticideSchedule: "Neem oil organic spray", expectedYield: "12,000 kg Premium Export", estimatedRevenue: 480000, expenses: 140000, profit: 340000, harvestDone: false }
];

export const initialHarvestRecords = [
  { id: "h1", cropId: "c1", cropName: "Wheat (Faisalabad-08)", harvestDate: "2026-04-18", totalYield: "210 Maunds", qualityGrade: "Grade A", storageLocation: "Silo #1 Alpha", saleAmount: 850000, buyerName: "Punjab Food Department", profitLoss: "+₨610,000" },
  { id: "h2", cropId: "c4", cropName: "Fodder Corn / Maize", harvestDate: "2026-07-12", totalYield: "650 Maunds Silage", qualityGrade: "Grade A+", storageLocation: "Bunker Silo Beta", saleAmount: 320000, buyerName: "Farm Builder Dairy Feed", profitLoss: "+₨225,000" }
];

export const initialExpenseCategories = [
  "Animal Feed & Fodder",
  "Veterinary & Medicine",
  "Labor / Wages",
  "Fuel & Energy",
  "Equipment Repair",
  "Fertilizers & Pesticides",
  "Seeds & Planting",
  "Water / Irrigation",
  "Transportation",
  "Loan Repayment",
  "Miscellaneous",
  "Infrastructure / Construction",
  "Electricity Bill",
  "Subscription / Software"
];

// Helper to generate 30+ detailed expenses across all 14 categories
export const initialExpenses = [
  { id: "exp-1", date: "2026-08-26", category: "Animal Feed & Fodder", title: "Wheat Bran (500kg) & Molasses", amount: 15000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Ali Feed Store", invoiceNumber: "INV-FB-901", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-2", date: "2026-08-25", category: "Veterinary & Medicine", title: "Vaccination - 10 Animals (FMD + Dewormers)", amount: 8500, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "Dr. Kamran", invoiceNumber: "INV-FB-902", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-3", date: "2026-08-24", category: "Labor / Wages", title: "Daily Worker Wages (5 workers)", amount: 6000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Farm Staff", invoiceNumber: "INV-FB-903", approvedBy: "Farm Manager" },
  { id: "exp-4", date: "2026-08-23", category: "Fuel & Energy", title: "Tractor Diesel (300 Liters)", amount: 85500, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "PSO Pump Bypass", invoiceNumber: "INV-FB-904", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-5", date: "2026-08-22", category: "Equipment Repair", title: "Massey Ferguson Hydraulic Hose Replacement", amount: 12000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Ustad Mechanix", invoiceNumber: "INV-FB-905", approvedBy: "Farhan Siddiqui" },
  { id: "exp-6", date: "2026-08-20", category: "Fertilizers & Pesticides", title: "10 Bags Urea + 5 Bags SOP Potash", amount: 48000, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "Fauji Fertilizer Outlet", invoiceNumber: "INV-FB-906", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-7", date: "2026-08-19", category: "Seeds & Planting", title: "Super Basmati Certified Nursery Seeds", amount: 18000, paymentStatus: "Paid", paymentMethod: "Online", vendor: "Punjab Seed Corp", invoiceNumber: "INV-FB-907", approvedBy: "Muhammad Bilal" },
  { id: "exp-8", date: "2026-08-18", category: "Water / Irrigation", title: "Solar Tubewell Filter Cleaning & Canal Surcharge", amount: 7500, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Canal Revenue Office", invoiceNumber: "INV-FB-908", approvedBy: "Qasim Shah" },
  { id: "exp-9", date: "2026-08-17", category: "Transportation", title: "Milk Delivery Van Fuel & Tolls", amount: 9500, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "City Transport Fund", invoiceNumber: "INV-FB-909", approvedBy: "Farm Manager" },
  { id: "exp-10", date: "2026-08-15", category: "Electricity Bill", title: "WAPDA Commercial Agriculture Connection Bill", amount: 32000, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "IESCO / WAPDA", invoiceNumber: "INV-FB-910", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-11", date: "2026-08-14", category: "Animal Feed & Fodder", title: "Rhodes Grass Bales (200 Bales)", amount: 28000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Sargodha Forage Co", invoiceNumber: "INV-FB-911", approvedBy: "Farm Manager" },
  { id: "exp-12", date: "2026-08-12", category: "Veterinary & Medicine", title: "Antibiotics & Mastitis Infusion Tubes", amount: 6500, paymentStatus: "Pending", paymentMethod: "Credit", vendor: "Al-Shifa Vet Pharmacy", invoiceNumber: "INV-FB-912", approvedBy: "Dr. Tariq Mahmood" },
  { id: "exp-13", date: "2026-08-10", category: "Infrastructure / Construction", title: "Pen B Quarantine Roof Shed Repair & Mesh", amount: 22000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Mianwali Hardware Store", invoiceNumber: "INV-FB-913", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-14", date: "2026-08-08", category: "Loan Repayment", title: "Zarai Taraqiati Bank (ZTBL) Tractor Loan Installment", amount: 45000, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "ZTBL Mianwali Branch", invoiceNumber: "INV-FB-914", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-15", date: "2026-08-06", category: "Labor / Wages", title: "Mid-month Worker Salary Advance", amount: 25000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Malik Anwar & Staff", invoiceNumber: "INV-FB-915", approvedBy: "Farm Manager" },
  { id: "exp-16", date: "2026-08-05", category: "Fuel & Energy", title: "Backup Generator Diesel Refill (100L)", amount: 28500, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Shell Petroleum", invoiceNumber: "INV-FB-916", approvedBy: "Farhan Siddiqui" },
  { id: "exp-17", date: "2026-08-03", category: "Fertilizers & Pesticides", title: "Foliar Zinc & Micronutrient Sprays", amount: 14000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Engro Chemical Retail", invoiceNumber: "INV-FB-917", approvedBy: "Muhammad Bilal" },
  { id: "exp-18", date: "2026-08-01", category: "Subscription / Software", title: "Farm Builder Cloud Telemetry & GPS Tracking", amount: 3500, paymentStatus: "Paid", paymentMethod: "Card", vendor: "AgriTech SaaS PK", invoiceNumber: "INV-FB-918", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-19", date: "2026-07-28", category: "Miscellaneous", title: "Milking Parlor Disinfectant & Sanitizing Soap", amount: 4200, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "City Hygiene Supply", invoiceNumber: "INV-FB-919", approvedBy: "Rashid Ali" },
  { id: "exp-20", date: "2026-07-25", category: "Equipment Repair", title: "Thresher Belt & Bearing Overhaul", amount: 9800, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Mianwali Engineering Workshop", invoiceNumber: "INV-FB-920", approvedBy: "Farhan Siddiqui" },
  { id: "exp-21", date: "2026-07-22", category: "Animal Feed & Fodder", title: "High-Protein Mustard Oil Cake (Khal)", amount: 24000, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "Punjab Oil Mills", invoiceNumber: "INV-FB-921", approvedBy: "Farm Manager" },
  { id: "exp-22", date: "2026-07-20", category: "Veterinary & Medicine", title: "Calf Scour Electrolytes & Vitamin D3 Injection", amount: 4800, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Dr. Arif Vet Clinic", invoiceNumber: "INV-FB-922", approvedBy: "Dr. Tariq Mahmood" },
  { id: "exp-23", date: "2026-07-18", category: "Water / Irrigation", title: "Canal Silt Cleaning & Siphon Pipe Extension", amount: 6200, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Local Labor Crew", invoiceNumber: "INV-FB-923", approvedBy: "Qasim Shah" },
  { id: "exp-24", date: "2026-07-15", category: "Labor / Wages", title: "Monthly Full Staff Wages Settlement", amount: 145000, paymentStatus: "Paid", paymentMethod: "Bank + Cash", vendor: "All 8 Staff Members", invoiceNumber: "INV-FB-924", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-25", date: "2026-07-12", category: "Transportation", title: "Fodder Transport from Sargodha", amount: 16000, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Haji Freight Goods", invoiceNumber: "INV-FB-925", approvedBy: "Farm Manager" },
  { id: "exp-26", date: "2026-07-10", category: "Seeds & Planting", title: "Hybrid Maize Silage Seeds (Pioneer)", amount: 26000, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "Pioneer Seeds Pakistan", invoiceNumber: "INV-FB-926", approvedBy: "Muhammad Bilal" },
  { id: "exp-27", date: "2026-07-08", category: "Miscellaneous", title: "Poultry Farm Bedding Wood Shavings (3 Trolleys)", amount: 7500, paymentStatus: "Paid", paymentMethod: "Cash", vendor: "Saw Mill Chashma Road", invoiceNumber: "INV-FB-927", approvedBy: "Nadeem Akhtar" },
  { id: "exp-28", date: "2026-07-05", category: "Infrastructure / Construction", title: "Brick Flooring for Milking Shed Extension", amount: 35000, paymentStatus: "Pending", paymentMethod: "Credit", vendor: "National Brick Kiln", invoiceNumber: "INV-FB-928", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-29", date: "2026-07-02", category: "Fuel & Energy", title: "Harvesting Fleet Diesel (500 Liters)", amount: 142500, paymentStatus: "Paid", paymentMethod: "Bank", vendor: "PSO Petroleum", invoiceNumber: "INV-FB-929", approvedBy: "Farm Builder (Owner)" },
  { id: "exp-30", date: "2026-06-30", category: "Veterinary & Medicine", title: "Emergency Bovine Mastitis Treatment & Serums", amount: 11000, paymentStatus: "Pending", paymentMethod: "Credit", vendor: "Dr. Kamran Vet Specialist", invoiceNumber: "INV-FB-930", approvedBy: "Dr. Tariq Mahmood" }
];

export const initialRevenues = [
  { id: "rev-1", date: "2026-08-27", category: "Milk Sales", title: "Daily Bulk Milk Supply (420 Liters @ ₨185/L)", amount: 77700, customer: "Gourmet Dairies Lahore", paymentStatus: "Paid", receiptNo: "REC-AF-991" },
  { id: "rev-2", date: "2026-08-25", category: "Livestock Sales", title: "2 Dhanni Steers Sold to Prime Butchery", amount: 620000, customer: "Haji Rafiq Meat Traders", paymentStatus: "Paid", receiptNo: "REC-AF-992" },
  { id: "rev-3", date: "2026-08-22", category: "Poultry & Eggs", title: "250 Trays Organic Farm Eggs + Culls", amount: 185000, customer: "City Fresh Mart", paymentStatus: "Paid", receiptNo: "REC-AF-993" },
  { id: "rev-4", date: "2026-08-15", category: "Crop Harvest", title: "Wheat Grain Stock Consignment Part #2", amount: 850000, customer: "Punjab Food Department", paymentStatus: "Paid", receiptNo: "REC-AF-994" }
];

export const initialInventory = [
  { id: "inv-1", name: "High-Protein Dairy Feed Mash", category: "Feed & Fodder", quantity: 85, unit: "Bags (50kg)", minThreshold: 30, unitCost: 3200, status: "In Stock", location: "Feed Silo Alpha", supplier: "Punjab Feeds", lastPurchaseDate: "2026-08-10", expiryDate: "2027-02-10" },
  { id: "inv-2", name: "Wheat Straw Bhoosa Bales", category: "Feed & Fodder", quantity: 340, unit: "Bales", minThreshold: 100, unitCost: 450, status: "In Stock", location: "Barn 3 Haystack", supplier: "Self-Harvest", lastPurchaseDate: "2026-05-01", expiryDate: "2027-05-01" },
  { id: "inv-3", name: "Green Fodder (Silage Bales)", category: "Feed & Fodder", quantity: 800, unit: "kg", minThreshold: 200, unitCost: 5, status: "In Stock", location: "Bunker Silo Beta", supplier: "Farm Builder Plots", lastPurchaseDate: "2026-08-20", expiryDate: "2026-11-20" },
  { id: "inv-4", name: "Cottonseed Cake (Khal)", category: "Feed & Fodder", quantity: 50, unit: "Bags (40kg)", minThreshold: 20, unitCost: 2400, status: "In Stock", location: "Feed Silo Alpha", supplier: "Punjab Oil Mills", lastPurchaseDate: "2026-08-15", expiryDate: "2027-01-15" },
  { id: "inv-5", name: "Mineral Salt Licks Block", category: "Feed & Fodder", quantity: 25, unit: "Blocks (10kg)", minThreshold: 10, unitCost: 650, status: "In Stock", location: "Dairy Barn Stalls", supplier: "Khewra Salt Traders", lastPurchaseDate: "2026-07-15", expiryDate: "2028-07-15" },

  { id: "inv-6", name: "Aftovax FMD Cattle Vaccine", category: "Medicine & Vaccines", quantity: 6, unit: "Vials (50 doses)", minThreshold: 10, unitCost: 4800, status: "Low Stock", location: "Vet Cold Refrigerator", supplier: "Merial Animal Health", lastPurchaseDate: "2026-06-10", expiryDate: "2027-06-10" },
  { id: "inv-7", name: "Oxytocin Inj. 10ml", category: "Medicine & Vaccines", quantity: 50, unit: "Vials", minThreshold: 20, unitCost: 45, status: "In Stock", location: "Vet Medical Box", supplier: "Al-Shifa Vet", lastPurchaseDate: "2026-08-01", expiryDate: "2028-08-01" },
  { id: "inv-8", name: "Enrofloxacin 10% Injectable", category: "Medicine & Vaccines", quantity: 15, unit: "Bottles (100ml)", minThreshold: 8, unitCost: 950, status: "In Stock", location: "Vet Clinic Bay", supplier: "Hilton Pharma Animal Health", lastPurchaseDate: "2026-07-20", expiryDate: "2027-12-20" },
  { id: "inv-9", name: "Albendazole Broad Spectrum Dewormer", category: "Medicine & Vaccines", quantity: 12, unit: "Liters", minThreshold: 5, unitCost: 1600, status: "In Stock", location: "Vet Clinic Bay", supplier: "ICI Pakistan", lastPurchaseDate: "2026-08-05", expiryDate: "2028-08-05" },

  { id: "inv-10", name: "DAP Fertilizer (Di-Ammonium Phosphate)", category: "Chemicals & Pesticides", quantity: 18, unit: "Bags (50kg)", minThreshold: 25, unitCost: 11500, status: "Low Stock", location: "Agro Store Bay 2", supplier: "Fauji Fertilizer", lastPurchaseDate: "2026-07-20", expiryDate: "2028-07-20" },
  { id: "inv-11", name: "Urea Fertilizer", category: "Chemicals & Pesticides", quantity: 4, unit: "Bags (50kg)", minThreshold: 10, unitCost: 2800, status: "Critical Low", location: "Agro Store Bay 2", supplier: "Engro Fertilizers", lastPurchaseDate: "2026-06-15", expiryDate: "2028-06-15" },
  { id: "inv-12", name: "SOP Potash Fertilizer", category: "Chemicals & Pesticides", quantity: 15, unit: "Bags (50kg)", minThreshold: 10, unitCost: 14000, status: "In Stock", location: "Agro Store Bay 2", supplier: "Fauji Fertilizer", lastPurchaseDate: "2026-07-25", expiryDate: "2028-07-25" },
  { id: "inv-13", name: "Belt Expert Cotton Insecticide", category: "Chemicals & Pesticides", quantity: 8, unit: "Liters", minThreshold: 5, unitCost: 6500, status: "In Stock", location: "Chemical Locker", supplier: "Bayer CropScience", lastPurchaseDate: "2026-08-01", expiryDate: "2027-08-01" },

  { id: "inv-14", name: "Tractor Oil Filter & 20W50 Lube", category: "Tools & Equipment Parts", quantity: 8, unit: "Sets", minThreshold: 4, unitCost: 5500, status: "In Stock", location: "Workshop Tool Rack", supplier: "Millat Tractors Store", lastPurchaseDate: "2026-08-10", expiryDate: "N/A" },
  { id: "inv-15", name: "Milking Cluster Rubber Liners", category: "Tools & Equipment Parts", quantity: 16, unit: "Sets", minThreshold: 8, unitCost: 1800, status: "In Stock", location: "Milking Parlor Spares", supplier: "DeLaval Pakistan", lastPurchaseDate: "2026-07-15", expiryDate: "N/A" },
  { id: "inv-16", name: "Drip Irrigation Emitters & 16mm Pipe", category: "Tools & Equipment Parts", quantity: 500, unit: "Meters", minThreshold: 200, unitCost: 35, status: "In Stock", location: "Irrigation Store", supplier: "AgriFlow PK", lastPurchaseDate: "2026-06-01", expiryDate: "N/A" },

  { id: "inv-17", name: "Super Basmati Rice Seeds Grade-A", category: "Seeds Stock", quantity: 45, unit: "Bags (20kg)", minThreshold: 20, unitCost: 4200, status: "In Stock", location: "Seed Vault", supplier: "Punjab Seed Corp", lastPurchaseDate: "2026-05-15", expiryDate: "2027-05-15" },
  { id: "inv-18", name: "Hybrid Maize Seeds (Pioneer 3335)", category: "Seeds Stock", quantity: 20, unit: "Bags (10kg)", minThreshold: 10, unitCost: 5800, status: "In Stock", location: "Seed Vault", supplier: "Pioneer Seeds Ltd", lastPurchaseDate: "2026-06-20", expiryDate: "2027-06-20" },

  { id: "inv-19", name: "Diesel Fuel Bulk Reserve", category: "Farm Supplies", quantity: 650, unit: "Liters", minThreshold: 800, unitCost: 285, status: "Low Stock", location: "Underground Tank", supplier: "PSO Depot", lastPurchaseDate: "2026-08-20", expiryDate: "N/A" },
  { id: "inv-20", name: "Stainless Steel Milk Cans (40L)", category: "Farm Supplies", quantity: 24, unit: "Cans", minThreshold: 15, unitCost: 8500, status: "In Stock", location: "Milking Parlor", supplier: "DeLaval Pakistan", lastPurchaseDate: "2026-04-10", expiryDate: "N/A" }
];

export const initialStockMovements = [
  { id: "sm-1", date: "2026-08-27", item: "Wheat Bran (500kg)", type: "OUT", quantity: "50 kg", purpose: "Morning Dairy Rations", byWhom: "Malik Anwar" },
  { id: "sm-2", date: "2026-08-26", item: "Tractor Diesel", type: "OUT", quantity: "80 Liters", purpose: "Field B Plowing Operation", byWhom: "Ghulam Rasool" },
  { id: "sm-3", date: "2026-08-25", item: "DAP Fertilizer", type: "IN", quantity: "20 Bags", purpose: "Supplier Delivery Refill", byWhom: "Farm Manager" },
  { id: "sm-4", date: "2026-08-24", item: "Oxytocin Inj. 10ml", type: "OUT", quantity: "2 Vials", purpose: "Veterinary Treatment", byWhom: "Dr. Tariq Mahmood" }
];

export const initialStaff = [
  { id: "FB-S001", name: "Farm Manager", role: "Farm Manager", cnic: "38302-1234567-1", phone: "+92 300 4589211", address: "Farm Builder Residential Villa #1, Mianwali", joinDate: "2021-03-01", shift: "Full Time (07:00 - 18:00)", assignedArea: "Overall Management", emergencyContact: "+92 300 9988111", salary: 45000, status: "Active", attendanceStatus: "Present", tasksAssigned: 4, advanceDeduction: 0, overtime: 0, paymentStatus: "Paid" },
  { id: "FB-S002", name: "Malik Anwar", role: "Dairy Worker", cnic: "38302-2345678-3", phone: "+92 312 9081234", address: "Chashma Barrage Colony, Mianwali", joinDate: "2022-01-15", shift: "Morning (05:00 - 13:00)", assignedArea: "Dairy Barn & Milking", emergencyContact: "+92 312 5566778", salary: 25000, status: "Active", attendanceStatus: "Present", tasksAssigned: 5, advanceDeduction: 2000, overtime: 1500, paymentStatus: "Paid" },
  { id: "FB-S003", name: "Zulfiqar Ali", role: "Field Worker", cnic: "38302-3456789-5", phone: "+92 333 7819022", address: "Piplan Tehsil, Mianwali", joinDate: "2022-06-01", shift: "Morning (06:00 - 14:00)", assignedArea: "Crops & Fields A-D", emergencyContact: "+92 333 1122334", salary: 20000, status: "Active", attendanceStatus: "Present", tasksAssigned: 3, advanceDeduction: 0, overtime: 800, paymentStatus: "Paid" },
  { id: "FB-S004", name: "Ghulam Rasool", role: "Tractor Driver", cnic: "38302-4567890-7", phone: "+92 345 8812903", address: "Kundian Town, Mianwali", joinDate: "2021-08-10", shift: "Full Time (07:00 - 16:00)", assignedArea: "Machinery & Harvesting", emergencyContact: "+92 345 4455667", salary: 28000, status: "Active", attendanceStatus: "Present", tasksAssigned: 3, advanceDeduction: 3000, overtime: 2000, paymentStatus: "Paid" },
  { id: "FB-S005", name: "Bashir Khan", role: "Night Guard", cnic: "38302-5678901-9", phone: "+92 300 8877665", address: "Shahbaz Khel, Mianwali", joinDate: "2023-02-01", shift: "Night (20:00 - 08:00)", assignedArea: "Main Perimeter Security", emergencyContact: "+92 300 2233445", salary: 18000, status: "Active", attendanceStatus: "Present", tasksAssigned: 1, advanceDeduction: 0, overtime: 0, paymentStatus: "Paid" },
  { id: "FB-S006", name: "Dr. Tariq Mahmood", role: "Veterinary Assistant", cnic: "38302-6789012-1", phone: "+92 301 6721908", address: "Civil Hospital Road, Mianwali", joinDate: "2022-04-15", shift: "Morning / On-Call", assignedArea: "Clinic & Quarantine", emergencyContact: "+92 301 8899001", salary: 50000, status: "Active", attendanceStatus: "Present", tasksAssigned: 4, advanceDeduction: 0, overtime: 0, paymentStatus: "Paid" },
  { id: "FB-S007", name: "Qasim Shah", role: "Irrigation & Solar Tech", cnic: "38302-7890123-3", phone: "+92 307 9988776", address: "Namal Valley, Mianwali", joinDate: "2023-05-10", shift: "Day (07:00 - 16:00)", assignedArea: "Solar Tubewells & Drip", emergencyContact: "+92 307 6677889", salary: 24000, status: "Active", attendanceStatus: "Present", tasksAssigned: 3, advanceDeduction: 1000, overtime: 1200, paymentStatus: "Paid" },
  { id: "FB-S008", name: "Nadeem Akhtar", role: "Cook / Housekeeper", cnic: "38302-8901234-5", phone: "+92 315 2233445", address: "Farm Builder Mess, Mianwali", joinDate: "2023-09-01", shift: "Day (06:00 - 18:00)", assignedArea: "Staff Mess & Kitchen", emergencyContact: "+92 315 7788990", salary: 22000, status: "Active", attendanceStatus: "Present", tasksAssigned: 2, advanceDeduction: 0, overtime: 500, paymentStatus: "Paid" }
];

export const initialMachinery = [
  { id: "FB-EQ001", name: "Massey Ferguson 385", type: "Tractor", model: "2019 Turbo 85HP", serialNumber: "MF-385-PK-9912", purchaseDate: "2019-04-10", purchasePrice: 2200000, status: "Operational", condition: "Good", lastService: "2026-07-20", nextServiceDue: "2026-09-15", fuelType: "Diesel", dailyConsumption: "35 L/day", hoursRun: 2650, operatorName: "Ghulam Rasool", insuranceExpiry: "2027-03-31", registrationNumber: "MNW-19-4821", notes: "Primary tillage and haulage workhorse." },
  { id: "FB-EQ002", name: "Kirloskar 10HP Pump", type: "Water Pump", model: "2021 High Head Submersible", serialNumber: "KRL-10HP-883", purchaseDate: "2021-06-15", purchasePrice: 85000, status: "Operational", condition: "Excellent", lastService: "2026-08-01", nextServiceDue: "2026-11-01", fuelType: "Solar + 3-Phase Grid", dailyConsumption: "15 kWh/day", hoursRun: 4200, operatorName: "Qasim Shah", insuranceExpiry: "2027-06-30", registrationNumber: "EQ-WP-02", notes: "Solar powered high-discharge canal pump." },
  { id: "FB-EQ003", name: "Perkins Generator", type: "Generator", model: "2020 Silent 50KVA", serialNumber: "PRK-50KVA-771", purchaseDate: "2020-09-20", purchasePrice: 350000, status: "Operational", condition: "Fair", lastService: "2026-08-10", nextServiceDue: "2026-09-10", fuelType: "Diesel", dailyConsumption: "8 L/hr", hoursRun: 1840, operatorName: "Farhan Siddiqui", insuranceExpiry: "2026-12-31", registrationNumber: "EQ-GEN-01", notes: "Backup power for milking parlor and cold storage tanks." },
  { id: "FB-EQ004", name: "Paddy Thresher", type: "Thresher", model: "2018 Heavy Drum Auto", serialNumber: "PTH-2018-44", purchaseDate: "2018-10-05", purchasePrice: 125000, status: "Operational", condition: "Good", lastService: "2026-07-15", nextServiceDue: "2026-09-25", fuelType: "PTO Driven", dailyConsumption: "N/A", hoursRun: 950, operatorName: "Ghulam Rasool", insuranceExpiry: "N/A", registrationNumber: "EQ-TH-04", notes: "Grain separation for wheat and basmati rice." }
];

export const initialMachineryMaintenance = [
  { id: "mnt-1", date: "2026-08-20", equipmentId: "FB-EQ001", equipmentName: "Massey Ferguson 385", workDone: "Engine oil change, air filter replacement & grease pack", cost: 12000, doneBy: "Ustad Mechanix", nextDue: "2026-09-20" },
  { id: "mnt-2", date: "2026-08-10", equipmentId: "FB-EQ003", equipmentName: "Perkins Generator", workDone: "Fuel injector calibration and battery terminal cleaning", cost: 6500, doneBy: "City Electric Service", nextDue: "2026-10-10" }
];

export const initialFuelLogs = [
  { id: "fl-1", date: "2026-08-27", equipment: "Massey Ferguson 385", litersUsed: 35, purpose: "Plot B Basmati Rice plowing", cost: 9975 },
  { id: "fl-2", date: "2026-08-26", equipment: "Perkins Generator", litersUsed: 18, purpose: "Milk chilling backup during grid outage", cost: 5130 }
];

export const initialTasks = [
  { id: "t-1", title: "Morning Milking", category: "Animal Care", priority: "High", status: "Done", dueDate: "2026-08-27", repeat: "Daily", assignee: "Malik Anwar", description: "Collect morning milk from 45 dairy heads and record fat %." },
  { id: "t-2", title: "Animal Vaccination (5 animals)", category: "Animal Care", priority: "High", status: "Pending", dueDate: "2026-08-28", repeat: "One-time", assignee: "Dr. Kamran", description: "Administer FMD booster to high-yielding dairy cows." },
  { id: "t-3", title: "Tractor Oil Change", category: "Maintenance", priority: "Medium", status: "In Progress", dueDate: "2026-08-30", repeat: "Monthly", assignee: "Ghulam Rasool", description: "Service Massey Ferguson 385 engine and inspect hydraulic fluid." },
  { id: "t-4", title: "Update Expense Records", category: "Admin", priority: "Low", status: "Done", dueDate: "2026-08-27", repeat: "Weekly", assignee: "Farm Builder", description: "Log invoices for feed, diesel, and labor payroll in ledger." },
  { id: "t-5", title: "Field B Basmati Rice Fertigation", category: "Crop", priority: "High", status: "Pending", dueDate: "2026-08-28", repeat: "One-time", assignee: "Zulfiqar Ali", description: "Apply Potash and Zinc solution through drip manifold." },
  { id: "t-6", title: "Restock Urea Fertilizer & Fuel", category: "Admin", priority: "High", status: "Pending", dueDate: "2026-08-29", repeat: "One-time", assignee: "Farm Manager", description: "Issue purchase order for 20 bags Urea and 800L diesel." },
  { id: "t-7", title: "Night Perimeter Security Inspection", category: "Maintenance", priority: "Medium", status: "Done", dueDate: "2026-08-27", repeat: "Daily", assignee: "Bashir Khan", description: "Check solar security floodlights and boundary fence." },
  { id: "t-8", title: "Silo Grain Temperature & Moisture Test", category: "Maintenance", priority: "Low", status: "Done", dueDate: "2026-08-26", repeat: "Weekly", assignee: "Farm Manager", description: "Moisture confirmed at 10.8% with zero pest infestation." }
];

export const initialMedicalRecords = [
  { id: "AHMED-MED001", animalId: "AHMED-C001", animalName: "Gulabi", date: "2026-08-20", symptoms: "Udder swelling, mild pain", diagnosis: "Subclinical Mastitis", treatment: "Antibiotic intramammary infusion (7 days)", medicine: "Cloxacillin 500mg + Flunixin", vetName: "Dr. Kamran", cost: 3500, followUpDate: "2026-08-27", status: "Recovered", quarantineStatus: "Recovered in General Herd" },
  { id: "AHMED-MED002", animalId: "AHMED-C003", animalName: "Motia", date: "2026-08-18", symptoms: "Routine Health Checkup", diagnosis: "FMD Vaccine Pre-Booster", treatment: "PPR + FMD Vaccine (1ml s/c)", medicine: "Routine Vaccine", vetName: "Dr. Arif", cost: 500, followUpDate: "2027-08-18", status: "Completed", quarantineStatus: "None" },
  { id: "AHMED-MED003", animalId: "AHMED-C008", animalName: "Bella White", date: "2026-08-25", symptoms: "Mild cough, body temp 39.2°C", diagnosis: "Early Stage Bovine Respiratory Infection", treatment: "Enrofloxacin 10% injection (3-day course)", medicine: "Enrofloxacin + B-Complex", vetName: "Dr. Tariq Mahmood", cost: 4500, followUpDate: "2026-08-28", status: "Ongoing", quarantineStatus: "Quarantined in Pen B" },
  { id: "AHMED-MED004", animalId: "AHMED-S001", animalName: "Kajla King", date: "2026-08-05", symptoms: "Wool shearing inspection", diagnosis: "Mild cutaneous tick infestation", treatment: "Cypermethrin Dip & Ivermectin 1%", medicine: "Ivermectin 1%", vetName: "Dr. Asif Raza", cost: 1800, followUpDate: "2026-09-05", status: "Recovered", quarantineStatus: "None" },
  { id: "AHMED-MED005", animalId: "AHMED-C004", animalName: "Sultan", date: "2026-08-20", symptoms: "Breeding fitness exam", diagnosis: "Optimal Stud Health", treatment: "Electrolyte & Amino Acid Tonic", medicine: "Multivitamin Premix", vetName: "Dr. Tariq Mahmood", cost: 2500, followUpDate: "2026-11-20", status: "Completed", quarantineStatus: "None" }
];

export const initialVaccinationSchedule = [
  { id: "v1", animalId: "AHMED-C001", animalName: "Gulabi", vaccineName: "FMD Vaccine Booster", dateGiven: "2026-02-15", nextDueDate: "2026-08-30", doctor: "Dr. Kamran", cost: 600, status: "Due in 3 Days" },
  { id: "v2", animalId: "AHMED-C003", animalName: "Motia", vaccineName: "PPR Goat Vaccine", dateGiven: "2025-08-20", nextDueDate: "2026-08-29", doctor: "Dr. Arif", cost: 350, status: "Due in 2 Days" },
  { id: "v3", animalId: "AHMED-C004", animalName: "Sultan", vaccineName: "Blackleg & Anthrax", dateGiven: "2026-03-01", nextDueDate: "2026-09-01", doctor: "Dr. Tariq Mahmood", cost: 800, status: "Due in 5 Days" },
  { id: "v4", animalId: "AHMED-P002", animalName: "Golden Misri Layers", vaccineName: "Newcastle Disease (ND Lasota)", dateGiven: "2026-07-15", nextDueDate: "2026-09-15", doctor: "Dr. Asif Raza", cost: 1200, status: "Scheduled" }
];

// Helper to generate 30 days of realistic Pakistani agro-weather
const generate30DaysWeather = () => {
  const log = [];
  const conditions = ["Sunny", "Sunny & Clear", "Partly Cloudy", "Scattered Showers", "Hot & Humid", "Clear Sky"];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const mornTemp = Math.floor(24 + Math.random() * 4);
    const aftTemp = Math.floor(32 + Math.random() * 6);
    const eveTemp = Math.floor(26 + Math.random() * 4);
    const humidity = Math.floor(40 + Math.random() * 25);
    const rainfall = aftTemp > 36 ? 0 : (Math.random() > 0.8 ? Math.floor(Math.random() * 25) : 0);
    const wind = Math.floor(10 + Math.random() * 12);
    const cond = rainfall > 0 ? "Scattered Showers" : (aftTemp >= 36 ? "Hot & Humid (Heat Alert)" : conditions[i % conditions.length]);

    log.push({
      id: `w_${i}`,
      date: dateStr,
      morningTemp: mornTemp,
      afternoonTemp: aftTemp,
      eveningTemp: eveTemp,
      humidity: humidity,
      rainfall: rainfall,
      windSpeed: `${wind} km/h`,
      condition: cond,
      heatStress: aftTemp >= 35 ? "High (Cattle Cooling Active)" : "Normal",
      cropImpact: rainfall > 10 ? "Canal irrigation suspended; soil moisture replenished" : (aftTemp >= 36 ? "High transpiration rate; light evening irrigation required" : "Optimal growing conditions for summer crops"),
      animalPrecautions: aftTemp >= 35 ? "Activate misting fans and ensure fresh saline drinking water in barn" : "Standard grazing and feeding schedule",
      loggedBy: "Qasim Shah (Agro Tech)"
    });
  }
  return log;
};

export const initialWeatherLogs = generate30DaysWeather();

export const initialWeather = {
  current: {
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
  },
  forecast: [
    { day: "Today (Thu)", tempMax: 34, tempMin: 24, condition: "Sunny", rain: "5%", icon: "☀️" },
    { day: "Fri (Aug 28)", tempMax: 35, tempMin: 25, condition: "Partly Cloudy", rain: "10%", icon: "⛅" },
    { day: "Sat (Aug 29)", tempMax: 32, tempMin: 23, condition: "Scattered Showers", rain: "65%", icon: "🌧️" },
    { day: "Sun (Aug 30)", tempMax: 30, tempMin: 22, condition: "Light Rain & Cool", rain: "70%", icon: "🌦️" },
    { day: "Mon (Aug 31)", tempMax: 33, tempMin: 24, condition: "Clear Sky", rain: "0%", icon: "☀️" }
  ]
};

export const initialNotifications = [
  { id: "notif-1", title: "🔴 Sultan (Bull) Under Fever Watch", message: "Check temperature and administer B-Complex in Barn 1.", severity: "critical", time: "10 mins ago", read: false, linkModule: "medical" },
  { id: "notif-2", title: "🟠 FMD Vaccine Due for 5 Animals in 2 Days", message: "Vaccination schedule countdown active. Dr. Kamran notified.", severity: "warning", time: "1 hour ago", read: false, linkModule: "medical" },
  { id: "notif-3", title: "🟠 Urea Fertilizer Stock CRITICALLY LOW", message: "Only 4 bags remaining in warehouse. Refill urgently.", severity: "warning", time: "2 hours ago", read: false, linkModule: "inventory" },
  { id: "notif-4", title: "🟡 Tractor MF385 Service Due in 3 Days", message: "Engine oil change and hydraulic hose inspection scheduled.", severity: "info", time: "4 hours ago", read: false, linkModule: "machinery" },
  { id: "notif-5", title: "🟡 Bashir Khan - 2 Days Absent This Week", message: "Night shift substitute active. Attendance deduction logged.", severity: "info", time: "5 hours ago", read: false, linkModule: "staff" },
  { id: "notif-6", title: "🟢 Morning Milk Record Submitted", message: "Malik Anwar logged 420 Liters @ Grade A across dairy herd.", severity: "success", time: "6 hours ago", read: true, linkModule: "milk" },
  { id: "notif-7", title: "🟢 Monthly Payroll Processed Successfully", message: "August staff wages distributed via HBL bank transfer.", severity: "success", time: "1 day ago", read: true, linkModule: "staff" },
  { id: "notif-8", title: "🟡 Saturday Rainfall Alert (65%)", message: "Monsoon showers expected. Suspend Plot B canal irrigation.", severity: "info", time: "1 day ago", read: true, linkModule: "weather" }
];

export const initialSettings = {
  farmName: "Farm Builder Management System",
  tagline: "Farm Builder — Managing Your Farm, Maximizing Your Future",
  ownerName: "Farm Builder",
  registrationNumber: "PK-AGRO-FB-2026-908",
  contactPhone: "+92 300 1234567",
  contactEmail: "admin@farmbuilder.pk",
  farmLocation: "Mianwali Agro Hub, Punjab, Pakistan",
  farmSize: "125 Acres / 1000 Kanals",
  farmType: "Mixed Enterprise (Dairy + Crops + Livestock)",
  totalAcreage: 125,
  currency: "PKR (₨)",
  measurementUnits: "Metric (Liters, kg, Acres)",
  milkUnit: "Liters",
  weightUnit: "Kg",
  dateFormat: "DD-MM-YYYY",
  fiscalYearStart: "July 1st",
  language: "English",
  themeMode: "Dark VIP Theme",
  backupFrequency: "Daily Automated Cloud Sync"
};
