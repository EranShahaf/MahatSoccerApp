import { useEffect } from "react";
import CompetitionCard from "./CompetitionCard";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCompetitions,
  fetchCompetitions,
} from "../../state/slices/competitionsSlice";

const CompetitionsCards = () => {
  const dispatch = useDispatch();
  const competitions = useSelector(selectAllCompetitions);
  const competitionsStatus = useSelector((state) => {
    return state?.competitions?.status;
  });
  const error = useSelector((state) => state?.competitions?.isError);

  useEffect(() => {
    if (competitionsStatus === "idle") {
      dispatch(fetchCompetitions());
    }
  }, [competitionsStatus, dispatch]);

  let content;

  if (competitionsStatus === "loading") {
  } else if (competitionsStatus === "succeeded") {
    content = competitions.map((competition) => {
      return (
        <Grid
          aliitem
          xs={6}
          sm={4}
          md={2}
          key={competition.id}
          item
          sx={{ display: "flex", padding: "17px" }}
        >
          <CompetitionCard key={competition.id} competition={competition} />
        </Grid>
      );
    });
  } else if (competitionsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="space-evenly"
      >
        {content}
      </Grid>
    </section>
  );
};

export default CompetitionsCards;
