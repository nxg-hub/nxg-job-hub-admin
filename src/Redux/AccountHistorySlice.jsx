// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  loading: false,
  error: "",
  success: false,
};
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchAccHistory = createAsyncThunk(
  "accHistory/fetchAccHistory",
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
const accountHistorySlice = createSlice({
  name: "accHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history = action.payload;
        state.success = true;
      })
      .addCase(fetchAccHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.history = [];
        state.success = false;
      });
  },
});

export default accountHistorySlice.reducer;
