import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ButtonBase, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
};

export default function CompetitionCard({ competition }) {
  const classes = styles;
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 245, padding: "16px", border: "1px solid black" }}>
      <ButtonBase onClick={() => navigate(`/competetions/${competition.code}`)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            src={competition.emblem}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {competition.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {competition.area.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </ButtonBase>
    </Card>
  );
}
