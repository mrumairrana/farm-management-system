const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm" },
  animalId: { type: String, required: true, unique: true },
  name: { type: String, default: "" },
  species: { type: String, default: "Cattle" },
  category: { type: String, required: true },
  breed: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: String, default: "" },
  weight: { type: Number, required: true },
  motherId: { type: String, default: "" },
  fatherId: { type: String, default: "" },
  purchaseDate: { type: String, default: "" },
  purchasePrice: { type: Number, default: 0 },
  status: { type: String, default: "Active" },
  healthStatus: { type: String, default: "Healthy" },
  vaccinationStatus: { type: String, default: "Up to Date" },
  lastCheckup: { type: String, default: "" },
  milkingQuantity: { type: Number, default: 0 },
  feedType: { type: String, default: "" },
  symptoms: { type: String, default: "" },
  medicine: { type: String, default: "" },
  notes: { type: String, default: "" },
  weightHistory: [
    {
      date: { type: String },
      weight: { type: Number }
    }
  ],
  medicalHistory: [
    {
      date: { type: String },
      diagnosis: { type: String },
      treatment: { type: String },
      vet: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Animal", AnimalSchema);

