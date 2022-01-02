import React from "react";
import OtpInput from "react-otp-input";
import "./index.modules.scss";

const CustomOtpInput = ({ formData, fieldError, onChange }) => {
  return (
    <div>
      <div className="prompt">
        Enter the code generated on your mobile device below to log in!
      </div>
      <OtpInput
        value={formData.otp}
        onChange={onChange}
        numInputs={6}
        hasErrored={fieldError?.otp}
        separator={<span>-</span>}
        errorStyle="redBorder"
      />
      {fieldError?.otp && (
        <span className="text-danger text-left">{fieldError.otp}</span>
      )}
    </div>
  );
};

export default CustomOtpInput;
