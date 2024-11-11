import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isReload: false,
    isNotification: {
        type: 'notification',
        message: 'Notification'
    },
    isMobileMenu: false
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
        },
        showMobileMenu: (state) => {
            state.isMobileMenu = true
        },
        hideMobileMenu: (state) => {
            state.isMobileMenu = false
        }
    }
})

export const { setNotification, showMobileMenu, hideMobileMenu } = functionalitySlice.actions;
export default functionalitySlice.reducer;