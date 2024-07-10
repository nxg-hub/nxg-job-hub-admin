import { createSlice } from "@reduxjs/toolkit";

const initialState = { loader: false };
export const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state) => {
      state.loader = !state.loader;
    },
  },
});

export const { setLoader } = LoaderSlice.actions;

export default LoaderSlice.reducer;
