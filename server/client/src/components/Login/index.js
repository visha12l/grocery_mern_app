import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/userSlice";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
import EmailLogin from "./EmailLogin";
import { ERRORS } from "../../constants/error";
import MobileLogin from "./MobileLogin";
import CustomOtpInput from "../common/CustomOtpInput";
const { API } = require("../../config/" + process.env.NODE_ENV);

// import {}
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phonenumber: "",
    otp: "",
  });
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
    phonenumber: "",
    otp: "",
  });
  const [otpScreen, setOtpScreen] = useState(false);
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const validatePhoneNumber = (phonenumber) => {
    const re = /^[789]\d{9}$/;
    return re.test(phonenumber);
  };
  const validatePassword = (password) => {
    return password.trim().length > 7;
  };
  const validateOtp = (otp, numInputs) => {
    return otp.trim().length === numInputs;
  };
  const [loginType, setLoginType] = useState("email");
  const dispatch = useDispatch();
  const isEmailLogInFormValid = (
    email = formData?.email,
    password = formData?.password
  ) => {
    const updatedError = { ...fieldError };
    updatedError["email"] = validateEmail(email) ? "" : ERRORS.EMAIL_ID_VALID;
    updatedError["password"] = validatePassword(password)
      ? ""
      : ERRORS.PASSWORD_LENGTH;
    setFieldError(updatedError);
    return validateEmail(email) && validatePassword(password);
  };
  const isPhoneNumberLogInFormValid = (phonenumber = formData?.phonenumber) => {
    const updatedError = { ...fieldError };
    updatedError["phonenumber"] = validatePhoneNumber(phonenumber)
      ? ""
      : ERRORS.INVALID_PHONE_NUMBER;
    setFieldError(updatedError);
    return validatePhoneNumber(phonenumber);
  };
  const isOtpValid = (otp = formData?.otp) => {
    const updatedError = { ...fieldError };
    updatedError["otp"] = validateOtp(otp, 6) ? "" : ERRORS.INVALID_OTP;
    setFieldError(updatedError);
    return validateOtp(otp, 6);
  };
  const onEmailSubmit = async () => {
    const loginResponse = await axios.post(
      `http://grocery-app-vishal.herokuapp.com${API.USER_END_POINT}/login`,
      { email: formData?.email, password: formData?.password }
    );
    if (loginResponse.data.status === 400) {
      toast(loginResponse.data.message);
    } else {
      localStorage.setItem("userToken", loginResponse.data.token);
      // set data into redux here
      dispatch(loginUser(loginResponse.data));
      toast("Login Successfull redirecting to app");
    }
  };
  const otpSubmit = async () => {
    if (isOtpValid()) {
      //SUBMIT OTP CODE
    }
  };
  function handleSubmit() {
    if (loginType === "email" && isEmailLogInFormValid()) {
      onEmailSubmit();
    } else if (loginType === "phonenumber" && isPhoneNumberLogInFormValid()) {
      setOtpScreen(true);
    }
  }
  const onChangeLoginType = (type) => {
    if (type !== loginType) {
      setLoginType(type);
      setOtpScreen(false);
      setFormData({ email: "", password: "", phonenumber: "", otp: "" });
      setFieldError({ email: "", password: "", phonenumber: "", otp: "" });
    }
  };
  const onOtpChange = (otp) => {
    setFormData({ ...formData, otp });
  };
  return (
    <div className="container text-left">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <div className="loginTab">
          <button
            className={`btn btn-primary m-1 ${
              loginType === "email" && "btn-success"
            }`}
            onClick={() => onChangeLoginType("email")}
          >
            Log In Email
          </button>
          <button
            className={`btn btn-primary m-1 ${
              loginType === "phonenumber" && "btn-success"
            }`}
            onClick={() => onChangeLoginType("phonenumber")}
          >
            Log In Mobile Number
          </button>
        </div>
        {otpScreen ? (
          <CustomOtpInput
            formData={formData}
            fieldError={fieldError}
            onChange={onOtpChange}
          />
        ) : loginType === "email" ? (
          <EmailLogin
            errorField={fieldError}
            formData={formData}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
          />
        ) : (
          <MobileLogin
            errorField={fieldError}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        <div className="pt-3 d-flex align-items-center">
          <button
            className="btn btn-primary col-sm-3 offset-sm-3"
            onClick={otpScreen ? otpSubmit : handleSubmit}
          >
            {loginType === "email" || otpScreen ? "Log In" : "Submit"}
          </button>
          <p className="m-0 ms-5">
            Create New Account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
