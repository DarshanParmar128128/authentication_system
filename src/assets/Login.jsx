import React from "react";
import { Link, Navigate } from "react-router-dom";
import SingUp from "./SingUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [error, seterror] = useState("");
  const [data, setdatas] = useState("");
  const navigate = useNavigate();
  const loginhandle = async () => {
    console.log(email, pass);
    try {
      const res = await fetch("https://reqres.in/api/login", {
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
      console.log(data.error);
      if (!res.ok) {
        seterror(data.error);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        alert("login succesfull");
        navigate("/Dashboard");
      } else {
        alert("login fail");
      }
    } catch (error) {
      console.log(error);
      seterror("some thing wrong");
    }

    const handler = () => {
      if (!email || !pass) {
        seterror("requide field");
        return;
      }
      if (!email.includes("@")) {
        seterror("envalid email");
        return;
      }
      setdatas({
        email,
        pass,
      });
      seterror("");
      alert("login succes full");
    };
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
      <Typography variant="h3">Login</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />

      {/* PASSWORD */}
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={pass}
        onChange={(e) => setpass(e.target.value)}
      />

      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={loginhandle}>
        Login
      </Button>
      <Typography>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
      {data && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>Email: {data.email}</Typography>
          <Typography>Password: {data.pass}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Login;
