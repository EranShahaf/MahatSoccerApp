import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectTeam } from "../../state/slices/teamSlice";

export const TeamCard = () => {
  const team = useSelector(selectTeam);

  const mapping = {
    "Short name": "shortName",
    Website: "website",
    Founded: "founded",
    "Club colors": "clubColors",
    Venue: "venue",
    Manager: "Hey Noam",
  };

  return (
    <Card sx={{ display: "flex", border: "1px solid black" }}>
      <CardContent sx={{ flex: "1 0 auto" }} align="left">
        <Typography component="div" variant="h5" paddingBottom={2}>
          {team.name}
        </Typography>
        {Object.keys(mapping).map((row) => {
          return (
            <Typography
              padding={"2px"}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {row +
                ": " +
                (team[mapping[row]] ? team[mapping[row]] : team.coach.name)}
            </Typography>
          );
        })}
      </CardContent>
      <CardMedia
        sx={{ maxWidth: "280px" }}
        component="img"
        src={team.crest}
        alt="Live from space album cover"
      />
    </Card>
  );
};
