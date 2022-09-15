import Title from "components/elements/Title";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import parseLogFile from "utils/logParser";

const columns = [
  { field: "id", headerName: "Line", width: 70 },
  { field: "timestamp", headerName: "Timestamp", width: 200 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "service", headerName: "Service", width: 130 },
  { field: "message", headerName: "Message", width: 1100},
];

const Communication = () => {
  const [communicationLogs, setCommunicationLogs] = useState(() => {
    const logFile = JSON.parse(localStorage.getItem("logsFiles")).find((l) => {
      return l.name === "communication.log";
    });
    return parseLogFile(logFile);
  });

  return (
    <div>
      <Title>Communication page</Title>
      <div style={{ height: "680px", marginTop: "10px" }}>
        <DataGrid
          rows={communicationLogs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Communication;
