import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isReload: false,
    isMobileMenu: false,
    adminPage: 'dashboard',
    editProductId: ''
}

const functionalitySlice = createSlice({
    name: 'functionality',
    initialState,
    reducers: {
        showMobileMenu: (state) => {
            state.isMobileMenu = true
        },
        hideMobileMenu: (state) => {
            state.isMobileMenu = false
        },
        setAdminPage: (state, action) => {
            state.adminPage = action.payload
        },
        setEditProductId: (state, action) => {
            state.editProductId = action.payload
        }
    }
})

export const { showMobileMenu, hideMobileMenu, setAdminPage, setEditProductId } = functionalitySlice.actions;
export default functionalitySlice.reducer;