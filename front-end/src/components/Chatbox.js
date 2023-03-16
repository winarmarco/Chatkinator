import {AiOutlineSend} from "react-icons/ai";
import {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {fetchResponseAction} from "../store/chatActions";
import LoadingText from "./LoadingText";

const Chatbox = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.ui.chatBox.isFetching);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const chatId = selectedChat && selectedChat._id;
  const token = useSelector((state) => state.auth.token);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFetching) return;
    inputRef.current.focus();
  }, [isFetching]);

  const keyPressHandler = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitHandler(event);
      setPrompt("");
    }
  };

  const inputHandler = (event) => {
    const inputtedValue = event.target.value;

    if (
      inputtedValue[inputtedValue.length - 1] === "\n" &&
      inputtedValue.slice(0, inputtedValue.length - 1).length < 0
    ) {
      setPrompt("");
    }

    setPrompt(inputtedValue);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(fetchResponseAction(prompt, token, chatId));
  };

  const FormContent = (
    <form
      onSubmit={submitHandler}
      className="flex drop-shadow-2xl text-gray-800 max-w-7xl mx-auto bg-gunmetal-300 rounded-md"
    >
      <div className="flex w-full py-4 px-5 items-center justify-center">
        <TextareaAutosize
          onKeyPress={keyPressHandler}
          onInput={inputHandler}
          ref={inputRef}
          value={prompt}
          type="text"
          className="flex items-center text-sand resize-none h-6 w-full bg-transparent placeholder-silver focus:outline-none focus:border-none caret-white"
          placeholder="How is the weather?"
          rows="1"
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="w-16 h-16 text-slate-50 flex items-center justify-center"
        >
          <AiOutlineSend />
        </button>
      </div>
    </form>
  );

  return (
    <div className="bg-gunmetal-500 py-4 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.25)] px-5">
      {isFetching ? <LoadingText /> : FormContent}
    </div>
  );
};

export default Chatbox;
