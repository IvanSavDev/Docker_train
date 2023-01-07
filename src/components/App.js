import { BrowserRouter } from "react-router-dom";

import AppRouter from "../router/router";
import AuthProvider from "../hoc/AuthProvider";
import AccountProvider from "../hoc/AccountProvider";
import ProductsProvider from "../hoc/ProductsProvider";
import SalesProvider from "../hoc/SalesProvider";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "InterRegular, InterMedium, InterBold",
  },
  palette: {
    custom: {
      main: {
        grey: "#2B3844",
      },
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "14px",
          lineHeight: "1em",
          height: "auto",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AccountProvider>
        <ProductsProvider>
          <SalesProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </SalesProvider>
        </ProductsProvider>
      </AccountProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
