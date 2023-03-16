import React from "react";

const SidebarButton = (props) => {
  return (
    <div onClick={props.onClick} className="text-silver flex py-3 px-4 items-center gap-3 relative rounded-md hover:bg-gunmetal-600 cursor-pointer break-all hover:pr-4 group ">
      {props.icon}
      <div className="flex-1 text-ellipsis overflow-hidden break-all relative">
          {props.title}
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gunmetal-900 group-hover:from-gunmetal-600"></div>
      </div>
    </div>
  );
};

export default SidebarButton;
