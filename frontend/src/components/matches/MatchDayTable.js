import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MatchDayRow from "./MatchDayRow";
import TableCell from "@mui/material/TableCell";
import { TablePagination } from "@mui/material";
import { useStyles } from "../theme";

const MatchDayTable = ({ matches }) => {
  const [matchday, setMatchday] = React.useState(0);

  const handleChangePage = (_, newMatchDay) => {
    setMatchday(newMatchDay);
  };

  const classes = useStyles();

  const maxMatchday = matches.competition
    ? Math.max(...matches.matches.map((match) => match.matchday))
    : null;

  const filterMatches = matches.competition
    ? matches.matches.filter(
        (matches) =>
          matches.matchday === matchday + 1 && matches.homeTeam.id !== null
      )
    : matches.matches;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell align="center" colSpan={4}>
              Games and results
            </TableCell>
          </TableRow>
          <TableRow className={classes.secondHeader}>
            <TableCell align="left" width={10} />
            <TableCell align="left" width={10} />
            <TableCell align="center" width={10}>
              Game
            </TableCell>
            <TableCell align="center" width={120}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody classes={classes.header}>
          {filterMatches.map((row) => (
            <MatchDayRow key={row.name} row={row} />
          ))}
        </TableBody>
        {matches.competition ? (
          <TablePagination
            rowsPerPageOptions={[1]}
            count={maxMatchday}
            rowsPerPage={1}
            page={matchday}
            onPageChange={handleChangePage}
            labelDisplayedRows={(from = matchday) =>
              `Matchday ${from.to === -1 ? from.count : from.to} of ${
                from.count
              }`
            }
          />
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default MatchDayTable;
