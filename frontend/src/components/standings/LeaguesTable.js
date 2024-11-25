import { useEffect } from "react";
import NotTable from "../Table/NotTable";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllStandings,
  fetchStandings,
} from "../../state/slices/standingsSlice";

const tableMapping = {
  MP: "playedGames",
  W: "won",
  D: "draw",
  L: "lost",
  GF: "goalsFor",
  GA: "goalsAgainst",
  GD: "goalDifference",
  Pts: "points",
};

const LeaugesTable = ({ code }) => {
  const dispatch = useDispatch();
  const standings = useSelector(selectAllStandings);
  const standingsStatus = useSelector((state) => {
    return state?.standings?.status;
  });
  const error = useSelector((state) => state?.standings?.isError);

  useEffect(() => {
    if (
      standingsStatus === "idle" ||
      (standingsStatus === "succeeded" && code !== standings.competition.code)
    ) {
      dispatch(fetchStandings(code));
    }
  }, [standingsStatus, dispatch, code]);

  let content;

  if (standingsStatus === "loading") {
  } else if (standingsStatus === "succeeded") {
    content = standings.standings.map((table) => {
      return (
        <NotTable
          key={table.id}
          isLeague={true}
          header={table.group ? table.group : "League Table"}
          table={table.table}
          mapping={tableMapping}
        />
      );
    });
  } else if (standingsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export default LeaugesTable;
