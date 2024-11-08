import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: '',
    cart: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload
        },
        resetUser: (state) => {
            return {
                email: ''
            }
        }
    }
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;