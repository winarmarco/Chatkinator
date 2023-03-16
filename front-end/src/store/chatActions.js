import {fetchBotResponse, updateTitle} from "../util/chat";
import {chatActions} from "./chat-slice";
import {uiActions} from "./ui-slice";
import {v4 as uuid} from "uuid";
import {chatsActions} from "./chats-slice";
import { toast } from "react-hot-toast";

export const fetchResponseAction = (prompt, token, chatId) => {
  return async (dispatch) => {
    const userMessageId = uuid();

    dispatch(uiActions.toggleChatBoxFetch());
    dispatch(
      chatActions.pushChat({
        _id: userMessageId,
        sentBy: "user",
        message: prompt,
      })
    );

    try {
      const response = await fetchBotResponse(prompt, token, chatId);

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
      // toast.error(errors.message);
      toast.error("Something went wrong! Please try again later.")
    }
    dispatch(uiActions.toggleChatBoxFetch());
  };
};


export const updateChatTitleAction = (title, token, chatId) => {
  return async (dispatch) => {
    
    dispatch(chatsActions.updateChatTitle({
      title: title,
    }))

    dispatch(uiActions.toggleSidebarLinkFetch());
    
    try {
      const response = await updateTitle(title, token, chatId);
      return response;
    } catch (error) {
      toast.error("Something went wrong! Please try again later.")
    }
    dispatch(uiActions.toggleSidebarLinkFetch());
  }
}