const express = require("express");
const router = express.Router();
const { addApartment, getApartments, updateApartment, deleteApartment } = require("../controllers/apartmentController");

router.post("/", addApartment);
router.get("/", getApartments);
router.put("/:id", updateApartment);
router.delete("/:id", deleteApartment);

module.exports = router;