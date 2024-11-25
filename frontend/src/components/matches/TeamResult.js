import { OneTeam } from "../teams/OneTeam";
import { Grid } from "@mui/material";

export const TeamResult = ({ name, team, score }) => {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={10}>
        <item>
          <OneTeam key={name} team={team} />
        </item>
      </Grid>
      <Grid item xs={2}>
        <item>{score}</item>
      </Grid>
    </Grid>
  );
};
