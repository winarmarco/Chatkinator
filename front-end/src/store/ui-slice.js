import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isFetching: false,
    },
    reducers: {
        toggleFetch(state) {
            state.isFetching = !state.isFetching;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
