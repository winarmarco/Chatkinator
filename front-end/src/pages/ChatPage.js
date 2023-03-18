import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";
import ChatRoom from "../components/ChatRoom";
import LoadingPage from "../pages/LoadingPage";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {chatActions} from "../store/chat-slice";
import {chatsActions} from "../store/chats-slice";
import {toast} from "react-hot-toast";
import {useState} from "react";
import Navbar from "../components/Navbar";
import Backdrop from "../components/Backdrop";

const ChatPage = () => {
  const sidebarWidth = "18rem";
  const params = useParams();
  const token = useSelector((state) => state.auth.token);
  const chatsState = useSelector((state) => state.chats);
  const chats = chatsState.chats;
  const selectedChat = chatsState.selectedChat;
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChat = async (chatId, token) => {
      try {
        const serverURL = process.env.REACT_APP_API_URL;

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(
          `${serverURL}/chat/${chatId || ""}`,
          options
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        if (chatId) {
          const chatData = data["messages"];
          dispatch(chatActions.setChat({chat: chatData}));
          dispatch(chatsActions.select({chatId: chatId}));
        } else {
          const chats = data["chats"];
          dispatch(chatsActions.setChats({chats: chats}));
        }
      } catch (err) {
        toast.error(err.message);
        navigate("/chat");
      }
      setIsFetching(false);
    };

    if (!selectedChat) dispatch(chatActions.clearChat());
    const chatId = params.chatId;
    if (!selectedChat && !chatId) dispatch(chatsActions.unselect());
    fetchChat(chatId, token);
  }, [dispatch, params, token, navigate, selectedChat]);

  if (isFetching) return <LoadingPage />

  return (
    <>
    <Backdrop />
    <div className="flex flex-row h-screen">
      <Sidebar style={{width: sidebarWidth}} chats={chats} selectedChat={selectedChat}/>
      <div className="bg-gunmetal-800 min-h-screen flex-1 relative h-screen overflow-hidden">
        <div className="h-screen overflow-hidden flex flex-col">
          <Navbar selectedChat={selectedChat} />
          <div className="flex-1 overflow-y-scroll pt-12 pl-5 pr-10 scrollbar-thumb-gunmetal-750 scrollbar-thin scrollbar-track-gunmetal-700">
            <ChatRoom />
          </div>
          <Chatbox style={{left: sidebarWidth}} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatPage;
