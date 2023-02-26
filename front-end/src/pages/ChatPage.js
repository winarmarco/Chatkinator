import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";
import ChatRoom from "../components/ChatRoom";

const ChatPage = () => {
  const sidebarWidth = "18rem";
  return (
    <div className="flex flex-row h-screen">
      <Sidebar style={{width: sidebarWidth}} />
      <div
        className="bg-gunmetal-800 min-h-screen flex-1 relative h-screen overflow-hidden"
        
      >
        <div className="h-screen overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-scroll pt-12 pl-5 pr-10 scrollbar-thumb-gunmetal-750 scrollbar-thin scrollbar-track-gunmetal-700">
            <ChatRoom />
          </div>
          <Chatbox style={{left: sidebarWidth}} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
