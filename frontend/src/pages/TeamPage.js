import React, { useEffect } from "react";
import TeamMatches from "../components/matches/TeamMatches";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TeamCard } from "../components/teams/TeamCard";
import { useSelector, useDispatch } from "react-redux";
import { selectTeam, fetchTeam } from "../state/slices/teamSlice";
import { ClubTable } from "../components/teams/ClubTable";

export const TeamPage = () => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const team = useSelector(selectTeam);
  const teamStatus = useSelector((state) => {
    return state?.team?.status;
  });
  const error = useSelector((state) => state?.team?.isError);

  useEffect(() => {
    if (
      teamStatus === "idle" ||
      (teamStatus === "succeeded" && teamId != team.id)
    ) {
      dispatch(fetchTeam(teamId));
    }
  }, [teamStatus, dispatch, teamId]);

  let content;

  if (teamStatus === "loading") {
  } else if (teamStatus === "succeeded") {
    content = (
      <Grid container spacing={2} padding={"8px"}>
        <Grid item sm={5}>
          <TeamCard />
          <Grid paddingTop={2}>
            <ClubTable />
          </Grid>
        </Grid>
        <Grid item sm={7}>
          <TeamMatches teamId={teamId} />
        </Grid>
      </Grid>
    );
  } else if (teamStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};
