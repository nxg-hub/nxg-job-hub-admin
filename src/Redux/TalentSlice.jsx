// Slice
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  talents: [],
  vettedTalent: [],
  loading: false,
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
      })
      .addCase(fetchTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.talents = [];
      });
  },
});
export const { vettedTalent, removeVettedTalent } = talentSlice.actions;

export default talentSlice.reducer;
