import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        chatBox: {isFetching: false,},
        sidebarLink: {isFetching: false,},
        sidebar: {show: false,}
    },
    reducers: {
        toggleChatBoxFetch(state) {
            state.chatBox.isFetching = !state.chatBox.isFetching;
        },

        toggleSidebarLinkFetch(state) {
            state.sidebarLink.isFetching = !state.sidebarLink.isFetching;
        },

        toggleSidebar(state) {
            state.sidebar.show = !state.sidebar.show;
        }
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
