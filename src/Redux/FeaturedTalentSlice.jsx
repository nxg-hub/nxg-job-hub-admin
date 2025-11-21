import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { featuredTalent: [], loading: false, error: "" };
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

export const fetchFeaturedTalent = createAsyncThunk(
  "featuredTalent/fetchFeaturedTalent",
  async (url) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fullUrl = `${baseUrl}/${url}`; // Ensure there is a `/` if needed

    return await fetch(fullUrl, {
      method: " GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
    })
      .then((res) => res.json())
      .then((data) => data?.content ?? []);
  }
);

const featuredTalentSlice = createSlice({
  name: "featuredTalent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTalent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.featuredTalent = action.payload;
      })
      .addCase(fetchFeaturedTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.featuredTalent = [];
      });
  },
});

export default featuredTalentSlice.reducer;
