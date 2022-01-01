import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/userSlice";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
const { API } = require("../../config/" + process.env.NODE_ENV);

// import {}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const dispatch = useDispatch();
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleSubmit() {
    if (email === "") {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (password === "") {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (email !== "" && password !== "" && isValidEmail) {
      const loginResponse = await axios.post(`${API.USER_END_POINT}/login`, { email, password });
      if (loginResponse.data.status === 400) {
        toast(loginResponse.data.message);
      } else {
        localStorage.setItem("userToken", loginResponse.data.token);
        // set data into redux here
        dispatch(loginUser(loginResponse.data));
        toast("Login Successfull redirecting to app");
      }
      // TODO :: add notification component for success and error
      // redirect user to cart after successfull API call
    }
  }

  return (
    <div className="container text-left">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <h1>Log in</h1>
        <form>
          <div className="form-group py-3 row">
            <label className="col-sm-3 col-form-label">Email</label>
            <div className="col-sm-9">
              <input
                type="text"
                className={`form-control ${emailErr ? "redBorder" : ""}`}
                placeholder="Email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              {emailErr && <span className="text-danger text-left posAbsolute">Invalid email</span>}
            </div>
          </div>
          <div className="form-group py-3 row">
            <label className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input
                type="password"
                className={`form-control ${passwordErr ? "redBorder" : ""}`}
                placeholder="Password"
                value={password}
                onChange={event => setPassWord(event.target.value)}
                onKeyDown={e => {
                  if (e.keyCode == 13) {
                    handleSubmit();
                  }
                }}
              />
              {passwordErr && (
                <span className="text-danger text-left posAbsolute">invalid password</span>
              )}
            </div>
          </div>
        </form>
        <div className="pt-3 d-flex align-items-center">
          <button className="btn btn-primary col-sm-3 offset-sm-3" onClick={handleSubmit}>
            Log In
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
