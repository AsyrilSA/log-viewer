import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LanIcon from "@mui/icons-material/Lan";
import SpeedIcon from "@mui/icons-material/Speed";
import RawOnIcon from "@mui/icons-material/RawOn";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext } from "react";
import { LogContext } from "App";
import { Link } from "react-router-dom";

import "./AppDrawer.css";

export default function AppDrawer() {
  const [logFile] = useContext(LogContext);
  return (
    <div>
      <React.Fragment>
        <Drawer className="Drawer__style" variant="permanent">
          <Box
            sx={{
              width: 200,
              height: "100%",
              backgroundColor: "#264653",
            }}
          >
            <List>
              <ListItemButton className={logFile ? "" : "disabled-link"}>
                <ListItemIcon className="ListItemIcon__style">
                  <ContentPasteSearchIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/base" className="link__style">
                    Base
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton className={logFile ? "" : "disabled-link"}>
                <ListItemIcon className="ListItemIcon__style">
                  <LanIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/communication" className="link__style">
                    Communication
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton className={logFile ? "" : "disabled-link"}>
                <ListItemIcon className="ListItemIcon__style">
                  <SpeedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/performance" className="link__style">
                    Performance
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton className={logFile ? "" : "disabled-link"}>
                <ListItemIcon className="ListItemIcon__style">
                  <RawOnIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/rawlogs" className="link__style">
                    Raw Logs
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon className="ListItemIcon__style">
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/settings" className="link__style">
                    Settings
                  </Link>
                </ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
