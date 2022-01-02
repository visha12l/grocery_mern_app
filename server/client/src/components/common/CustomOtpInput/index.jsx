import React from "react";
import "./index.modules.scss";

const CustomOtpInput = ({ otpInput, otpErr, onSubmit, setOtpInput, btnText }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
    <div className="position-relative">
        <div className="card p-2 text-center">
            <h6>Please enter the one time password <br /> to verify your account</h6>
            <div> 
              A code has been sent to
              your mobile number
            </div>
            <div 
              className="p-relative p-3">
                <input
                value={otpInput}
                onChange={event => { setOtpInput(event.target.value)}} 
                className="text-center form-control rounded" 
                type="text" maxlength="6" /> 
            {otpErr && <span className="text-danger">{otpErr}</span>}
            </div>
            <div className="mt-4"> 
              <button onClick={onSubmit} className="btn btn-success px-4 validate">{btnText}</button> 
            </div>
        </div>
    </div>
    </div>
  );
};

export default CustomOtpInput;
