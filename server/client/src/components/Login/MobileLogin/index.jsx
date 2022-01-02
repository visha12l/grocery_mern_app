import React from "react";

const MobileLogin = ({ formData, errorField, setFormData }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <form>
      <div className="form-group py-3 row">
        <label className={`col-sm-2 ${errorField?.phonenumber ? "text-danger" : ""}  col-form-label`}>Mobile</label>
        <div className="col-sm-6">
          <input
            type="text"
            className={`form-control ${
              errorField?.phonenumber ? "is-invalid" : ""
            }`}
            placeholder="Enter Mobile Number"
            name="phonenumber"
            value={formData?.phonenumber}
            onChange={onChange}
          />
        </div>
        <div class="col-sm-4">
            <small id="passwordHelp" class="text-danger">
              {errorField.phonenumber && (
                <span className="text-danger">{errorField.phonenumber}</span>
              )}
            </small>
        </div>
      </div>
    </form>
  );
};

export default MobileLogin;
