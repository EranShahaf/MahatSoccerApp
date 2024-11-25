import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

const initialState = {
  competitions: [],
  status: "idle",
  error: null,
};

export const fetchCompetitions = createAsyncThunk(
  "fetchCompetitions",
  async () => {
    const res = await server.get("competitions");
    return res?.data;
  }
);

const competitionsSlice = createSlice({
  name: "competitions",
  initialState,
  extraReducers: {
    [fetchCompetitions.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCompetitions.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.competitions = action.payload;
    },
    [fetchCompetitions.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default competitionsSlice.reducer;

export const selectAllCompetitions = (state) =>
  state.competitions.competitions.competitions;
