import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  provider: [],
  loading: false,
  error: "",
  success: false,
};

// ✅ Fetch provider with pagination
export const fetchProvider = createAsyncThunk(
  "provider/fetchProvider",
  async ({ page, size }) => {
    const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));

    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/admin/SERVICE_PROVIDER?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
      }
    );

    return await res.json(); // returns the object with content, totalPages, size, number
  }
);

const serviceProviderSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    resetProvider: (state) => {
      state.success = false;
      state.provider = [];
      state.error = "";
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.provider = action.payload;
      })

      .addCase(fetchProvider.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.provider = [];
      });
  },
});

export const { resetProvider } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
