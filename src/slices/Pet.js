import { createSlice } from "@reduxjs/toolkit";

export const petSlice = createSlice({
  name: "pet",
  initialState: {
    showMoreBtn: false,
    aboptedPet: null,
  },
  reducers: {
    setShowMoreBtn: (state, action) => {
      state.showMoreBtn = action.payload;
    },
    setAdoptedPet: (state, action) => {
      state.aboptedPet = action.payload;
    },
  },
});

export const { setShowMoreBtn, setAdoptedPet } = petSlice.actions;

export default petSlice.reducer;
