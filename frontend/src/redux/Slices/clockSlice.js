import { createSlice } from "@reduxjs/toolkit";

export const clockSlice = createSlice({
    name: "clock",
    initialState: {
        clockID: null,
        clockStart: "",
        clockStop: ""
    },
    reducers: {
        setClockID: (state, action) => {
            state.clockID = action.payload;
        },
        setClockStart: (state, action) => {
            state.clockStart = action.payload;
        },
        setClockStop: (state, action) => {
            state.clockStop = action.payload;
        }
    }
});

export const { setClockID, setClockStart, setClockStop } = clockSlice.actions;
export default clockSlice.reducer;
