//

import { useState } from "react";
import React from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const loginhandler = () => {
    navigate("/login");
  };
  const signuphandler = () => {
    navigate("/signup");
  };
  return (
    <div className="grad">
      <div>
        <h2>WELCOME TO FILE UPLOAD SYSTEM</h2>
        <div className="btn">
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={signuphandler}
          >
            Signup
          </Button>
        </div>
        <div className="btn">
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={loginhandler}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
