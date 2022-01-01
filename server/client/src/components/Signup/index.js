import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
const { API } = require("../../config/" + process.env.NODE_ENV);

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileNumberErr, setMobileNumberErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [inputPassword, setInputPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchErr, setPasswordMatchErr] = useState(false);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
    setPassword("");
    setFirstNameErr(false);
    setLastNameErr(false);
    setEmailErr(false);
    setMobileNumberErr(false);
    setPasswordErr(false);
    setConfirmPassword("");
    setPasswordMatchErr(false);
  }

  function showPassword() {
    if (inputPassword === "password") {
      setInputPassword("text");
    } else {
      setInputPassword("password");
    }
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleSubmit() {
    if (firstName === "") {
      setFirstNameErr(true);
    } else {
      setFirstNameErr(false);
    }
    if (lastName === "") {
      setLastNameErr(true);
    } else {
      setLastNameErr(false);
    }
    if (email === "") {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (mobileNumber === "" || mobileNumber.length < 10) {
      setMobileNumberErr(true);
    } else {
      setMobileNumberErr(false);
    }
    if (password === "" || password.length < 8) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
    if (password !== confirmPassword) {
      setPasswordMatchErr(true);
    } else {
      setPasswordMatchErr(false);
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      isValidEmail &&
      mobileNumber !== "" &&
      mobileNumber.length === 10 &&
      password !== "" &&
      password.length > 8 &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      // TODO modify isAdmin value to be sent dynamically
      const userData = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        mobileNumber,
        isAdmin: false
      };
      const signupResponse = await axios.post(`${API.USER_END_POINT}/signup`, userData);
      // TODO :: add notification component for success and error
    }
  }

  return (
    <div className="container">
      <div className="signupContainer mx-auto">
        <h1 className="text-center pb-3">Registration Form</h1>
        <form>
          <div className="form-group pb-4 row">
            <label htmlFor="first name" className="col-sm-3 col-form-label">
              First name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className={`form-control ${firstNameErr ? "redBorder" : ""}`}
                placeholder="first name"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
              {firstNameErr && <span className="text-danger">first name should not be empty</span>}
            </div>
          </div>
          <div className="form-group pb-4 row">
            <label htmlFor="last name" className="col-sm-3 col-form-label">
              Last name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className={`form-control ${lastNameErr ? "redBorder" : ""}`}
                placeholder="last name"
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
              {lastNameErr && <span className="text-danger">Last name should not be empty</span>}
            </div>
          </div>
          <div className="form-group pb-4 row">
            <label htmlFor="emailid" className="col-sm-3 col-form-label">
              Email id
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className={`form-control ${emailErr ? "redBorder" : ""}`}
                placeholder="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              {emailErr && <span className="text-danger">enter valid email address</span>}
            </div>
          </div>
          <div className="form-group pb-4 row">
            <label htmlFor="mobile number" className="col-sm-3 col-form-label">
              Mobile number
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className={`form-control ${mobileNumberErr ? "redBorder" : ""}`}
                placeholder="mobile number"
                value={mobileNumber}
                onChange={event => {
                  if (event.target.value.length > 10) {
                    event.preventDefault();
                  } else {
                    setMobileNumber(event.target.value);
                  }
                }}
              />
              {mobileNumberErr && (
                <span className="text-danger">
                  mobile number should not be empty and it should be 10 digit numerics.
                </span>
              )}
            </div>
          </div>

          <div className="form-group pb-4 row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type={inputPassword}
                className={`form-control ${passwordErr ? "redBorder" : ""}`}
                placeholder="Password"
                id="passcode"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              {passwordErr && <span className="text-danger">password should be valid</span>}
              <div className="showPasswordWrapper d-flex align-items-center mt-3">
                <input className="cursor-pointer" type="checkbox" onClick={showPassword} />
                <span>show password</span>
              </div>
            </div>
          </div>

          <div className="form-group pb-4 row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label ">
              Confirm Password
            </label>
            <div className="col-sm-9">
              <input
                className={`form-control ${passwordMatchErr ? "redBorder" : ""}`}
                placeholder="Re-enter Password"
                type="text"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              />
              {passwordMatchErr && <span className="text-danger">Password should be same </span>}
            </div>
          </div>
        </form>
        <div className="text-center signUpActionWrap row d-flex justify-content-center">
          <button onClick={handleSubmit} className="btn btn-primary col-sm-3">
            Sign Up
          </button>
          <button className="btn btn-warning col-sm-3" onClick={resetForm}>
            Reset
          </button>
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
