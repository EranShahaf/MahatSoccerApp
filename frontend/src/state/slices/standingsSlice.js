import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

const initialState = {
  standings: [],
  status: "idle",
  error: null,
};

export const fetchStandings = createAsyncThunk(
  "fetchStandings",
  async ( leagueCode ) => {
    const res = await server.get(`competitions/${leagueCode}/standings`);
    return res?.data;
  }
);

const standingsSlice = createSlice({
  name: "standings",
  initialState,
  extraReducers: {
    [fetchStandings.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStandings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.standings = action.payload;
    },
    [fetchStandings.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  },
});

export default standingsSlice.reducer;

export const selectAllStandings = (state) =>
  state.standings.standings;
