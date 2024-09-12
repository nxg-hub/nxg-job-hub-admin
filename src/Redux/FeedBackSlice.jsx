// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  feedback: [],
  loading: false,
  error: "",
  feedbackModal: false,
  employerID: "",
};
const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

export const fetchEmployerFeedBack = createAsyncThunk(
  "feedback/fetchFeedback",
  async (url) => {
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
  }
);
const FeedBackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedBackModalTrue: (state, action) => {
      state.feedbackModal = true;
      state.employerID = action.payload;
    },
    setFeedBackModalFalse: (state) => {
      state.feedbackModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerFeedBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerFeedBack.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feedback = action.payload;
      })
      .addCase(fetchEmployerFeedBack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.feedback = [];
      });
  },
});
export const { setFeedBackModalFalse, setFeedBackModalTrue } =
  FeedBackSlice.actions;
export default FeedBackSlice.reducer;
