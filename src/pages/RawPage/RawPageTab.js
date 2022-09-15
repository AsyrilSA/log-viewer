import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useState } from "react";
import { getCommunicationLog } from "utils/logParser";
import { getApplicationLog } from "utils/logParser";
import { useContext } from "react";
import { LogContext } from "App";

export default function RawPageTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let [contextLogFile] = useContext(LogContext);
  const [fullLogs] = useState(() => {
    return contextLogFile != null ? contextLogFile.raw : [];
  });
  const [applicationLogs] = useState(() => {
    return contextLogFile != null ? getApplicationLog(contextLogFile.raw) : [];
  });
  // const [communicationLogs] = useState(() => {
  //   return contextLogFile != null
  //     ? getCommunicationLog(contextLogFile.raw)
  //     : [];
  // });

  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={10}
        sx={{
          width: "100%",
          bgcolor: "primary.light",
          color: "primary.contrastText",
          mr: 2,
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              variant="fullWidth"
              aria-label="lab API tabs example"
            >
              <Tab label="Full Log" value="1" />
              <Tab label="Application Log" value="2" />
              <Tab label="Communication Log" value="3" />
              <Tab label="Metadata" value="4" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            style={{ background: "black", height: "60vh", overflow: "auto" }}
          >
            {fullLogs}
          </TabPanel>
          <TabPanel
            value="2"
            style={{ background: "black", height: "60vh", overflow: "auto" }}
          >
            {applicationLogs}
          </TabPanel>
          <TabPanel
            value="3"
            style={{ background: "black", height: "60vh", overflow: "auto" }}
          >
            communicationLogs
          </TabPanel>
          <TabPanel value="4" style={{ background: "black", height: "60vh" }}>
            Item Four
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}
