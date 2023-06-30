import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../apis/Api";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [pass2Error, setPass2Error] = useState("");

  const handleFname = (e) => {
    setFname(e.target.value);
  };

  const handleLname = (e) => {
    setLname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handlePass2 = (e) => {
    setPass2(e.target.value);
  };

  //  handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!validate()) {
      return;
    }

    // seperate api call
    registerUser({
      fname: fname,
      lname: lname,
      email: email,
      password: pass,
    })
      .then((res) => {
        console.log(res);
        toast.success("User registered successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });

  };

  // validation
  const validate = () => {
    let isValid = true;

    if (fname.trim() === "") {
      setFnameError("Firstname is required");
      isValid = false;
    }

    if (lname.trim() === "") {
      setLnameError("Lastname is required");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }

    if (pass.trim() === "") {
      setPassError("Password is required");
      isValid = false;
    }

    if (pass2.trim() === "") {
      setPass2Error("Confirm Password is required");
      isValid = false;
    }

    if (pass !== pass2) {
      setPassError("Passwords do not match");
      setPass2Error("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };


  return (
    <div className="container">
      <div className="col-md-5">
        <h1>Register a user</h1>

        <form action="">
          <div className="form-group">
            <label htmlFor="name">Firstname</label>
            <input
              onChange={handleFname}
              type="text"
              name="name"
              id="name"
              className="form-control"
            />
            {
              fnameError && <div className="text-danger">{fnameError}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              onChange={handleLname}
              type="text"
              name="lastname"
              id="lastname"
              className="form-control"
            />
            {
              lnameError && <div className="text-danger">{lnameError}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleEmail}
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
            {
              emailError && <div className="text-danger">{emailError}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handlePass}
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
            {
              passError && <div className="text-danger">{passError}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              onChange={handlePass2}
              type="password"
              name="password2"
              id="password2"
              className="form-control"
            />
            {
              pass2Error && <div className="text-danger">{pass2Error}</div>
            }
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
