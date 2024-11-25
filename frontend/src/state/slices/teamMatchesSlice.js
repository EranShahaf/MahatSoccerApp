import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

const initialState = {
  teamMatches: [],
  status: "idle",
  error: null,
};

export const fetchTeamMatches = createAsyncThunk(
  "fetchTeamMatches",
  async (teamCode) => {
    const res = await server.get(`teams/${teamCode}/matches`);
    return res?.data;
  }
);

const teamMatchesSlice = createSlice({
  name: "teamMatches",
  initialState,
  extraReducers: {
    [fetchTeamMatches.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeamMatches.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.teamMatches = action.payload;
    },
    [fetchTeamMatches.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default teamMatchesSlice.reducer;

export const selectAllTeamMatches = (state) => state.teamMatches.teamMatches;
