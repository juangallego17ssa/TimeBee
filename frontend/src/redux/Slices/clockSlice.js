import { createSlice } from "@reduxjs/toolkit";

export const clockSlice = createSlice({
    name: "clock",
    initialState: {
        clockID: null,
        clockStart: "",
        clockStop: "",
        clockDuration: 0,
        clockTimer: ""
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
        },
        setClockDuration: (state, action) => {
            state.clockDuration = action.payload;
        },
        setClockTimer: (state, action) => {
            state.clockTimer = action.payload;
        }
    }
});

export const { setClockID, setClockStart, setClockStop , setClockDuration, setClockTimer } = clockSlice.actions;
export default clockSlice.reducer;
