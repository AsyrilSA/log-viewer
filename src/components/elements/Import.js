import * as React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import untar from "js-untar";
import { useNavigate } from "react-router-dom";
import { parseLogFile } from "utils/logParser";
import { useContext } from "react";
import { LogContext } from "App";

export default function Import() {
  const navigate = useNavigate();
  const pako = require("pako");
  const buttonRef = useRef(null);
  const [logFile, setLogFile] = useContext(LogContext);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    buttonRef.current.click();
  };
  const logsChangeHandler = (event) => {
    const fileName = event.target.files[0].name;
    let reader = new FileReader();
    reader.onload = () => {
      untar(reader.result).then((extractedFiles) => {
        extractedFiles.forEach((log) => {
          const logName = log.name.slice(0, -7);
          if (logName === "full") {
            const unzippedLog = pako.inflate(log.buffer, { to: "string" });
            const parsedLog = parseLogFile(unzippedLog);
            setLogFile({ name: fileName, rows: parsedLog });
            navigate("/base");
          }
        });
      });
    };
    reader.readAsArrayBuffer(event.target.files[0]);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
