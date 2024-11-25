import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LastMatches from "../standings/LastMatches";
import { useStyles } from "../theme";
import { OneTeam } from "../teams/OneTeam";

const NotTable = ({ isLeague, mapping, header, table }) => {
  const classes = useStyles();
  const TableHeader = (
    <TableRow className={classes.secondHeader}>
      {isLeague && (
        <>
          <TableCell width="1px" />
          <TableCell align="Left">Club</TableCell>
        </>
      )}
      {Object.keys(mapping).map((key) => (
        <TableCell align="center" width="15px">
          {key}
        </TableCell>
      ))}
      {isLeague && (
        <TableCell align="center" width="120px">
          Last 5
        </TableCell>
      )}
    </TableRow>
  );

  return (
    <TableContainer component={Paper} style={{ overflowX: "auto" }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell align="center" colSpan={12}>
              {header}
            </TableCell>
          </TableRow>
          {TableHeader}
        </TableHead>
        <TableBody>
          {table.map((row) => {
            return (
              <TableRow key={row.name} className={classes.row}>
                {isLeague && (
                  <>
                    <TableCell align="left">{row.position}</TableCell>
                    <OneTeam key={row.id} team={row.team} />
                  </>
                )}
                {Object.values(mapping).map((value) => (
                  <TableCell align="center">{row[value]}</TableCell>
                ))}
                {isLeague && (
                  <TableCell align="right" sx={{ show: "false" }}>
                    <LastMatches />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default NotTable;
