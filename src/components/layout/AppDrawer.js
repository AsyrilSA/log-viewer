import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LanIcon from "@mui/icons-material/Lan";
import SpeedIcon from "@mui/icons-material/Speed";
import RawOnIcon from "@mui/icons-material/RawOn";
import SettingsIcon from "@mui/icons-material/Settings";

import "./AppDrawer.css";

import { Link } from "react-router-dom";

export default function AppDrawer() {
  return (
    <div>
      <React.Fragment>
        <Drawer variant="permanent">
          <Box sx={{ width: 240 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ContentPasteSearchIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Link to="/home" className="link__style">
                      Home
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LanIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/communication" className="link__style">
                    Communication
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <SpeedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/performance" className="link__style">
                    Performance
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <RawOnIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to="/rawlogs" className="link__style">
                    Raw Logs
                  </Link>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
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
