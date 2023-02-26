import React from "react";

const Button = (props) => {
  const className = "px-3 py-2 bg-crayola rounded-md text-sand ".concat(
    props.className || ""
  );

  return (
    <button className={className} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
