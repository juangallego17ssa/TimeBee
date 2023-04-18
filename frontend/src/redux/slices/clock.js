import { createSlice } from "@reduxjs/toolkit";

export const clockSlice = createSlice({
    name: "clock",
    initialState: {
        myID: null,
        myStart: "",
        myStop: ""
    },
    reducers: {
        clockReducer: (state, action) => {
            state.myID = action.payload.id;
        }
    }
}

export const { clockReducer } = clockSlice.actions;
export default mySlice.reducer;
