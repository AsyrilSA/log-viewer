import * as React from "react";
import PropTypes from 'prop-types'
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function MenuItem(props) {
  return (
    <ListItemButton>
      <ListItemText primary={props.value} />
    </ListItemButton>
  );
}

MenuItem.prototype = {
  value: PropTypes.string,
};

export const mainListItems = (
  <React.Fragment>
    <MenuItem value="Eye Plus" />
    <MenuItem value="Asycube Studio" />
    <MenuItem value="Merlin" />
    <MenuItem value="Hopper" />
  </React.Fragment>
);
