import _ from "lodash";
import React from "react";
import { authServer } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserCart } from "../../redux/reducers/userSlice";

// cart should be seperate collection whose value can be fetched by sending
// user id

const Cart = () => {
  const cartData = useSelector(state => state.userSlice.user.cart);
  const userId = useSelector(state => state.userSlice.user._id);
  const dispatch = useDispatch();
  const loadCartData = async () => {
    const savedData = await authServer.get(`/users/cart/${userId}`);
    if (savedData) {
      dispatch(setUserCart(savedData.data.cart));
    }
  };

  const updateCartDataOnServer = async updatedCartData => {
    const result = await authServer.post(`/users/cart`, {
      id: userId,
      cart: updatedCartData
    });
    if (result) {
      loadCartData();
    }
  };

  const handleCounterClick = (currentClickedItemId, action, foodWeight) => {
    let updatedData = [];
    if (action === "minus" && foodWeight === 1) {
      // call delete item from cart Method
      // then remove that item from cart array using filter method.
      const remainingItems = cartData.filter((data, key) => {
        return key !== currentClickedItemId;
      });
      updatedData = remainingItems;
    } else {
      const result = cartData.map((food, key) => {
        let newWeight = food.weight;
        if (key === currentClickedItemId) {
          if (action === "plus") {
            newWeight = food.weight + 1;
          } else {
            newWeight = food.weight - 1;
          }
        }
        return { ...food, weight: newWeight };
      });
      updatedData = result;
    }
    updateCartDataOnServer(updatedData);
  };

  const getTotalPrice = () => {
    return cartData.reduce((sum, food) => {
      return sum + (food.price - food.price / food.discountPercentage) * food.weight;
    }, 0);
  };

  return (
    <div className="col-sm-4">
      <div>
        <div className="d-flex justify-content-between">
          <h2>Cart</h2>
          <button className="btn btn-danger" onClick={() => updateCartDataOnServer([])}>
            Empty Cart
          </button>
        </div>
        <p>{cartData.length} Items</p>
      </div>
      <ul className="p-0">
        {cartData.map((food, key) => {
          return (
            <li key={key} className="pb-3 d-flex align-items-center justify-content-between">
              <span className="itemName">{food.name}</span>
              <div className="buttonBox">
                <button
                  className="lightGreen btn"
                  onClick={() => handleCounterClick(key, "minus", food.weight)}
                >
                  -
                </button>
                <span className="lightGreen btn">{food.weight}</span>
                <button className="lightGreen btn" onClick={() => handleCounterClick(key, "plus")}>
                  +
                </button>
              </div>
              <span className="priceItem text-right">
                <strong>
                  ₹{(food.price - food.price / food.discountPercentage) * food.weight}
                </strong>
              </span>
            </li>
          );
        })}
      </ul>
      <div>
        {cartData.length !== 0 && (
          <div>
            <div className="d-flex align-items-center justify-content-between pb-3">
              <h3 className="m-0">Subtotal</h3>
              <h3 className="m-0">₹{getTotalPrice()}</h3>
            </div>
            <p className="d-none">Extra charges may apply</p>
            <div className="checkoutWrapper">
              <button
                className="btn btn-success"
                onClick={() => {
                  // this will be function to place order and clear users cart
                }}
              >
                Place Order -&gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;