import React from "react";

const Input = (props) => {
    const type = props.type || "text";
    const placeholder = props.placeholder || "";
    console.log(props.message);

    return (
        <div>
            <label
                for={props.id}
                class="mb-1 block text-sm font-medium text-sand"
            >
                {props.label}
            </label>
            <input
                type={type}
                id={props.id}
                className="px-3 py-2 bg-gunmetal-300 block w-full rounded-md 
                shadow-sm focus:ring-crayola focus:ring-2 focus:outline-none
                disabled:cursor-not-allowed disabled:bg-gray-50 
                disabled:text-gray-500 placeholder-silver text-sand"
                placeholder={placeholder}
                required={props.required}
            />
            {props.message && (
                <p class="mt-1 text-sm text-gray-500">{props.message}</p>
            )}
        </div>
    );
};

export default Input;
