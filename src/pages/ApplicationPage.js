import Title from "components/elements/Title";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getApplicationLog } from "utils/logParser";
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

const Application = () => {
  let [contextLogFile] = useContext(LogContext);
  const [applicationLogs] = useState(() => {
    return contextLogFile != null ? getApplicationLog(contextLogFile.rows) : [];
  });

  return (
    <div>
      <Title>Application page</Title>
      <Box style={{ height: "680px", marginTop: "10px" }}>
        <DataGrid
          rows={applicationLogs}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default Application;
