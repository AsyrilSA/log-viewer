import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Import from "components/elements/Import";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { LogContext } from "App";
import { Link } from "react-router-dom";

import "./AppTopBar.css";

const CssTextField = styled(TextField)({
  "& .MuiInputBase-formControl ": {
    backgroundColor: "grey",
    color: "black",
  },
});

const AppTopBar = () => {
  let [contextLogFile] = useContext(LogContext);
  const logFileName =
    contextLogFile != null ? contextLogFile.name : "Log File Name";
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
          <Typography variant="h6" component="div">
            <Link to="/" className="title__style">
              <Grid container alignItems="center">
                <Grid item>
                  <img className="title-logo" src="/logo_white.svg" />
                </Grid>
                <Grid item sx={{ ml: "10px", mb: "8px" }}>
                  <span>Log Viewer</span>
                </Grid>
              </Grid>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <CssTextField sx={{ flexGrow: 1 }} disabled value={logFileName} />
          <Box sx={{ flexGrow: 1 }} />
          <Import></Import>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppTopBar;
