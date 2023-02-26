import {createSlice} from "@reduxjs/toolkit";

const initState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: undefined
  },
  reducers: {
    signJWT(state, actions) {
      console.log(actions.payload.token);
      state.token = 'asdasdas'
      console.log(state.token)
    },
    logout(state, actions) {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
