import React, {useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {chatsActions} from "../store/chats-slice";
import {AiFillEdit, AiOutlineLoading3Quarters} from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";
import {FiCheck} from "react-icons/fi";
import {deleteChatAction, updateChatTitleAction} from "../store/chatActions";
import {RxCross1} from "react-icons/rx";

const SidebarLink = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isUpdating = useSelector((state) => state.ui.sidebarLink.isFetching);
  const chatId = props.chatId;
  const selected = props.selected;

  const clickHandler = () => {
    dispatch(
      chatsActions.select({
        chatId: chatId,
      })
    );
  };

  const editButtonClickHandler = (event) => {
    event.preventDefault();

    if (isEditing) {
      dispatch(updateChatTitleAction(inputValue, token, chatId));
      setIsEditing(false);
    } else {
      setInputValue(props.title);
      setIsEditing(true);
    }
  };

  const deleteButtonClickHandler = (event) => {
    setIsConfirmingDelete((prevState) => {
      return !prevState;
    })
  };

  const proceedDeleteHandler = (event) => {
    dispatch(deleteChatAction(token, chatId, (data) => {
      dispatch(chatsActions.unselect());
      return navigate("/chat");
    }));
    
  }

  const editInputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const editBlurHandler = () => {
    setIsEditing(false);
    setInputValue("");
  };

  const linkClassName =
    "text-silver flex py-3 px-4 items-center gap-3 relative rounded-md hover:bg-gunmetal-600 cursor-pointer break-all group ".concat(
      selected ? "bg-gunmetal-700 pr-16 break-all" : "hover:pr-4"
    );
  const shadesClassName =
    "absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l group-hover:from-gunmetal-600 ".concat(
      selected ? "from-gunmetal-700" : "from-gunmetal-900"
    );

  const content = (
    <Fragment>
      {(!isConfirmingDelete) ? props.icon : <BsFillTrashFill />}
      {!isEditing && (
        <div className="flex-1 text-ellipsis overflow-hidden break-all relative max-h-[28px] border-2 border-transparent">
          {(isConfirmingDelete) ? `Delete "${props.title}"?` : props.title}
          <div className={shadesClassName}></div>
        </div>
      )}

      {isEditing && (
        <div className="flex-1">
          <input
            autoFocus="autofocus"
            type="text"
            onInput={editInputHandler}
            onBlur={editBlurHandler}
            className="bg-transparent p-0 m-0 w-full mr-0 focus:outline-none rounded-sm border-2 border-gunmetal-300"
            value={inputValue}
          />
        </div>
      )}

      {selected && (
        <div className="absolute flex right-2 z-10 gap-[0.25rem] text-silver visible">
          {!isConfirmingDelete && (
            <button className="p-1" onMouseDown={editButtonClickHandler}>
              {isUpdating && (
                <AiOutlineLoading3Quarters className="inline animate-spin" />
              )}
              {!isUpdating && (!isEditing ? <AiFillEdit /> : <FiCheck />)}
            </button>
          )}

          {isConfirmingDelete && (
            <button className="p-1" onClick={proceedDeleteHandler}>
              {isUpdating ? (
                <AiOutlineLoading3Quarters className="inline animate-spin" />
              ) : <FiCheck />}
            </button>
          )}

          <button className="p-1" onClick={deleteButtonClickHandler}>
            {isConfirmingDelete ? <RxCross1 /> : <BsFillTrashFill />}
          </button>
        </div>
      )}
    </Fragment>
  );

  if (isEditing || selected) {
    return <div className={linkClassName}>{content}</div>;
  } else {
    return (
      <Link
        reloadDocument
        to={props.href}
        onClick={!selected ? clickHandler : () => {}}
        className={linkClassName}
      >
        {content}
      </Link>
    );
  }
};

export default SidebarLink;
