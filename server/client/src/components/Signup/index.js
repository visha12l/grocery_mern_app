import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import CustomOtpInput from "../common/CustomOtpInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [showEnterOtpScreen, setShowEnterOtpScreen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpErr, setOtpErr] = useState(false);

  const resetForm = () => {
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
  };

  const showPassword = () => {
    if (inputPassword === "password") {
      setInputPassword("text");
    } else {
      setInputPassword("password");
    }
  };

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
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
      const generateOtp = await axios.post(`${API.USER_END_POINT}/sendOtp`, { email });
      if (generateOtp && generateOtp.data.otp) {
        // show enter otp screen
        setShowEnterOtpScreen(true);
      } else {
        // show error and hide enter otp screen
        toast(generateOtp.data.message);
        setShowEnterOtpScreen(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    const verifyOtp = await axios.post(`${API.USER_END_POINT}/verifyOtp`, { otpInput });
    if (verifyOtp && verifyOtp.data.verified) {
      // call signup API with data
      const userData = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        mobileNumber,
        isAdmin: false
      };
      // const signupResponse = await axios.post(`${API.USER_END_POINT}/signup`, userData);
    } else {
      setOtpErr(verifyOtp.data.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="signupContainer mx-auto">
        <h1 className="text-center pb-3">Registration Form</h1>
        {!showEnterOtpScreen && (
          <>
            <form>
              <div className="form-group py-3 row">
                <div className="col-sm-6 inputWrapper">
                  <input
                    type="text"
                    className={`form-control ${firstNameErr ? "is-invalid" : ""}`}
                    placeholder="first name"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                  />
                </div>
                <div class="col-sm-6">
                  <small id="passwordHelp" class="text-danger">
                    {firstNameErr && (
                      <span className="text-danger">first name should not be empty</span>
                    )}
                  </small>
                </div>
              </div>
              <div className="form-group py-3 row">
                <div className="col-sm-6 inputWrapper">
                  <input
                    type="text"
                    className={`form-control ${lastNameErr ? "is-invalid" : ""}`}
                    placeholder="last name"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                  />
                </div>
                <div class="col-sm-6">
                  <small id="passwordHelp" class="text-danger">
                    {lastNameErr && (
                      <span className="text-danger">Last name should not be empty</span>
                    )}
                  </small>
                </div>
              </div>
              <div className="form-group py-3 row">
                <div className="col-sm-6 inputWrapper">
                  <input
                    type="text"
                    className={`form-control ${emailErr ? "is-invalid" : ""}`}
                    placeholder="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                </div>
                <div class="col-sm-6">
                  <small id="passwordHelp" class="text-danger">
                    {emailErr && <span className="text-danger">enter valid email address</span>}
                  </small>
                </div>
              </div>
              <div className="form-group py-3 row">
                <div className="col-sm-6 inputWrapper">
                  <input
                    type="number"
                    className={`form-control ${mobileNumberErr ? "is-invalid" : ""}`}
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
                </div>
                <div class="col-sm-6">
                  <small id="passwordHelp" class="text-danger">
                    {mobileNumberErr && (
                      <span className="text-danger">
                        mobile number should not be empty and it should be 10 digit numerics.
                      </span>
                    )}
                  </small>
                </div>
              </div>

              <div className="form-group py-3 row">
                <div className="col-sm-6 inputWrapper">
                  <input
                    type={inputPassword}
                    className={`form-control ${passwordErr ? "is-invalid" : ""}`}
                    placeholder="Password"
                    id="passcode"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                  <div className="showPasswordWrapper d-flex align-items-center mt-3">
                    <input className="cursor-pointer" type="checkbox" onClick={showPassword} />
                    <span>show password</span>
                  </div>
                </div>
                <div class="col-sm-6">
                  <small id="passwordHelp" class="text-danger">
                    {passwordErr && <span className="text-danger">password should be valid</span>}
                  </small>
                </div>
              </div>

              <div className="form-group py-3 row">
                <div className="col-sm-6 inputWrapper">
                  <input
                    className={`form-control ${passwordMatchErr ? "is-invalid" : ""}`}
                    placeholder="Re-enter Password"
                    type="text"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                  />
                </div>
                <div class="col-sm-6">
                  <small id="passwordHelp" class="text-danger">
                    {passwordMatchErr && (
                      <span className="text-danger">Password should be same </span>
                    )}
                  </small>
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
          </>
        )}
        {showEnterOtpScreen && (
          <CustomOtpInput
            btnText="Sign up"
            otpErr={otpErr}
            setOtpInput={setOtpInput}
            otpInput={otpInput}
            onSubmit={handleVerifyOtp}
          />
        )}
      </div>
    </div>
  );
}

export default Signup;
