import { createSlice } from "@reduxjs/toolkit";
import { DARK_MODE } from "../types";

// 
const initialThemeState = {
    isDarkMode : !!JSON.parse(localStorage.getItem("darkmode"))
};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
    darkModeReducer(state, action){
        state.isDarkMode = action.payload
    }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;