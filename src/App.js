import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppPage from "components/layout/AppPage";
import React, { useState } from "react";

export const LogContext = React.createContext({});

function App() {
  const mdTheme = createTheme({
    palette: {
      primary: {
        light: "#2A9D8F",
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

  const [logFile, setLogFile] = useState(null);

  return (
    <div className="App">
      <LogContext.Provider value={[logFile, setLogFile]}>
        <ThemeProvider theme={mdTheme}>
          <AppPage />
        </ThemeProvider>
      </LogContext.Provider>
    </div>
  );
}

export default App;
