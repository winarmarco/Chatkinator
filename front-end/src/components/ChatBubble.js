import { AiOutlineUser, AiFillRobot } from "react-icons/ai";


const ChatBubble = (props) => {
    const {sentBy, message} = props
    const wrapperClass = (sentBy === "bot") ? "flex flex-row" : "flex flex-row-reverse";
    const avatarClass = "w-12 h-12 text-white flex items-center justify-center rounded-md ".concat((sentBy === "user") ? "bg-cyan-400" : "bg-beer");
    return (
        <div>
            <div className={wrapperClass}>
                <div className={avatarClass} style={{
                    "minWidth": "3rem",
                    "minHeight": "3rem",
                }}>
                    {(sentBy === 'user') ? <AiOutlineUser /> : <AiFillRobot />}
                </div>
                <div className="relative bg-crayola text-sand flex mx-5 p-5 rounded-lg max-w-[60%] lg:max-w-[500px]">
                    <p className="whitespace-pre-wrap">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
