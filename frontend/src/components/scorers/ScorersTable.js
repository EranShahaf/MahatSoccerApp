import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllScorers,
  fetchScorers,
} from "../../state/slices/scorersSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStyles } from "../theme";
import { OneTeam } from "../teams/OneTeam";

const tableMapping = {
  Goals: "goals",
  Assists: "assists",
  Penalties: "penalties",
  "Games played": "playedMatches",
};

export const ScorersTable = ({ code }) => {
  const classes = useStyles();
  const TableHeader = (
    <TableRow className={classes.secondHeader}>
      <TableCell align="Left">Player</TableCell>

      {Object.keys(tableMapping).map((key) => (
        <TableCell align="center">{key}</TableCell>
      ))}
      {
        <TableCell align="center" width="120px">
          Club
        </TableCell>
      }
    </TableRow>
  );
  const dispatch = useDispatch();
  const scorers = useSelector(selectAllScorers);
  const scorersStatus = useSelector((state) => {
    return state?.scorers?.status;
  });
  const error = useSelector((state) => state?.scorers?.isError);

  useEffect(() => {
    if (
      scorersStatus === "idle" ||
      (scorersStatus === "succeeded" && code !== scorers.competition.code)
    ) {
      dispatch(fetchScorers(code));
    }
  }, [scorersStatus, dispatch, code]);

  let content;

  if (scorersStatus === "loading") {
  } else if (scorersStatus === "succeeded") {
    content = (
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell align="center" colSpan={12}>
                Top scorers
              </TableCell>
            </TableRow>
            {TableHeader}
          </TableHead>
          <TableBody>
            {scorers.scorers.map((row) => {
              return (
                <TableRow key={row.name} className={classes.row}>
                  <TableCell align="left">{row.player.name}</TableCell>

                  {Object.values(tableMapping).map((value) => (
                    <TableCell align="center">{row[value]}</TableCell>
                  ))}

                  <TableCell align="right" sx={{ show: "false" }}>
                    <OneTeam key={row.id} team={row.team} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (scorersStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};
