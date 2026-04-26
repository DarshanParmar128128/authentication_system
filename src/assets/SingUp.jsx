import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
function SingUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [error, seterror] = useState("");
  const [data, setdatas] = useState("");
  const navigate = useNavigate();
  const hendlessubmit = async () => {
    if (!name || !email || !pass) {
      seterror("All field are require");
      return;
    }
    if (!email.includes("@")) {
      seterror("enter valid email");
      return;
    }
    if (pass.length < 8) {
      seterror("password must be at least 7 characters");
      return;
    }
    setdatas({
      name,
      email,
      pass,
    });

    seterror("");
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres_53c6f066c74441d3901ea39b347e19c0",
        },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        seterror(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      alert("Signup successful ");

      navigate("/dashboard");
    } catch (error) {
      seterror(erro);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">Sign Up</Typography>

      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => {

          setemail(e.target.value);
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={pass}
        fullWidth
        onChange={(e) => {
          setpass(e.target.value);
        }}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button variant="contained" onClick={hendlessubmit}>
        Sign Up
      </Button>

      {data && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>Name: {data.name}</Typography>
          <Typography>Email: {data.email}</Typography>
          <Typography>Password: {data.pass}</Typography>
        </Box>
      )}

      <Typography>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Box>
  );
}

export default SingUp;
