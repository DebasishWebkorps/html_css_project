import { configureStore } from "@reduxjs/toolkit";
import functionalityReducer from './functionalitySlice'
import userReducer from './userSlice'


export const store = configureStore({
    reducer: {
        functionality: functionalityReducer,
        user: userReducer
    }
})