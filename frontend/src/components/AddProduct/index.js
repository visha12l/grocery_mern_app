import React, { useState } from "react";
import "./index.css";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productType, setProductType] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [weightErr, setWeightErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [discountErr, setDiscountErr] = useState(false);
  const [typeErr, setTypeErr] = useState(false);

  function handleSubmit() {
    setNameErr(productName === "" ? true : false);
    setWeightErr(productWeight === "" ? true : false);
    setPriceErr(productPrice === "" ? true : false);
    setDiscountErr(productDiscount === "" ? true : false);
    setTypeErr(productType === "" ? true : false);
    if (
      productName !== "" &&
      productName !== "" &&
      productPrice !== "" &&
      productDiscount !== "" &&
      productType !== ""
    ) {
      // call submit API
    }
  }

  return (
    <div className="container">
      <div className="productsContainer mx-auto">
        <h2 className="text-center">Add product Form</h2>
        <div className="d-flex py-3 p-relative align-items-center">
          <div className="flex-1">Product Name</div>
          <input
            className="col-form-label flex-2"
            type="text"
            placeholder="enter product name"
            onChange={event => setProductName(event.target.value)}
            value={productName}
          />
          {nameErr && <span className="text-danger">Name should not be empty</span>}
        </div>
        <div className="d-flex py-3 p-relative align-items-center">
          <div className="flex-1">Weight</div>
          <input
            className="col-form-label flex-2"
            type="number"
            placeholder="enter weight"
            onChange={event => setProductWeight(event.target.value)}
            value={productWeight}
          />
          {weightErr && <span className="text-danger">Weight should not be empty</span>}
        </div>
        <div className="d-flex py-3 p-relative align-items-center">
          <div className="flex-1">Product Price</div>
          <input
            className="col-form-label flex-2"
            type="number"
            placeholder="enter price"
            onChange={event => setProductPrice(event.target.value)}
            value={productPrice}
          />
          {priceErr && <span className="text-danger">price can not be empty</span>}
        </div>
        <div className="d-flex py-3 p-relative align-items-center">
          <div className="flex-1">Discount Percentage</div>
          <input
            className="col-form-label flex-2"
            type="number"
            placeholder="enter discount %"
            onChange={event => setProductDiscount(event.target.value)}
            value={productDiscount}
          />
          {discountErr && <span className="text-danger">Set discount percentage</span>}
        </div>
        <div className="d-flex py-3 p-relative align-items-center">
          <div className="flex-1">Product Type</div>
          <input
            className="col-form-label flex-2"
            type="text"
            placeholder="enter products type"
            onChange={event => setProductType(event.target.value)}
            value={productType}
          />
          {typeErr && <span className="text-danger">mention type of product</span>}
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary col-md-4" onClick={handleSubmit}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
