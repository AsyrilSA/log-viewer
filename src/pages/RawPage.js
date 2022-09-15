import LogDisplay from "components/elements/LogDisplay";
import Box from "@mui/material/Box";
import Title from "components/elements/Title";
import RawPageTab from "pages/RawPage/RawPageTab";

const Raw = () => {
  return (
    <Box sx={{ mr: 1 }}>
      <Title>Raw page</Title>
      <RawPageTab></RawPageTab>
    </Box>
  );
};

export default Raw;
