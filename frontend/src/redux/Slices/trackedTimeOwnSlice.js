import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrackedTimeOwn = createAsyncThunk(
  "fetchTrackedTimeOwn",
  async () => {
    const Token = localStorage.getItem("access");
    if (Token) {
      let myHeaders = new Headers();
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      myHeaders.append("Authorization", `Bearer ${Token}`);
      return fetch(
        "https://timebee.propulsion-learn.ch/backend/api/trackedtime/own/",
        requestOptions
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
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
