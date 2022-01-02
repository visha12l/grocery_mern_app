import React from "react";

const MobileLogin = ({ formData, errorField, setFormData }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form>
      <div className="form-group py-3 row">
        <label className="col-sm-3 col-form-label">Phone Number</label>
        <div className="col-sm-9">
          <input
            type="text"
            className={`form-control ${
              errorField?.phonenumber ? "redBorder" : ""
            }`}
            placeholder="Phone Number"
            name="phonenumber"
            value={formData?.phonenumber}
            onChange={onChange}
          />
          {errorField?.phonenumber && (
            <span className="text-danger text-left posAbsolute">
              {errorField.phonenumber}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default MobileLogin;
