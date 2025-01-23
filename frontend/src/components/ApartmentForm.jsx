
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addApartment, updateApartment } from "../redux/apartmentSlice";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const ApartmentForm = ({ apartment, onClose }) => {
  const [form, setForm] = useState({ title: "", description: "", price: "", rooms: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (apartment) setForm(apartment);
  }, [apartment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apartment) {
      dispatch(updateApartment({ id: apartment._id, apartment: form }));
    } else {
      dispatch(addApartment(form));
    }
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      padding={3}
      border="1px solid #ccc"
      borderRadius={2}
    >
      <TextField
        label="Заголовок"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        slotProps={{ maxLength: 90 }}
        required
      />
      <TextField
        label="Опис"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        slotProps={{ maxLength: 335 }}
        multiline
        rows={3}
        required
      />
      <TextField
        label="Ціна"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <TextField
        select
        label="Кількість кімнат"
        value={form.rooms}
        onChange={(e) => setForm({ ...form, rooms: e.target.value })}
        required
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Зберегти
      </Button>
    </Box>
  );
};

export default ApartmentForm;