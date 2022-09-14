import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppPage from "components/layout/AppPage";

function App() {
  const mdTheme = createTheme({
    palette: {
      primary: {
        light: "#52717f",
        main: "#264653",
        dark: "#001f2a",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#ffa07d",
        main: "#e86f50",
        dark: "#b14026",
        contrastText: "#000000",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <AppPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
