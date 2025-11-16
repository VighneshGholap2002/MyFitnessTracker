import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

// ----------------------------------------
// Activities Page UI
// ----------------------------------------
const ActivitiesPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* <Typography variant="h5" gutterBottom>
          Activities
        </Typography> */}

        <ActivityForm />
        <Box sx={{ mt: 3 }}>
          <ActivityList />
        </Box>
      </Paper>
    </Container>
  );
};

// ----------------------------------------
// Main App Component
// ----------------------------------------
function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);

  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  // Save token to Redux immediately when received
  useEffect(() => {
    if (token) {
      dispatch(
        setCredentials({
          token,
          user: tokenData,
        })
      );
    }
    setAuthReady(true);
  }, [token, tokenData, dispatch]);

  if (!authReady) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      {/* NAVBAR */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Activity Tracker
          </Typography>

          {!token ? (
            <Button variant="contained" color="secondary" onClick={logIn}>
              Login
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={logOut}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/activities"
          element={token ? <ActivitiesPage /> : <Navigate to="/" />}
        />

        <Route
          path="/activities/:id"
          element={token ? <ActivityDetail /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/activities" replace />
            ) : (
              <Container maxWidth="sm" sx={{ mt: 10 }}>
                <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h4" gutterBottom>
                    Welcome
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Please login to manage activities.
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={logIn}
                    sx={{ mt: 2 }}
                  >
                    Login
                  </Button>
                </Paper>
              </Container>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
