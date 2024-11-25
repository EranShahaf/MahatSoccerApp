import { Avatar, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OneTeam = ({team}) => {
  const navigate = useNavigate();
  return (
    <CardHeader
      onClick={() => navigate(`/team/${team.id}`)}
      align="left"
      avatar={
        <Avatar
          sx={{ width: 24, height: 24 }}
          alt="Remy Sharp"
          src={team.crest}
        />
      }
      title={team.shortName}
    />
  );
};
