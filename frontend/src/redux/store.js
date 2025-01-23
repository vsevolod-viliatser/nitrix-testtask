
import { configureStore } from "@reduxjs/toolkit";
import apartmentReducer from "./apartmentSlice";

export const store = configureStore({
  reducer: {
    apartments: apartmentReducer,
  },
});