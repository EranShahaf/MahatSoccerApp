import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamMatches,
  selectAllTeamMatches,
} from "../../state/slices/teamMatchesSlice";
import MatchDayTable from "./MatchDayTable";
import { useEffect } from "react";

const TeamMatches = ({ teamId }) => {
  const dispatch = useDispatch();
  const matches = useSelector(selectAllTeamMatches);
  const matchesStatus = useSelector((state) => state?.teamMatches?.status);
  const error = useSelector((state) => state?.teamMatches?.isError);
  const minMatches = 5;

  useEffect(() => {
    if (
      matchesStatus === "idle" ||
      (matchesStatus === "succeeded" &&
        matches.matches.filter(
          (match) => teamId == match.homeTeam.id || teamId == match.awayTeam.id
        ).length < minMatches)
    ) {
      dispatch(fetchTeamMatches(teamId));
    }
  }, [matchesStatus, dispatch, teamId]);

  let content;

  if (matchesStatus === "loading") {
  } else if (matchesStatus === "succeeded") {
    content = <MatchDayTable matches={matches} />;
  } else if (matchesStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export default TeamMatches;
