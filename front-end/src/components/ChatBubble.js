import { AiOutlineUser, AiFillRobot } from "react-icons/ai";


const ChatBubble = (props) => {
    const {type, message} = props
    const wrapperClass = (type === "user") ? "flex flex-row" : "flex flex-row-reverse";
    const avatarClass = "w-12 h-12 text-white flex items-center justify-center rounded-md ".concat((type === "user") ? "bg-cyan-400" : "bg-beer");
    return (
        <div>
            <div className={wrapperClass}>
                <div className={avatarClass} style={{
                    "min-width": "3rem",
                    "min-height": "3rem",
                }}>
                    {(type === 'user') ? <AiOutlineUser /> : <AiFillRobot />}
                </div>
                <div className="relative bg-crayola text-sand flex mx-5 p-5 rounded-lg max-w-[60%] lg:max-w-[500px]">
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
