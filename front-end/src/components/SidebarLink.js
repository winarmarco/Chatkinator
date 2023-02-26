import React from "react";
import {BiMessageDetail} from "react-icons/bi";

const SidebarLink = (props) => {
  console.log(props.icon)
  return (
    <a href="/chat/sadasdas" class="text-silver flex py-3 px-3 items-end gap-3 relative rounded-md hover:bg-gunmetal-600 cursor-pointer break-all hover:pr-4 group ">
      {props.icon}
      <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
          {props.title}
        <div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gunmetal-900 group-hover:from-gunmetal-300"></div>
      </div>
    </a>
  );
};

export default SidebarLink;
