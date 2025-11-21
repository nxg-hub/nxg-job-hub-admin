// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  talents: [],
  featuredTalent: [],
  loading: false,
  success: false,
  featuredSuccess: false,
  error: "",
};

export const fetchTalent = createAsyncThunk(
  "talent/fetchTalent",
  async ({ page, size }) => {
    const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));

    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/techTalent?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
      }
    );

    return await response.json();
  }
);

export const fetchFeaturedTalent = createAsyncThunk(
  "featuredTalent/fetchFeaturedTalent",
  async () => {
    const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/talents/featured`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
      }
    );

    return await response.json();
  }
);

const talentSlice = createSlice({
  name: "talent",
  initialState,
  reducers: {
    resetTalent: (state) => {
      state.success = false;
      state.talents = [];
      state.featuredTalent = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.talents = action.payload;
        state.success = true;
      })

      .addCase(fetchTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.talents = [];
        state.success = false;
      })
      .addCase(fetchFeaturedTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTalent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.featuredTalent = action.payload;
        state.featuredSuccess = true;
      })

      .addCase(fetchFeaturedTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.featuredTalent = [];
        state.featuredSuccess = false;
      });
  },
});
export const { resetTalent } = talentSlice.actions;

export default talentSlice.reducer;
