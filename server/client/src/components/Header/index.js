import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/userSlice";
import "./index.css";
import Logo from "../../logo.png";

const Header = () => {
  console.log(process.env.NODE_ENV);
  const navigate = useNavigate();
  const userName = useSelector(state => state.userSlice.user.name);
  const dispatch = useDispatch();

  return (
    <header id="header">
      <div className="headerContainer">
        <nav className="d-flex nav-main align-items-center justify-content-space-between">
          <a>
            <img src={Logo} />
          </a>
          <ul className="headerList d-flex justify-content-center">
            <li>
              <a href="#">
                {!userName && (
                  <Link className="btn btn-primary m-3" to="/signup">
                    Sign up
                  </Link>
                )}
              </a>
            </li>
            <li>
              {!userName && (
                <Link className="btn btn-warning m-3" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li>
              {userName && (
                <Link className="btn btn-primary m-3" to="/addproduct">
                  Add new product
                </Link>
              )}
            </li>
            <li>
              {userName && (
                <button
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    dispatch(logoutUser());
                  }}
                  className="btn btn-success m-3"
                >
                  Log out
                </button>
              )}
            </li>
            <li>
              {/* <Link className="btn btn-dark m-3" to="/todo">
                    Todo App
                  </Link> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
