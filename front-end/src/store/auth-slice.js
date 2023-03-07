import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    signJWT(state, actions) {
      state.token = actions.payload.token;
    },
    logout(state, actions) {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
