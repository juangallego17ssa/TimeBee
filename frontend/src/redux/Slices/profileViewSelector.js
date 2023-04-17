import { createSlice } from "@reduxjs/toolkit";

export const profileViewSelector = createSlice({
  name: "profile-filter",
  initialState: {
    profileview: "reviews",
  },
  reducers: {
    setProfileView: (state, action) => {
      state.profileview = action.payload;
    },
  },
});
export const { setProfileView } = profileViewSelector.actions;
export default profileViewSelector.reducer;