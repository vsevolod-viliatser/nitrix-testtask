import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchApartments = createAsyncThunk("apartments/fetch", async (filters) => {
  const response = await axios.get('/api/apartments', { params: filters });
  return response.data;
});

export const addApartment = createAsyncThunk("apartments/add", async (apartment) => {
  const response = await axios.post('/api/apartments', apartment);
  return response.data;
});

export const updateApartment = createAsyncThunk("apartments/update", async ({ id, apartment }) => {
  const response = await axios.put(`/api/apartments/${id}`, apartment);
  return response.data;
});

export const deleteApartment = createAsyncThunk("apartments/delete", async (id) => {
  await axios.delete(`/api/apartments/${id}`);
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
