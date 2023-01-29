import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: [],
    reducers: {
        pushChat(state, actions) {
            state.push(actions.payload);
        },
    },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
