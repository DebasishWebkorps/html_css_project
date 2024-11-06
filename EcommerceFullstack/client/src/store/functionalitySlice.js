import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isReload: false,
    isNotification: {
        type: 'notification',
        message: 'Notification'
    }
}

const functionalitySlice = createSlice({
    name: 'functionality',
    initialState,
    reducers: {
        setNotification: (state, payload) => {
            state.isNotification = {
                type: payload.data.type,
                message: payload.data.message
            }
        }
    }
})

export const { setNotification } = functionalitySlice.actions;
export default functionalitySlice.reducer;