import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export  const theme = createTheme({
  palette: {
    common: {
      black: "black",
      white: "white",
      grey: "grey"
    },
    action: {
      hover: "#f1f1f1",
    },
    border: {
      border: '1px solid black'
    }
  },
});

export const useStyles = makeStyles({
  header: {
    "& .MuiTableCell-head": {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  },
  secondHeader: {
    "& .MuiTableCell-head": {
      backgroundColor: theme.palette.common.grey,
      color: theme.palette.common.white,
    },
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
});
