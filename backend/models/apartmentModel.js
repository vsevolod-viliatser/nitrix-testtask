const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 90 },
  description: { type: String, required: true, maxlength: 335 },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true, enum: [1, 2, 3] },
  photos: { type: [String], default: [] }, // массив строк для URL-ов фото
});

module.exports = mongoose.model("Apartment", ApartmentSchema);