import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import "./Profile.css";
const Profile = () => {
  const [file, setFile] = useState("");

  const [filedata, setfiledata] = useState([]);
  const [showModal, setShow] = useState(false);
  const [pin, setpin] = useState("");
  const [flag, setflag] = useState(false);
  const [dpin, setdpin] = useState("");
  const [fname, setfname] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFile(e.target.files[0]);
  };
  const handlepin = (e) => {
    setpin(e.target.value);
  };

  const handledpin = (e) => {
    setdpin(e.target.value);
  };

  const handleClose = () => setShow(false);

  const handleShow = (file) => {
    setShow(true);
    setfname(file);
  };

  const handleupload = () => {
    const formData = new FormData();
    formData.append("file", file);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: sessionStorage.getItem("token"),
        PIN: pin,
      },
    };
    setpin("");

    axios
      .post(`http://localhost:7090/user/upload/${id}`, formData, config)
      .then((data) => {
        alert(JSON.stringify(data.data));
        setflag(!flag);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  useEffect(() => {
    let config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };
    axios
      .get(`http://localhost:7090/user/getupload/${id}`, config)
      .then((data) => {
        // console.log(data.data.data);
        setfiledata(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  const handleDelete = (link) => {
    let config = {
      headers: {
        file: link,
      },
    };
    axios
      .delete(`http://localhost:7090/user/delete/${id}`, config)
      .then((data) => {
        alert(JSON.stringify(data.data));
        setflag(!flag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitPIN = () => {
    // console.log(fname.name,dpin)
    let config = {
      headers: {
        file: JSON.stringify(fname.name),
        pin: dpin,
      },
    };
    let data = [];
    axios
      .post(`http://localhost:7090/user/pincheck/${id}`, data, config)
      .then((data) => {
        // console.log((data.data.message))
        if (data.data.message === true) {
          window.open(`${data.data.data}`, "_self");
        } else {
          alert("Enter Correct Pin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandle = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="grad1">
        <h2>WELCOME TO FILE UPLOAD SYSTEM</h2>
        <Button variant="contained" color="error" onClick={logoutHandle}>
          Logout
        </Button>
        <h4 style={{ marginTop: "35px" }}>Upload File</h4>
        <div>
          <h6>Set 6-Digit PIN</h6>
          <div
            className="input-group mb-3"
            style={{ width: "300px", margin: "auto" }}
          >
            <input
              type="text"
              value={pin}
              className="form-control"
              name="PIN"
              placeholder="PIN"
              maxLength={"6"}
              onChange={handlepin}
              aria-describedby="basic-addon1"
            />
          </div>

          <TextField
            id="outlined-password-input"
            label=""
            size="small"
            type="file"
            autoComplete="current-password"
            onChange={handlechange}
          />
          <br></br>

          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "30px" }}
            onClick={handleupload}
          >
            Upload
          </Button>
        </div>
        <div className="list">
          <h4>List of Uploaded Files</h4>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">File Name</th>
                <th scope="col">Download</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filedata &&
                filedata.map((ele, i) => (
                  <tr key={i}>
                    <th scope="row" key={i}>
                      {i + 1}
                    </th>
                    <td>{JSON.stringify(ele.name).split("/")[3]}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleShow(ele)}
                      >
                        Download
                        {/* <a href= {ele.name} target='blank'>Download</a> */}
                      </Button>
                    </td>

                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(ele.name)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter 6-Digit PIN </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>PIN:</h5>

          <input
            type="password"
            placeholder="Enter Your PIN"
            maxLength={"6"}
            name="PIN"
            onChange={handledpin}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitPIN}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
