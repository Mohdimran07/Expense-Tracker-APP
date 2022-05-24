import { createSlice } from "@reduxjs/toolkit";

const isLoggedIn = localStorage.getItem("Id") ? true : false
const initialAuthState = {
    isLoggedIn,
    token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
