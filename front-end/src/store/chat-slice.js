import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: [],
    reducers: {
        pushChat(state, actions) {
            state.push(actions.payload);
        },
        clearChat(state) {
            return [];
        },
        setChat(state, actions) {
            return actions.payload.chat;
        } 
    },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
