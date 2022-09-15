import * as React from "react";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import untar from "js-untar";

export default function Import() {
  const buttonRef = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    buttonRef.current.click();
  };
  const logsChangeHandler = (event) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = () => {
      untar(reader.result).then(function (extractedFiles) {
        console.log(extractedFiles);
        extractedFiles.forEach((log) => {
          console.log(log.name.slice(0, 4));
          log.name.slice(0, 4) === "full"
            ? unTarLogs(log)
            : localStorage.setItem(log.name, JSON.stringify(log));
        });
        localStorage.setItem("logsFiles", JSON.stringify(extractedFiles));
      });
    };
    console.log(event.target.files[0]);
  };
  const unTarLogs = (tarLog) => {
    let reader = new FileReader();
    console.log("full");
    console.log(tarLog);
    reader.readAsArrayBuffer(tarLog);
    reader.onload = () => {
      // console.log(reader.result);
      // untar(reader.result).then(function (extractedFiles) {
      //   console.log(extractedFiles);
      //   // localStorage.setItem(tarLog.name, JSON.stringify(extractedFiles));
      // });
    };
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
