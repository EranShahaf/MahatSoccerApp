import React from "react";
import LeaguesTable from "../components/standings/LeaguesTable";
import LeaugeMatches from "../components/matches/LeaugeMatches";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { ScorersTable } from "../components/scorers/ScorersTable";

const SingleCompetitionPage = () => {
  const { code } = useParams();

  return (
    <Grid container spacing={2} padding={"6px"}>
      <Grid item sm={7}>
        <LeaguesTable code={code} />
        <Grid paddingTop={2}>
          <ScorersTable code={code} />
        </Grid>
      </Grid>
      <Grid item sm={5}>
        <LeaugeMatches code={code} />
      </Grid>
    </Grid>
  );
};

export default SingleCompetitionPage;
