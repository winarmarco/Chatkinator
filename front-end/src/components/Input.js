import React, {useEffect, useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

const Input = (props) => {
  const type = props.type || "text";
  const placeholder = props.placeholder || "";
  const [showPassword, setShowPassword] = useState(false);
  const value = props.value;
  const error = props.error;

  let inputType = type;

  if (type === "password") {
    inputType = (showPassword) ? "text" : "password";
  }


  const className =
    "px-3 py-2 bg-gunmetal-300 block w-full rounded-md shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 placeholder-silver text-sand pr-10 ".concat(
      error ? "border-red-500 border-2" : "focus:ring-crayola focus:ring-2"
    );

  const inputHandler = (event) => {
    props.onInput(event);
  };

  return (
    <div>
      <div>
        <label
          htmlFor={props.id}
          className="mb-1 block text-sm font-medium text-sand"
        >
          {props.label}
        </label>
        <div className="relative">
          {type === "password" && (
            <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2.5">
              {!showPassword ? (
                <AiFillEye
                  onClick={() => setShowPassword(true)}
                  className="h-5 w-5 text-gray-500"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(false)}
                  className="h-5 w-5 text-gray-500"
                />
              )}
            </button>
          )}
          <input
            className={className}
            type={inputType}
            id={props.id}
            name={props.id}
            placeholder={placeholder}
            required={props.required}
            value={value}
            onInput={inputHandler}
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {props.message && (
        <p className="mt-1 text-sm text-gray-500">{props.message}</p>
      )}
    </div>
  );
};

export default Input;
