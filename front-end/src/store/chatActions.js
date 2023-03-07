import {fetchResponse} from "../util/chat";
import {chatActions} from "./chat-slice";
import {uiActions} from "./ui-slice";
import {v4 as uuid} from "uuid";
import {chatsActions} from "./chats-slice";

export const fetchResponseAction = (prompt, token, chatId) => {
  return async (dispatch) => {
    const userMessageId = uuid();

    dispatch(uiActions.toggleFetch());
    dispatch(
      chatActions.pushChat({
        _id: userMessageId,
        sentBy: "user",
        message: prompt,
      })
    );

    try {
      const response = await fetchResponse(prompt, token, chatId);
      const botResponse = response["response"];

      dispatch(
        chatActions.pushChat({
          _id: botResponse._id,
          sentBy: "bot",
          message: botResponse["message"],
        })
      );

      if (!chatId) {
        const newChatId = response._id;
        const newChatTitle = response.title;
        dispatch(
          chatsActions.createNewChat({
            chat: {_id: newChatId, title: newChatTitle},
          })
        );
        dispatch(chatsActions.select({
          chatId: newChatId
        }))
      }
    } catch (errors) {
      console.log("Something went wrong please try again later!");
    }
    dispatch(uiActions.toggleFetch());
  };
};
