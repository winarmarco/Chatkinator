import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const Chatbox = () => {
    const [prompt, setPrompt] = useState("");

    const keyPressHandler = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
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

        setPrompt(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        console.log("submitted");
    };
    return (
        <div className="bg-gunmetal-500 fixed bottom-0 left-0 right-0 py-4 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.25)] px-5">
            <form
                onSubmit={submitHandler}
                className="flex drop-shadow-2xl text-gray-800 max-w-7xl mx-auto bg-gunmetal-300 rounded-md"
            >
                <div className="flex w-full py-4 px-5 items-center justify-center">
                    <TextareaAutosize
                        onKeyPress={keyPressHandler}
                        onInput={inputHandler}
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
        </div>
    );
};

export default Chatbox;
