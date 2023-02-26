import React from "react";

const Input = (props) => {
    const type = props.type || "text";
    const placeholder = props.placeholder || "";
    const defaultValue = props.defaultValue || '';

    return (
        <div>
            <label
                htmlFor={props.id}
                className="mb-1 block text-sm font-medium text-sand"
            >
                {props.label}
            </label>
            <input
                className="px-3 py-2 bg-gunmetal-300 block w-full rounded-md 
                shadow-sm focus:ring-crayola focus:ring-2 focus:outline-none
                disabled:cursor-not-allowed disabled:bg-gray-50 
                disabled:text-gray-500 placeholder-silver text-sand"
                type={type}
                id={props.id}
                name={props.id}
                placeholder={placeholder}
                required={props.required}
                defaultValue={defaultValue}
                onInput={props.onInput}
            />
            {props.message && (
                <p className="mt-1 text-sm text-gray-500">{props.message}</p>
            )}
        </div>
    );
};

export default Input;
