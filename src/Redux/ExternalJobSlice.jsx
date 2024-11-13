// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { externalJobs: [], loading: false, error: false };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchExternalJobs = createAsyncThunk(
  "externalJobs/fetchExternalJobs",
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
const externalJobSlice = createSlice({
  name: "externalJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExternalJobs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchExternalJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.externalJobs = action.payload;
      })
      .addCase(fetchExternalJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.externalJobs = [];
      });
  },
});

export default externalJobSlice.reducer;
