import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        chatBox: {isFetching: false,},
        sidebarLink: {isFetching: false,}
    },
    reducers: {
        toggleChatBoxFetch(state) {
            state.chatBox.isFetching = !state.chatBox.isFetching;
        },

        toggleSidebarLinkFetch(state) {
            state.sidebarLink.isFetching = !state.sidebarLink.isFetching;
        }
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
