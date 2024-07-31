// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { health: [], loading: false, error: false };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchHealth = createAsyncThunk(
  "health/fetchHealth",
  async (url) => {
    return await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
);
const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealth.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.health = action.payload;
      })
      .addCase(fetchHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.health = [];
      });
  },
});

export default healthSlice.reducer;
