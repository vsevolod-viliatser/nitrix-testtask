require("dotenv").config();
const express = require("express");
const path = require("path")
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const apartmentRoutes = require("./routes/apartmentRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/apartments", apartmentRoutes);
// Раздача статических файлов из папки frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));
const cors = require('cors');

app.use(cors({
  origin: '*',  // или укажите точный домен, если хотите ограничить доступ
}));

// Обработка всех остальных маршрутов (для React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));