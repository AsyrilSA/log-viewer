import Title from "components/elements/Title";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getCommunicationLog } from "utils/logParser";
import { useContext } from "react";
import { LogContext } from "App";
import Box from "@mui/material/Box";

const columns = [
  { field: "id", headerName: "Line", flex: 1, resizable: true },
  {
    field: "timestamp",
    headerName: "Timestamp",
    valueFormatter: ({ value }) => value.toLocaleString("fr-CH"),
    flex: 2,
    resizable: true,
  },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "service", headerName: "Service", flex: 3, resizable: true },
  { field: "message", headerName: "Message", flex: 10, resizable: true },
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
