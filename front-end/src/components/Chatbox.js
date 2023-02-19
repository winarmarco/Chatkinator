import { AiOutlineLoading3Quarters, AiOutlineSend } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chat-slice";
import { uiActions } from "../store/ui-slice";
import { v4 as uuid } from "uuid";
import TextareaAutosize from "react-textarea-autosize";

const fetchApi = async (prompt) => {

    const data = {
        prompt: prompt,
    };

    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
    };

    try {
        const response = await fetch(
            "http://localhost:8080/text-completions",
            options
        );
        const data = await response.json();

        return data["response"];
    } catch (errors) {
        throw errors;
    }
};

const Chatbox = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector((state) => state.ui.isFetching);
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

    const submitHandler = async (event) => {
        event.preventDefault();

        const userMessageId = uuid();

        dispatch(
            chatActions.pushChat({
                id: userMessageId,
                type: "user",
                message: prompt,
            })
        );
        dispatch(uiActions.toggleFetch());

        try {
            const botResponse = await fetchApi(prompt);
            const botResponseId = uuid();

            dispatch(
                chatActions.pushChat({
                    id: botResponseId,
                    type: "bot",
                    message: botResponse.trim(),
                })
            );

            dispatch(uiActions.toggleFetch());
        } catch (errors) {
            console.log("Something went wrong please try again later");
        }
    };

    const LoadingContent = (
        <div className="flex items-center justify-center w-full h-16 text-slate-50">
            <span className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters className="inline animate-spin" />
                <p>Loading...</p>
            </span>
        </div>
    );

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
        <div className="bg-gunmetal-500 fixed bottom-0 left-0 right-0 py-4 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.25)] px-5">
            {isFetching ? LoadingContent : FormContent}
        </div>
    );
};

export default Chatbox;
