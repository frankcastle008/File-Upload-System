import React, { useState } from "react";
import "./signup.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
const Signup = () => {
  const navigate = useNavigate();
  const backhndler = () => {
    navigate("/");
  };
  const [signupdata, setsignupdata] = useState({
    username: "",
    password: "",
  });

  const signuphandler = (event) => {
    setsignupdata({ ...signupdata, [event.target.name]: event.target.value });
  };

  const handleclick = () => {
    axios
      .post("http://localhost:7090/auth/signup", signupdata)
      .then((data) => {
        console.log(data.data);
        alert(JSON.stringify(data.data));
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
          <h3 style={{ textAlign: "center" }}>Signup</h3>
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
                type="text"
                name="username"
                autoComplete="current-password"
                onChange={signuphandler}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={signuphandler}
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
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;
