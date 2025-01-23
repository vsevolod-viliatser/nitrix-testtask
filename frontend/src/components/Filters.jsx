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
      justifyContent="center"
      alignItems="center"
      gap={2}
      marginBottom={3}
      padding={2}
      border="1px solid #ccc"
      borderRadius={2}
    >
      <TextField
        label="Мін. ціна"
        type="number"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        size="small"
      />
      <TextField
        label="Макс. ціна"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        size="small"
      />
      <TextField
        select
        label="Кількість кімнат"
        value={filters.rooms}
        onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
        size="small"
      >
        <MenuItem value="">Всі</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
      </TextField>

      <Button variant="contained" color="primary" onClick={handleFilter}>
        Застосувати
      </Button>

      {/* Кнопка сброса */}
      {showResetButton && (
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Скинути
        </Button>
      )}
    </Box>
  );
};

export default Filters;
