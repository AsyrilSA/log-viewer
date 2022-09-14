import Typography from "@mui/material/Typography";

import "./HomePage.css";

const Home = () => {
  return (
    <div style={{ marginTop: "120px", textAlign: "center" }}>
      <Typography component="h2" variant="h3" color="black" gutterBottom>
        Please import a log file
      </Typography>
      <img className="arrow-image" src="/arrow.svg" />
    </div>
  );
};

export default Home;
