import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { chatsActions } from "../store/chats-slice";

const SidebarLink = (props) => {
  const dispatch = useDispatch();
  
  const clickHandler = () => {
    const href = props.href;
    const fragments = href.split('/');
    if (fragments.length > 2) {
      const chatId = fragments[2];
      dispatch(chatsActions.select({
        chatId: chatId,
      }))
  }
  }

  return (
    <Link reloadDocument to={props.href} onClick={clickHandler} className="text-silver flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-gunmetal-600 cursor-pointer break-all hover:pr-4 group ">
      {props.icon}
      <div className="flex-1 text-ellipsis overflow-hidden break-all relative">
          {props.title}
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gunmetal-900 group-hover:from-gunmetal-600"></div>
      </div>
    </Link>
  );
};

export default SidebarLink;
