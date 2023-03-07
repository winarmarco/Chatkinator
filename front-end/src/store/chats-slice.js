import { createSlice } from "@reduxjs/toolkit";

const initState = {
  chats: [],
  selectedChat: null,
}

const chatsSlice = createSlice({
    name: "chats",
    initialState: initState,
    reducers: {
        select(state, actions) {
          const selectedChatId = actions.payload.chatId;
          const selectedChat = state.chats.find(chat => {
            return (chat._id === selectedChatId)
          });
          state.selectedChat = selectedChat;
        },
        unselect(state, actions) {
          state.selectedChat = null;
        },
        createNewChat(state, actions) {
          const newChat = actions.payload.chat
          state.chats.push(newChat);
        },
        setChats(state, actions) {
          state.chats = actions.payload.chats;
        },
    },
});

export const chatsActions = chatsSlice.actions;

export default chatsSlice;