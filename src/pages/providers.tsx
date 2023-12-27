import Navbar from "@dapp/components/Navbar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Navbar />
        {children}
      </Box>
    </ThemeProvider>
  );
}

export default Providers;
