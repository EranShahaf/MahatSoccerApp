import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

const initialState = {
  matches: [],
  status: "idle",
  error: null,
};

export const fetchMatches = createAsyncThunk(
  "fetchMatches",
  async (leagueCode) => {
    const res = await server.get(`competitions/${leagueCode}/matches`);
    
    return res?.data;
  }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  extraReducers: {
    [fetchMatches.pending]: (state) => {
      state.status = "loading";
    },
    [fetchMatches.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.matches = action.payload;
    },
    [fetchMatches.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  },
});

export default matchesSlice.reducer;

export const selectAllMatches = (state) => state.matches.matches;

