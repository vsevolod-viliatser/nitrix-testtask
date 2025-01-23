require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const apartmentRoutes = require("./routes/apartmentRoutes");
const path = require("path")
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/apartments", apartmentRoutes);
// Раздача статических файлов
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Обработка остальных маршрутов для React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));