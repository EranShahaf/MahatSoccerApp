import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { signupUser } from "./redux/userActions"; // assuming you have a signupUser action for registration
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

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");

    const userData = {
      username,
      full_name: fullName,
      password,
      admin: false, // Set to false, you can change this if needed
      favorite_team_id: selectedTeamId, // Send the selected team's ID
    };

    try {
      // Replace with actual API call to register the user
      //   await dispatch(signupUser(userData));
      // Redirect or handle successful registration (e.g., show success message)
    } catch (err) {
      setError("Error during signup");
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSignup}>
          {/* Username Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />

          {/* Full Name Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item onClick={() => navigate(`/login`)}>
              Already have an account? Login
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
