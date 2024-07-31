// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { jobs: [], loading: false, error: "" };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchJobs = createAsyncThunk("job/fetchjob", async (url) => {
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
      return data?.content ?? [];
    });
});
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.jobs = [];
      });
  },
});

export default jobSlice.reducer;
