import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import ChartjsInformation from "pages/BasePage/ChartsInformation";

import Title from "components/elements/Title";
const BasePage = () => {
  return (
    <Container maxWidth="xl" sx={{ ml: 2, pt: 2, mb: 4, height: "90%" }}>
      <Grid container spacing={4} sx={{ height: 350 }}>
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          sx={{ p: 2, mt: 0, mb: 0, minHeight: "100%" }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Title>Log Status</Title>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          sx={{ p: 2, mt: 0, mb: 0, minHeight: "30%" }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Title>General Information</Title>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          sx={{ p: 2, mt: 0, mb: 0, minHeight: "30%" }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Title>Time Information</Title>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={8}
          sx={{ p: 2, mt: 2, mb: 4, minHeight: 350 }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Title>Log Repartition</Title>
            <ChartjsInformation></ChartjsInformation>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BasePage;
