import * as React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import untar from "js-untar";
import { useNavigate } from "react-router-dom";
import { parseLogFile } from "utils/logParser";

export default function Import() {
  const navigate = useNavigate();
  const pako = require("pako");
  const buttonRef = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    buttonRef.current.click();
  };
  const logsChangeHandler = (event) => {
    let reader = new FileReader();
    reader.onload = () => {
      untar(reader.result).then((extractedFiles) => {
        extractedFiles.forEach((log) => {
          const logName = log.name.slice(0, -7);
          if (logName === "full") unZipLogs(log);
        });
      });
    };
    reader.readAsArrayBuffer(event.target.files[0]);
  };

  const unZipLogs = (tarLog) => {
    const result = pako.inflate(tarLog.buffer, { to: "string" });
    const parsedLog = parseLogFile(result);
    localStorage.setItem("fullLog", JSON.stringify(parsedLog));
    navigate("/base");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Button
            ref={buttonRef}
            variant="contained"
            color="secondary"
            onClick={onButtonClick}
          >
            Import Logs
          </Button>
          <form onChange={logsChangeHandler} style={{ display: "none" }}>
            <input
              type="file"
              id="file"
              ref={buttonRef}
              accept={".logs"}
              style={{ display: "none" }}
            />
          </form>
        </Box>
      </Box>
    </React.Fragment>
  );
}
