import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const Filters = ({ onFilter, filtersApplied }) => {
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", rooms: "" });

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = { minPrice: "", maxPrice: "", rooms: "" };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  // Скрывать или показывать кнопку "Скинути"
  const showResetButton = filters.minPrice || filters.maxPrice || filters.rooms || filtersApplied;

  return (
    <Box
    display="flex"
    flexDirection="column" // Вертикальное размещение для мобильных
    gap={2}
    marginBottom={3}
    padding={2}
    border="1px solid #ccc"
    borderRadius={2}
    sx={{
      width: "100%", // Полная ширина контейнера
      maxWidth: "800px", // Ограничение ширины для больших экранов
      "@media (min-width: 768px)": {
        flexDirection: "row", // Горизонтальное размещение для больших экранов
      },
    }}
  >
    <TextField
      label="Мін. ціна"
      type="number"
      value={filters.minPrice}
      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      size="small"
      fullWidth
    />
    <TextField
      label="Макс. ціна"
      type="number"
      value={filters.maxPrice}
      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      size="small"
      fullWidth
    />
    <TextField
      select
      label="Кількість кімнат"
      value={filters.rooms}
      onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
      size="small"
      fullWidth
    >
      <MenuItem value="">Всі</MenuItem>
      <MenuItem value="1">1</MenuItem>
      <MenuItem value="2">2</MenuItem>
      <MenuItem value="3">3</MenuItem>
    </TextField>
  
    <Box display="flex" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFilter}
        sx={{ flex: 1 }} // Растягивает кнопку
      >
        Застосувати
      </Button>
  
      {showResetButton && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          sx={{ flex: 1 }} // Растягивает кнопку
        >
          Скинути
        </Button>
      )}
    </Box>
  </Box>
  );
};

export default Filters;
