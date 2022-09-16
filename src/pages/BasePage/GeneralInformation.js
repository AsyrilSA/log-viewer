import * as React from "react";
import Grid from "@mui/material/Grid";

const GeneralInformation = () => {
  return (
    // <div>
    //
    // </div>
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        item
        xs={12}
        md={6}
        lg={6}
        sx={{ p: 2, ml: 3, mt: 2, mb: 0, height: "100%" }}
      >
        <Grid item xs={2}>
          Name of the log:
        </Grid>
        <Grid item xs={2}>
          Application version:
        </Grid>
        <Grid item xs={2}>
          Fieldbus Module:
        </Grid>
        <Grid item xs={2}>
          Purge:
        </Grid>
        <Grid item xs={2}>
          Dualfeeding:
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GeneralInformation;
