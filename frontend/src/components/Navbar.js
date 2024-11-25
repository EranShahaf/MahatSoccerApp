import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Toggle authentication status (for demo purposes)
  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#840000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Homepage
          </Typography>

          {/* Login/Signup Button */}
          <Box style={{ marginLeft: "auto" }}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleAuthToggle}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Sign in
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
