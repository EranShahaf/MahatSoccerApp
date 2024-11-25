import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "./redux/userActions";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Box,
  Grid,
  Paper,
  Link,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  fetchCompetitions,
  selectAllCompetitions,
} from "../../state/slices/competitionsSlice";
import {
  fetchStandings,
  selectAllStandings,
} from "../../state/slices/standingsSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user); // Redux state for loading and error

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const competitions = useSelector(selectAllCompetitions);
  const competitionsStatus = useSelector((state) => {
    return state?.competitions?.status;
  });

  const standings = useSelector(selectAllStandings);
  const standingsStatus = useSelector((state) => {
    return state?.standings?.status;
  });

  const teams = standings?.standings
    ?.map(({ table }) => table.map(({ team }) => team))
    .flat();

  const [selectedCompetetionCode, setSelectedCompetetionCode] = useState(""); // Selected competition
  const [selectedTeamId, setSelectedTeamId] = useState(""); // Selected team

  useEffect(() => {
    if (competitionsStatus === "idle") {
      dispatch(fetchCompetitions());
    }
  }, [competitionsStatus, dispatch]);

  useEffect(() => {
    if (
      (!!selectedCompetetionCode && standingsStatus === "idle") ||
      (standingsStatus === "succeeded" &&
        selectedCompetetionCode !== standings.competition.code)
    ) {
      dispatch(fetchStandings(selectedCompetetionCode));
    }
  }, [standingsStatus, dispatch, selectedCompetetionCode]);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
      team: selectedTeamId,
      competition: selectedCompetetionCode,
    };
    // dispatch(loginUser(credentials));

    console.log(credentials);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Competition selection */}
          {!!competitions && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="competition-label">Competition</InputLabel>
              <Select
                labelId="competition-label"
                value={selectedCompetetionCode}
                onChange={(e) => setSelectedCompetetionCode(e.target.value)}
                label="Competition"
                required
              >
                {competitions.map((competition) => (
                  <MenuItem key={competition.code} value={competition.code}>
                    {competition.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Team selection */}
          {selectedCompetetionCode && !!teams && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="team-label">Team</InputLabel>
              <Select
                labelId="team-label"
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                label="Team"
                required
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ marginTop: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                padding: "10px 0",
                marginBottom: 2,
                backgroundColor: "#840000", // Custom color
                color: "white", // Text color
                "&:hover": {
                  backgroundColor: "#C70039", // Hover color
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item onClick={() => navigate(`/signup`)}>
              Don't have an account? Sign Up
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
