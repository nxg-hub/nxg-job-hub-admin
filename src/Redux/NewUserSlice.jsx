// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  newTalents: [],
  newEmployers: [],
  newProviders: [],
  loading: false,
  success: false,
  employerSuccess: false,
  providerSuccess: false,
  error: "",
};

export const fetchNewTalent = createAsyncThunk(
  "talentNew/fetchNewTalent",
  async ({ page, size }) => {
    const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));

    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/new-talents-in-the-one-past-week?page=${page}&size=${size}`,
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

export const fetchNewEmployer = createAsyncThunk(
  "employerNew/fetchNewEmployer",
  async ({ page, size }) => {
    const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));

    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/new-employers-in-the-one-past-week?page=${page}&size=${size}`,
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

export const fetchNewProviders = createAsyncThunk(
  "providerNew/fetchNewProviders",
  async ({ page, size }) => {
    const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));

    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/new-serviceProviders-in-the-one-past-week?page=${page}&size=${size}`,
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
const newUserSlice = createSlice({
  name: "newUsers",
  initialState,
  reducers: {
    resetNewUsers: (state) => {
      state.success = false;
      state.newTalents = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewTalent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newTalents = action.payload.content;
        state.success = true;
      })

      .addCase(fetchNewTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newTalents = [];
        state.success = false;
      })
      //New employers
      .addCase(fetchNewEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newEmployers = action.payload.content;
        state.employerSuccess = true;
      })

      .addCase(fetchNewEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newEmployers = [];
        state.employerSuccess = false;
      })
      //New service providers
      .addCase(fetchNewProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newProviders = action.payload.content;
        state.providerSuccess = true;
      })

      .addCase(fetchNewProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newProviders = [];
        state.providerSuccess = false;
      });
  },
});
export const { resetNewUsers } = newUserSlice.actions;

export default newUserSlice.reducer;
