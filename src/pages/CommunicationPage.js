import Title from "components/elements/Title";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getCommunicationLog } from "utils/logParser.ts";
import { useContext } from "react";
import { LogContext } from "App";
import Box from "@mui/material/Box";

const columns = [
  { field: "id", headerName: "Line", flex: 1 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    valueFormatter: ({ value }) => {
      if (value) return value.toLocaleString("fr-CH");
    },
    flex: 2,
  },
  { field: "level", headerName: "Level", flex: 1 },
  { field: "service", headerName: "Service", flex: 3 },
  { field: "message", headerName: "Message", flex: 10 },
];

const Communication = () => {
  let [contextLogFile] = useContext(LogContext);
  const [communicationLogs] = useState(() => {
    return contextLogFile != null
      ? getCommunicationLog(contextLogFile.rows)
      : [];
  });

  return (
    <div>
      <Title>Communication page</Title>
      <Box style={{ height: "680px", marginTop: "10px" }}>
        <DataGrid
          rows={communicationLogs}
          rowHeight={25}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default Communication;
