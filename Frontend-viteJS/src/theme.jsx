import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
export const theme = createTheme({
  palette: {
    primary: blue,
    background: "",
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "white",
          textTransform: "initial",
          transition: "0.1s",
          background: "transparent",

          "&:hover": {
            background: "rgb(255, 0, 204)",
            borderRadius: "7px ",
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          color: "red",
          transition: "0.1s",
          cursor: `url(https://res.cloudinary.com/dtvtphhsc/image/upload/v1692819139/Images/CursorPointer_ryq6sc.png) 4 4, auto`,
          "&:hover": {
            background: "rgba(62, 62, 253, 0.815)",
            borderRadius: "13px ",
          },
        },
        indicator: {
          display: "none",
        },
      },
    },
    global: {
      body: {
        cursor: `url(https://res.cloudinary.com/dtvtphhsc/image/upload/v1692819139/Images/CursorPointer_ryq6sc.png) 4 4, auto`,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ff014f",
          color: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid white",
          alignItems: "center",
          width: "93.5%",
          right: "3.2%",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          marginTop: "-10px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: "white",

          // cursor: `url(https://res.cloudinary.com/dtvtphhsc/image/upload/v1692819139/Images/CursorPointer_ryq6sc.png) 4 4, auto`,
          "&:hover": {
            background: "none",
            backgroundColor: "#ff014f",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          transition: "all 0.3s",
          "&:hover": {
            background: "blue",
            color: "#ff014f",
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          background: "#ff014f",
          padding: "5px 21px",
          borderRadius: "10px",
          color: "#e2e8ec",
          transition: "all 0.3s",
          margin: "10px",
          cursor: `url(https://res.cloudinary.com/dtvtphhsc/image/upload/v1692819139/Images/CursorPointer_ryq6sc.png) 4 4, auto`,
          "&:hover": {
            borderRadius: "17px",
            transition: "all 0.3s",
            color: " #ff014f",
            background: " #e2e8ec",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          cursor: `url(https://res.cloudinary.com/dtvtphhsc/image/upload/v1692819139/Images/CursorPointer_ryq6sc.png) 12 12, auto`,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {},
        secondary: {
          color: "black",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "'Montserrat Alternates', sans-serif",
        },
        primary: {
          fontSize: "20px",
          fontFamily: "'Montserrat Alternates', sans-serif",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#e2e8ec",
          borderRadius: "15px",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "secondary",
        },
      },
    },
  },
});
export default theme;
