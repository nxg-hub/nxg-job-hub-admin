// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  employer: [],
  loading: false,
  error: "",
  success: false,
};
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

export const fetchEmployer = createAsyncThunk(
  "employer/fetchTlent",
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
const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    resetEmployer: (state) => {
      state.success = false;
      state.employer = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.employer = action.payload;
        state.success = true;
      })
      .addCase(fetchEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.employer = [];
        state.success = false;
      });
  },
});
export const { resetEmployer } = employerSlice.actions;
export default employerSlice.reducer;
