import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authServer } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { setProducts } from "../../redux/reducers/productSlice";
import { setUserCart } from "../../redux/reducers/userSlice";
import Cart from "../Cart";
const { API } = require("../../config/" + process.env.NODE_ENV);

console.log("ENVIRONMENT", process.env);
// TODO render seperate component for cart
const GroceryApp = () => {
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();

  const productData = useSelector(state => state.productSlice.products);
  const user = useSelector(state => state.userSlice.user);

  const { _id, name, cart } = user;
  const loadProductsData = async () => {
    const result = await authServer.get("/products");
    dispatch(setProducts(result.data));
  };

  const loadCartData = async () => {
    const savedData = await authServer.get(`${API.CART_END_POINT}/${_id}`);
    if (savedData) {
      dispatch(setUserCart(savedData.data.cart));
    }
  };

  useEffect(() => {
    loadProductsData();
  }, []);

  const updateCartDataOnServer = async updatedCartData => {
    const result = await authServer.post(API.CART_END_POINT, {
      id: _id,
      cart: updatedCartData
    });
    if (result) {
      loadCartData();
    }
  };

  const handleAddToCart = item => {
    let oldCartList = [...cart];
    // if new Item does not exist in old array then only push it
    // otherwise do not push it
    let shouldAddItem = true;
    oldCartList.forEach(foodItem => {
      if (item.name === foodItem.name) {
        shouldAddItem = false;
      }
    });
    if (shouldAddItem) {
      oldCartList.push(item);
      updateCartDataOnServer(oldCartList);
    } else {
      toast("Item already Added in Cart");
    }
  };

  return (
    <div className="marketContainer mx-auto">
      <ToastContainer />
      <h1 className="text-center">Welcome {name}</h1>
      <h1 className="heading text-center mb-3">Our Menu</h1>
      <div className="row">
        <div className="col-sm-8">
          <div className="searchBar d-flex align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="search products"
              value={filterValue}
              onChange={event => setFilterValue(event.target.value)}
            />
            <span className="col-sm-3 ms-3 white">{productData.length} products found</span>
          </div>
          <ul className="row groceryItemsList p-0">
            {productData.length > 0 &&
              productData
                .filter(item => item?.name?.toLowerCase()?.includes(filterValue))
                .map((item, key) => {
                  return (
                    <li key={key} className="col-sm-4">
                      <div className="boxWrapper p-0">
                        <div className="imageWrapper">
                          <img src={item.image} />
                        </div>
                        <div className="infoWrapper">
                          <h4 className="nameWrapper">{item.name}</h4>
                          <p className="quantityWrapper">
                            {item.weight} {item.unit}
                          </p>
                        </div>
                        <div className="priceWrapper p-3 d-flex align-items-center">
                          <div className="flex-1">
                            <h6>
                              <strong>₹{item.price - item.price / item.discountPercentage} </strong>
                              <span className="text-decoration-line-through originalPrice">
                                ₹{item.price}
                              </span>
                            </h6>
                          </div>
                          <button
                            className="btn btn-success cartButton"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
        {!_.isEmpty(cart) && <Cart />}
      </div>
    </div>
  );
};

export default GroceryApp;
