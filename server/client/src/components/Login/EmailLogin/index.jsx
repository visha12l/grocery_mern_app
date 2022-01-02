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
        <label className="col-sm-3 col-form-label">Email</label>
        <div className="col-sm-9">
          <input
            type="text"
            className={`form-control ${errorField?.email ? "redBorder" : ""}`}
            placeholder="Email"
            name="email"
            value={formData?.email}
            onChange={onChange}
          />
          {errorField?.email && (
            <span className="text-danger text-left posAbsolute">
              {errorField.email}
            </span>
          )}
        </div>
      </div>
      <div className="form-group py-3 row">
        <label className="col-sm-3 col-form-label">Password</label>
        <div className="col-sm-9">
          <input
            type="password"
            className={`form-control ${
              errorField?.password ? "redBorder" : ""
            }`}
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
          {errorField?.password && (
            <span className="text-danger text-left posAbsolute">
              {errorField?.password}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default EmailLogin;
