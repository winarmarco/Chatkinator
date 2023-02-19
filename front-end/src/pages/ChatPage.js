import Chatbox from "../components/Chatbox";
import ChatRoom from "../components/ChatRoom";

const ChatPage = () => {
    return (
        <div className="bg-gunmetal-800 pt-12 px-5 min-h-screen">
            <ChatRoom />
            <Chatbox />
        </div>
    );
};

export default ChatPage;
