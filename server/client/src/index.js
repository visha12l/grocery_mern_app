import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
// import TodoApp from "./components/TodoApp";
import GroceryApp from "./components/GroceryApp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./redux/store";
import "./utils";
const Routing = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="mainContainer">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addproduct" element={<AddProduct />} />
            {/* <Route path="/todo" element={<TodoApp />} /> */}
            <Route path="/" element={<GroceryApp />} />
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
