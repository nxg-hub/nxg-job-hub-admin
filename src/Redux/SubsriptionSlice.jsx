// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { sub: [], loading: false, error: false, success: false };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchSub = createAsyncThunk("sub/fetchSub", async (url) => {
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
});
const subSlice = createSlice({
  name: "sub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSub.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sub = action.payload;
        state.success = true;
      })
      .addCase(fetchSub.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.sub = [];
        state.success = false;
      });
  },
});

export default subSlice.reducer;
