import React, { useState } from "react";
import "./login.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const backhndler = () => {
    navigate("/");
  };

  const [signindata, setsignindata] = useState({
    username: "",
    password: "",
  });

  const handlechange = (event) => {
    setsignindata({ ...signindata, [event.target.name]: event.target.value });
  };

  const handleclick = () => {
    axios
      .post("http://localhost:7090/auth/login", signindata)
      .then((data) => {
        console.log(data.data);
        sessionStorage.setItem("token", data.data.token);
        navigate(`/upload/${data.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="grad">
      <div>
        <h2>WELCOME TO FILE UPLOAD SYSTEM</h2>
        <Button variant="contained" color="success" onClick={backhndler}>
          Back
        </Button>
        <div className="box">
          <h3 style={{ textAlign: "center" }}>Login</h3>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-password-input"
                label="Username"
                name="username"
                type="text"
                autoComplete="current-password"
                onChange={handlechange}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handlechange}
              />
            </div>
          </Box>
        </div>
        <Button
          variant="contained"
          size="medium"
          endIcon={<SendIcon />}
          onClick={handleclick}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
