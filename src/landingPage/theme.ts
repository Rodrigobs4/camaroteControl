
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00f2fe", // azul neon
    },
    secondary: {
      main: "#fc466b", // rosa vibrante
    },
    background: {
      default: "#0a0a0a",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Urbanist', 'sans-serif'",
    h1: {
      fontWeight: 800,
      fontSize: "4rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1.1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          padding: "10px 20px",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
