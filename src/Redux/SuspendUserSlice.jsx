// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { suspend: false, loading: false, error: "" };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const suspendUser = createAsyncThunk(
  "suspendUser/suspendUser",
  async (url, msg) => {
    return await fetch(
      url,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token.token,
        },
        body: JSON.stringify({ disapprovalReason: msg }),
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("hey");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);
const suspendUserSlice = createSlice({
  name: "suspendUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(suspendUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.suspend = true;
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.suspend = false;
      });
  },
});

export default suspendUserSlice.reducer;
