// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { transaction: [], loading: false, error: false };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchTransactions = createAsyncThunk(
  "sub/fetchTransactions",
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
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transaction = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.transaction = [];
      });
  },
});

export default transactionSlice.reducer;
