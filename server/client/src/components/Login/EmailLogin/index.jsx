import React from "react";
import "./index.modules.scss";

const EmailLogin = ({ errorField, handleSubmit, formData, setFormData }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form>
      <div className="form-group py-3 row">
        <label className={`col-sm-2 col-form-label ${errorField?.email ? "text-danger" : "text-success"}`}>Email</label>
        <div className="col-sm-6 p-relative">
           <input
            type="text"
            className={`form-control ${errorField?.email ? "is-invalid" : "is-valid"}`}
            placeholder="Email"
            name="email"
            value={formData?.email}
            onChange={onChange}
          />
        </div>
        <div class="col-sm-3">
          <small id="passwordHelp" class="text-danger">
            {errorField.email}
          </small>      
        </div>
      </div>
      <div className="form-group py-3 row">
        <label className={`col-sm-2 col-form-label ${errorField?.password ? "text-danger" : "text-success"}`}>Password</label>
        <div className="col-sm-6">
          <input
            type="password"
            className={`form-control ${errorField?.password ? "is-invalid" : "is-valid"}`}
            placeholder="Password"
            name="password"
            value={formData?.password}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
          />
        </div>
        <div class="col-sm-3">
        <small id="passwordHelp" class="text-danger">
        {errorField?.password}
        </small>      
      </div>
      </div>
    </form>
  );
};

export default EmailLogin;
