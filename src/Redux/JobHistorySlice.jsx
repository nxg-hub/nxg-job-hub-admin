// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  loading: false,
  error: "",
  success: false,
};
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchJobHistory = createAsyncThunk(
  "jobHistory/fetchJobHistory",
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
        return data.content;
      });
  }
);
const jobHistorySlice = createSlice({
  name: "jobHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history = action.payload;
        state.success = true;
      })
      .addCase(fetchJobHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.history = [];
        state.success = false;
      });
  },
});

export default jobHistorySlice.reducer;
