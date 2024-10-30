import { configureStore } from "@reduxjs/toolkit";
import functionalityReducer from "./functionalitySlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
    reducer: {
        functionality: functionalityReducer,
        data: dataReducer
    }
})

