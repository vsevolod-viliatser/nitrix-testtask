const Apartment = require("../models/apartmentModel");

// Добавление квартиры
exports.addApartment = async (req, res) => {
  try {
    const apartment = new Apartment(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение списка квартир с фильтрами
exports.getApartments = async (req, res) => {
  try {
    const { minPrice, maxPrice, rooms } = req.query;
    const filters = {};
    if (minPrice || maxPrice) filters.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    if (rooms) filters.rooms = rooms;

    const apartments = await Apartment.find(filters);
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление квартиры
exports.updateApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление квартиры
exports.deleteApartment = async (req, res) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.json({ message: "Apartment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};