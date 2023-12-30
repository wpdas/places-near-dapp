import Navbar from "@dapp/components/Navbar";
import Web3AuthProvider from "@dapp/contexts/Web3AuthProvider";
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
      <Web3AuthProvider>
        <Box>
          <Navbar />
          {children}
        </Box>
      </Web3AuthProvider>
    </ThemeProvider>
  );
}

export default Providers;
