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
    reader.onload = () => {
      untar(reader.result).then(function (extractedFiles) {
        console.log(extractedFiles);
        localStorage.setItem("logsFiles", JSON.stringify(extractedFiles));
      });
    };
    reader.readAsArrayBuffer(event.target.files[0]);
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
