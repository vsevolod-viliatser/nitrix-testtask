import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Для продакшн-окружения можно использовать относительный путь
const API_URL = import.meta.env.VITE_API_URL || '/api/apartments';

export const fetchApartments = createAsyncThunk("apartments/fetch", async (filters) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
});

export const addApartment = createAsyncThunk("apartments/add", async (apartment) => {
  const response = await axios.post(API_URL, apartment);
  return response.data;
});

export const updateApartment = createAsyncThunk("apartments/update", async ({ id, apartment }) => {
  const response = await axios.put(`${API_URL}/${id}`, apartment);
  return response.data;
});

export const deleteApartment = createAsyncThunk("apartments/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const apartmentSlice = createSlice({
  name: "apartments",
  initialState: { apartments: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.apartments = action.payload;
        state.loading = false;
      })
      .addCase(addApartment.fulfilled, (state, action) => {
        state.apartments.push(action.payload);
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        const index = state.apartments.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) state.apartments[index] = action.payload;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.apartments = state.apartments.filter((a) => a._id !== action.payload);
      });
  },
});


export default apartmentSlice.reducer;
