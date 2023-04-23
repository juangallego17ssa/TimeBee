import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrackedTimeOwn = createAsyncThunk(
  "fetchTrackedTimeOwn",
  async () => {
    const Token = localStorage.getItem("access");
    if (Token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "https://timebee.propulsion-learn.ch/backend/api/trackedtime/",
          requestOptions
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
);


export const trackedTimeOwnSlice = createSlice({
  name: "trackedTime",
  initialState: {
    trackedtime: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackedTimeOwn.fulfilled, (state, action) => {
      state.trackedtime = action.payload;
    });
    builder.addCase(fetchTrackedTimeOwn.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(fetchTrackedTimeOwn.pending, (state, action) => {
      console.log("fetching started");
    });
  },
});
export const { setRequests } = trackedTimeOwnSlice.actions;
export default trackedTimeOwnSlice.reducer;
