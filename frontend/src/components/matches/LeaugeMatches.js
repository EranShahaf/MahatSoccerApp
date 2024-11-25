import { useSelector, useDispatch } from "react-redux";
import {
  fetchMatches,
  selectAllMatches,
} from "../../state/slices/matchesSlice";
import MatchDayTable from "./MatchDayTable";
import { useEffect } from "react";

const LeaugeMatches = ({code}) => {
  const dispatch = useDispatch();
  const matches = useSelector(selectAllMatches);
  const matchesStatus = useSelector((state) => state?.matches?.status);
  const error = useSelector((state) => state?.matches?.isError);

  useEffect(() => {
    if (
        matchesStatus === "idle" ||
        (matchesStatus === "succeeded" && code !== matches.competition.code)
      ) {
        dispatch(fetchMatches(code));
      }
    }, [matchesStatus, dispatch, code]);

  let content;

  if (matchesStatus === "loading") {
  } else if (matchesStatus === "succeeded") {
    content = <MatchDayTable matches={matches} />;
  } else if (matchesStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export default LeaugeMatches;