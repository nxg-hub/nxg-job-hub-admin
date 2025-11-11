// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  talents: [],
  vettedTalent: [],
  loading: false,
  success: false,
  error: "",
};
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
export const fetchTalent = createAsyncThunk(
  "talent/fetchTlent",
  async (url) => {
    return await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }
);
const talentSlice = createSlice({
  name: "talent",
  initialState,
  reducers: {
    vettedTalent: (state, action) => {
      const data = {
        dataVettedTalent: action.payload,
      };
      //pushing the data to the state object in this slice
      state.vettedTalent.push(data);
    },
    removeVettedTalent: (state, action) => {
      const id = action.payload;
      state.vettedTalent = state.talents.filter((talent) => {
        return talent.user.id === id;
      });
    },
    resetTalent: (state) => {
      state.success = false;
      state.talents = [];
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
      });
  },
});
export const { vettedTalent, removeVettedTalent, resetTalent } =
  talentSlice.actions;

export default talentSlice.reducer;
