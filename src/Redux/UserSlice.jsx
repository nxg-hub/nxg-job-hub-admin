import { createSlice } from "@reduxjs/toolkit";
const initialState = { talent: [], employer: [] };
export const userSlice = createSlice({
  name: "Talent",
  initialState,
  reducers: {
    dataTalent: (state, action) => {
      const data = {
        dataTalent: action.payload,
      };
      //pushing the data to the state object in this slice
      state.talent.push(data);
    },
    dataEmployer: (state, action) => {
      const data = {
        dataEmployer: action.payload,
      };
      //pushing the data to the state object in this slice
      state.employer.push(data);
    },
  },
});

//keep adding the reducers' names to make them available globally
export const { dataTalent, dataEmployer } = userSlice.actions;

export default userSlice.reducer;
