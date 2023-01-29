import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chat-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        chat: chatSlice.reducer,
        ui: uiSlice.reducer,
    },
});

export default store;
