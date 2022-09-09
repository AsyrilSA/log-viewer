import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function MenuItem(props) {
  return (
    <ListItemButton>
      <ListItemText primary={props.value} />
    </ListItemButton>
  );
}

export const mainListItems = (
  <React.Fragment>
    <MenuItem value="Eye Plus" />
    <MenuItem value="Asycube Studio" />
    <MenuItem value="Merlin" />
    <MenuItem value="Hopper" />
  </React.Fragment>
);
