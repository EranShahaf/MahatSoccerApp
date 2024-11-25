import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { TeamResult } from "./TeamResult";
import { Avatar, Link, TableBody } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); 

  return (
    <React.Fragment>
      <TableRow key={row.name}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Avatar alt="Remy Sharp" src={row.competition.emblem} onClick={() => navigate(`/competetion/${row.competition.code}`)} />
        </TableCell>
        <TableCell>
          <TeamResult
            key={row.name}
            team={row.homeTeam}
            score={row.score.fullTime.home}
          />
          <TeamResult
            key={row.name}
            team={row.awayTeam}
            score={row.score.fullTime.away}
          />
        </TableCell>
        <TableCell align="center">
          {moment(row.utcDate).utc().format("YYYY-MM-DD, h:mm:ss a")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <Link
                  href="https://www.haaretz.co.il/misc/2009-04-24/ty-article/0000017f-ec81-d0f7-a9ff-eec54db20000"
                  underline="none"
                >
                  Maccabi Zona
                </Link>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Competition</TableCell>
                    <TableCell>Matchday</TableCell>
                    <TableCell>Stage</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Current Matchday</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.competition.name}</TableCell>
                  <TableCell>{row.matchday}</TableCell>
                  <TableCell>{row.stage}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.season.currentMatchday}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
