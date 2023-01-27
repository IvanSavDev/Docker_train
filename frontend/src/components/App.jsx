import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import AppRouter from '../router/router';
import AuthProvider from '../hoc/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  typography: {
    fontFamily: 'InterRegular, InterMedium, InterBold',
  },
  palette: {
    custom: {
      main: {
        grey: '#2B3844',
      },
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '14px',
          lineHeight: '1em',
          height: 'auto',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
  breakpoints: {
    values: {
      middle: 720,
      lessSmall: 490,
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
