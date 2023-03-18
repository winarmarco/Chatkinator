import React from "react";
import {FaBars, FaPlus} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {chatActions} from "../store/chat-slice";
import {chatsActions} from "../store/chats-slice";
import {uiActions} from "../store/ui-slice";

const Navbar = (props) => {
  const selectedChat = props.selectedChat;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowSidebar = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const addNewChatHandler = (event) => {
    dispatch(chatActions.clearChat());
    dispatch(chatsActions.unselect());
    navigate("/chat");
  };


  return (
    <div className="bg-gunmetal-500 py-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)] px-5 flex text-silver">
      <button className="block sm:hidden" onClick={toggleShowSidebar}>
        <FaBars />
      </button>
      <span className="flex-1 text-center w-full">
        {selectedChat ? selectedChat.title : "New Chat"}
      </span>
      <button className="block sm:hidden" onClick={addNewChatHandler}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Navbar;
