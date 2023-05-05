import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import SignUpPage from "./pages/SignUp";
import { AuthProvider } from "components/AuthProvider/AuthProvider";
import CreateProfile from "pages/CreateProfile";
import { ThemeProvider, createTheme } from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";

const theme = createTheme({
  //Insert the styles here
  palette: {
    mode: "dark",
    background: {
      paper: '#010303',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="createProfile" element={<CreateProfile />}></Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
