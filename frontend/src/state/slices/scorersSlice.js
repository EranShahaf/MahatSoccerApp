import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

const initialState = {
  scorers: [],
  status: "idle",
  error: null,
};

export const fetchScorers = createAsyncThunk(
  "fetchScorers",
  async ( leagueCode ) => {
    const res = await server.get(`competitions/${leagueCode}/scorers`);
    return res?.data;
  }
);

const scorersSlice = createSlice({
  name: "scorers",
  initialState,
  extraReducers: {
    [fetchScorers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchScorers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.scorers = action.payload;
    },
    [fetchScorers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  },
});

export default scorersSlice.reducer;

export const selectAllScorers = (state) =>
  state.scorers.scorers;
