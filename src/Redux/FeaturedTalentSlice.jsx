// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = { featuredTalent: [], loading: false, error: "" };
// const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

// export const fetchFeaturedTalent = createAsyncThunk(
//   "featuredTalent/fetchFeaturedTalent",
//   async (url) => {
//     const baseUrl = import.meta.env.VITE_BASE_URL;
//     const fullUrl = `${baseUrl}/${url}`; // Ensure there is a `/` if needed

//     return await fetch(fullUrl, {
//       method: " GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
//         Authorization: token.token,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => data?.content ?? []);
//   }
// );

// const featuredTalentSlice = createSlice({
//   name: "featuredTalent",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFeaturedTalent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFeaturedTalent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.featuredTalent = action.payload;
//       })
//       .addCase(fetchFeaturedTalent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.featuredTalent = [];
//       });
//   },
// });

// export default featuredTalentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

const initialState = {
  featuredTalent: [],
  loading: false,
  error: null,

  page: 0,
  size: 5,
  totalPages: 0,
  totalElements: 0,
  last: false,
};

export const fetchFeaturedTalent = createAsyncThunk(
  "featuredTalent/fetchFeaturedTalent",
  async ({ page = 0, size = 5 }, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const url = `${baseUrl}/api/talents/featured?page=${page}&size=${size}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token?.token,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch featured talent");

      return await res.json(); // full paginated response
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const featuredTalentSlice = createSlice({
  name: "featuredTalent",
  initialState,
  reducers: {
    resetFeaturedTalent: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTalent.fulfilled, (state, action) => {
        const payload = action.payload;

        state.loading = false;
        state.error = null;

        // 🔹 server-side pagination (replace list per page)
        state.featuredTalent = payload.content;

        state.page = payload.pageable.pageNumber;
        state.size = payload.pageable.pageSize;
        state.totalPages = payload.totalPages;
        state.totalElements = payload.totalElements;
        state.last = payload.last;
      })
      .addCase(fetchFeaturedTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFeaturedTalent } = featuredTalentSlice.actions;
export default featuredTalentSlice.reducer;
