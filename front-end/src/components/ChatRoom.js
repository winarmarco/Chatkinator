import ChatBubble from "./ChatBubble";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ChatRoom = () => {
    const messageEndRef = useRef();
    const chats = useSelector((store) => store.chat);

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        setTimeout(scrollToBottom, 0);
    }, [chats]);

    return (
        <div className="flex flex-col gap-y-10 max-w-7xl mx-auto">
            {chats.map((data) => {
                return (
                    <ChatBubble
                        key={data._id}
                        sentBy={data.sentBy}
                        message={data.message}
                    />
                );
            })}
            <div ref={messageEndRef}></div>
        </div>
    );
};

export default ChatRoom;
