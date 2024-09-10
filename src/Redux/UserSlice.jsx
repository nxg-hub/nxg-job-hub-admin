import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  user: [],
  loading: false,
  error: false,
};
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

export const fetchUser = createAsyncThunk("user/fetchUser", async (url) => {
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
});
export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = [];
      });
  },
});

export default userSlice.reducer;
