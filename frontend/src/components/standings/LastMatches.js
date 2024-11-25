import * as React from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";

export default function LastMatches() {
  const props = "W,W,L,D,L";
  const form = props ? props.split(",") : [null, null, null, null, null];
  const mapping = {
    W: <CheckCircleIcon color="success" />,
    D: <RemoveCircleSharpIcon color="action" />,
    L: <CancelSharpIcon color="error" />,
    null: <RadioButtonUncheckedSharpIcon color="action" />,
  };

  const LastMatches = form.map((match) => mapping[match]);
  return <Box>{LastMatches}</Box>;
}
