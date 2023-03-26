import React from "react";
import Button from "./Button";
import SidebarLink from "./SidebarLink";
import {BiMessageDetail} from "react-icons/bi";
import {FaSignOutAlt} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {chatActions} from "../store/chat-slice";
import {chatsActions} from "../store/chats-slice";
import {authActions} from "../store/auth-slice";
import SidebarButton from "./SidebarButton";

const Sidebar = (props) => {
  const chats = props.chats;
  const show = useSelector((state) => state.ui.sidebar.show);
  const selectedChat = props.selectedChat;
  const sidebarWidth = props.style.width;
  // console.log(`-left-[${sidebarWidth}]` === "-left-[18rem]");
  const position = (!show) ? `-left-[${sidebarWidth}]` : "left-0"

  const style = {
    ...props.style,
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewChatHandler = (event) => {
    dispatch(chatActions.clearChat());
    dispatch(chatsActions.unselect());
    navigate("/chat");
  };

  const logoutHandler = (event) => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <div
      className={`bg-gunmetal-900 fixed sm:relative flex flex-col h-full
                 gap-y-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                z-30 px-2 py-4 transition-all duration-300 ${position} sm:left-0`}
      style={style}
    >
      <Button
        onClick={addNewChatHandler}
        className="mx-1 bg-transparent hover:bg-silver hover:bg-opacity-20 transition-all text-left py-3 border-silver border-2 mb-2"
      >
        + Add new Chat
      </Button>
      <div className="h-full flex-1 overflow-y-auto scrollbar-thumb-gunmetal-700 scrollbar-thin scrollbar-track-none">
        <div className="flex flex-col gap-y-2">
          {chats &&
            chats.map((data) => (
              <SidebarLink
                selected={selectedChat && selectedChat._id === data._id}
                key={data._id}
                chatId={data._id}
                href={`/chat/${data._id}`}
                title={data.title}
                icon={<BiMessageDetail />}
              />
            ))}
        </div>
      </div>
      <div className="w-full border-t-2 border-silver-300"></div>
      <SidebarButton
        title="Sign out"
        onClick={logoutHandler}
        href="/login"
        icon={<FaSignOutAlt />}
      />
      <SidebarLink title="Profile" icon={<CgProfile />} />
    </div>
  );
};

export default Sidebar;
