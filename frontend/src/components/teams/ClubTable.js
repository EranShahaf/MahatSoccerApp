import NotTable from "../Table/NotTable";
import { useSelector } from "react-redux";
import { selectTeam } from "../../state/slices/teamSlice";

const tableMapping = {
  name: "name",
  position: "position",
  "Date of birth": "dateOfBirth",
  nationality: "nationality",
};

export const ClubTable = () => {
  const team = useSelector(selectTeam);

  return (
    <section sx={{paddingTop:"14px"}}>
      <NotTable
        key={team.id}
        header="Squad"
        table={team.squad}
        mapping={tableMapping}
      />
    </section>
  );
};
