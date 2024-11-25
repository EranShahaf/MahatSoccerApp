import { configureStore } from "@reduxjs/toolkit";
import competitionsReducer from "./slices/competitionsSlice";
import standingsReducer from "./slices/standingsSlice";
import scorersReducer from "./slices/scorersSlice";
import matchesReducer from "./slices/matchesSlice";
import teamReducer from "./slices/teamSlice";
import teamMatchesReducer from "./slices/teamMatchesSlice";
import userReducer from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    competitions: competitionsReducer,
    standings: standingsReducer,
    matches: matchesReducer,
    team: teamReducer,
    teamMatches: teamMatchesReducer,
    scorers: scorersReducer,
    user: userReducer,
  },
});
