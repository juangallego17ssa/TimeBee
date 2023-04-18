import { createSlice } from "@reduxjs/toolkit";

export const signUpEmailAddress = createSlice({
  name: "signupemail",
  initialState: {
    signupemail: "",
  },
  reducers: {
    setSignUpEmail: (state, action) => {
      state.signupemail = action.payload;
    },
  },
});
export const { setSignUpEmail } = signUpEmailAddress.actions;
export default signUpEmailAddress.reducer;
