import ChatBubble from "./ChatBubble";

const ChatRoom = () => {
    const datas = [{
        id: 0,
        type: 'user',
        message: "Hi, How is the weather?",
    }, {
        id: 1,
        type: 'bot',
        message: "Its currently 23º, expected to be 16º at night",
    },  {
        id: 2,
        type: 'user',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet eos at nisi, totam quis? Deleniti sapiente laborum maxime ipsa reprehenderit vel et iste. Deleniti eveniet magni facere omnis recusandae?",
    }, {
        id: 3,
        type: 'bot',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet eos at nisi, totam quis? Deleniti sapiente laborum maxime ipsa reprehenderit vel et iste. Deleniti eveniet magni facere omnis recusandae?",
    }, {
        id: 4,
        type: 'bot',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet eos at nisi, totam quis? Deleniti sapiente laborum maxime ipsa reprehenderit vel et iste. Deleniti eveniet magni facere omnis recusandae?",
    },
    {
        id: 5,
        type: 'bot',
        message: "hello",
    }];


    return <div className="flex flex-col gap-y-10 pb-32 max-w-7xl mx-auto">
        {
            datas.map((data) => {
                return <ChatBubble type={data.type} message={data.message}/>
            })
        }
    </div>;
}

export default ChatRoom;