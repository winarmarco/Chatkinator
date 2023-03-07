import React, {useEffect, useState} from "react";

const Input = (props) => {
  const type = props.type || "text";
  const placeholder = props.placeholder || "";
  const value = props.value;
  const [error, setError] = useState(props.error);
  
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const className =
    "px-3 py-2 bg-gunmetal-300 block w-full rounded-md shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 placeholder-silver text-sand ".concat(
      (error) ? "border-red-500 border-2" : "focus:ring-crayola focus:ring-2"
    );

  const inputHandler = (event) => {
    setError("");
    props.onInput(event);
  };
  


  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-1 block text-sm font-medium text-sand"
      >
        {props.label}
      </label>
      <input
        className={className}
        type={type}
        id={props.id}
        name={props.id}
        placeholder={placeholder}
        required={props.required}
        value={value}
        onInput={inputHandler}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {props.message && (
        <p className="mt-1 text-sm text-gray-500">{props.message}</p>
      )}
    </div>
  );
};

export default Input;
