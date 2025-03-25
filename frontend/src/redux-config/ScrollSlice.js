import { createSlice } from "@reduxjs/toolkit";

const ScrollSlice = createSlice({
  name: "scroll",
  initialState: { isScrollLocked: false },
  reducers: {
    toggleScroll: (state) => {
      state.isScrollLocked = !state.isScrollLocked;
    },
  },
});

export const { toggleScroll } = ScrollSlice.actions;
export default ScrollSlice.reducer;
