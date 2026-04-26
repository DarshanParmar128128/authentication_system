import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import React from "react";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4">Welcome to Dashboard</Typography>

      <Typography variant="body1">Your Token:</Typography>

      <Box
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
          maxWidth: 300,
          wordBreak: "break-all",
        }}
      >
        {token}
      </Box>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default Dashboard;
