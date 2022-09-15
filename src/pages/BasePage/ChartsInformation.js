import * as React from "react";
import Grid from "@mui/material/Grid";
import PiCharts from "components/elements/PiCharts";

const PiChartsComponent = () => {
  return (
    // <div>
    //
    // </div>
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{ p: 2, mt: 0, mb: 0, minHeight: "100%" }}
      >
        <PiCharts></PiCharts>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        item
        xs={12}
        md={6}
        lg={6}
        sx={{ p: 2, mt: 10, mb: 0, height: 150 }}
      >
        <Grid item xs={12}>
          Communication log: 26 %
        </Grid>
        <Grid item xs={12}>
          Application log: 67 %
        </Grid>
        <Grid item xs={12}>
          Vision Log: 12 %
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PiChartsComponent;
