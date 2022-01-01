import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
// import TodoApp from "./components/TodoApp";
import GroceryApp from "./components/GroceryApp";
import "./stylesheet/base.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./redux/store";
import "./utils";
import { Navigate } from "react-router-dom";

// TODO
//help option for user to call owner to get help with current order
// offers page =>
// user should be able to see previous orders
// previous order page should show it
// when user place order
// filtering products data based on category

const Routing = () => {
  const userName = useSelector(state => state.userSlice.user.name);
  return (
    <>
      <Router>
        <Header />
        <div className="mainContainer">
          <Routes>
            <Route path="/login" element={userName ? <Navigate to="/grocery" /> : <Login />} />
            <Route path="/signup" element={userName ? <Navigate to="/grocery" /> : <Signup />} />
            <Route
              exact
              path="/add-product"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/grocery"
              element={
                <PrivateRoute>
                  <GroceryApp />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Routing />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
