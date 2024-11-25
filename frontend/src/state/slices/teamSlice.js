import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

const initialState = {
  team: {},
  status: "idle",
  error: null,
};

export const fetchTeam = createAsyncThunk("fetchTeam", async (teamCode) => {
  const res = await server.get(`teams/${teamCode}`);

  return res?.data;
});

const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: {
    [fetchTeam.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeam.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.team = action.payload;
    },
    [fetchTeam.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default teamSlice.reducer;

export const selectTeam = (state) => state.team.team;
