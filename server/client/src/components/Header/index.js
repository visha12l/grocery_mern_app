import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/userSlice";
import "./index.css";
import logoUrl from "../../logo.png";
import cartImageUrl from "../../cartImage.png";

const Header = () => {
  console.log(process.env.NODE_ENV);
  const userName = useSelector(state => state.userSlice.user.name);
  const cartData = useSelector(state => state.userSlice.user.cart);
  const dispatch = useDispatch();

  return (
    <header id="header">
      <div className="headerContainer">
        <nav className="d-flex nav-main align-items-center justify-content-space-between">
          <Link to="/">
            <img src={logoUrl} alt="grocery app" />
          </Link>
          <ul className="headerList d-flex justify-content-center align-items-center">
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
                <Link className="btn btn-primary m-3" to="/add-product">
                  Add new product
                </Link>
              )}
            </li>
            <li>
              {userName && (
                <Link className="btn btn-info m-3" to="/orders">
                  Past Orders
                </Link>
              )}
            </li>
            <li className="cartIconWrap d-flex">
              {userName && (
                <button className="btn" to="/">
                  <img className="me-1" src={cartImageUrl} alt="cart icon" />({cartData.length})
                </button>
              )}
            </li>
            <li>
              {userName && (
                <button
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    dispatch(logoutUser());
                  }}
                  className="btn btn-logOut m-3"
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
