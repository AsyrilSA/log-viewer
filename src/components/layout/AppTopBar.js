import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Import from "components/elements/Import";

const AppTopBar = (props) => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: "calc(100% - 200px)",
          ml: "200px",
          backgroundColor: "#203b46",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Log Viewer
          </Typography>
          <Import></Import>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppTopBar;
