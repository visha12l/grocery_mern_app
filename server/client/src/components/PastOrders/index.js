import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import "./pastOrders.css";
const { API } = require("../../config/" + process.env.NODE_ENV);

const PastOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const userId = useSelector(state => state.userSlice.user._id);

  const loadPastOrderData = async () => {
    const pastOrderResp = await axios.post(`${API.ORDER_ENDPOINT}/getOrders`, {
      userId
    });
    setOrderData(pastOrderResp.data.pastOrders);
  };

  useEffect(() => {
    loadPastOrderData();
  }, []);

  function getOrderDiscription(totalItems) {
    return totalItems.reduce(function (string, order) {
      return string + order.name + " x " + order.weight + ", ";
    }, "");
  }

  function getTotalPrice(totalItems) {
    return totalItems.reduce(function (sum, food) {
      return sum + food.price * food.weight;
    }, 0);
  }

  function printPastOrders() {
    return orderData?.map(function (order) {
      return (
        <li className="mb-4 p-4">
          <div className="d-flex justify-content-between">
            <h6 className="">Order: {order._id}</h6>
            <div className="">
              <strong>Ordered On: </strong>
              {_.formatDate(order.createdAt)}
            </div>
          </div>
          <div className="pastOrderDetails d-flex justify-content-between">
            <div className="orderInfo">
              <p className="">
                <strong>Description: </strong> {getOrderDiscription(order.totalItems)}
              </p>
            </div>
            <div className="">
              <strong>Total Paid: </strong>₹{getTotalPrice(order.totalItems)}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <strong>Order Status: </strong> {order.status}
            </div>
            <div>
              <strong>Payment Type: </strong> {order.paymentType}
            </div>
          </div>
        </li>
      );
    });
  }
  return (
    <div className="container pastOrderContainer">
      <div className="row">
        <h1 className="py-4">Past Orders</h1>
        <div className="pastOrderList">
          <ul className="p-0">{printPastOrders()}</ul>
        </div>
      </div>
    </div>
  );
};

export default PastOrders;
