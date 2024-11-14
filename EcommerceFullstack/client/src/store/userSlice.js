import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: '',
    role: '',
    cart: [],
    cartItem: 0
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.role = action.payload.role
            state.cart = [...action.payload.cart]
            state.cartItem = action.payload.cart.length
        },
        resetUser: (state) => {
            return {
                email: '',
                role: '',
                cart: [],
                cartItem: 0
            }
        },
        updateCart: (state, action) => {
            const { productId } = action.payload

            const existIndex = state.cart.findIndex(item => item.product._id === productId)

            if (existIndex >= 0) {

                if (action.payload.type === 'increase') {
                    state.cart[existIndex].quantity = state.cart[existIndex].quantity + 1
                }

                if (action.payload.type === 'decrease') {
                    if (state.cart[existIndex].quantity - 1 <= 0) {
                        // state.cart = state.cart.filter((item, idx) => idx !== existIndex)
                        state.cart.splice(existIndex, 1)
                    } else {
                        state.cart[existIndex].quantity = state.cart[existIndex].quantity - 1
                    }
                }

                if (action.payload.type === 'remove') {
                    state.cart.splice(existIndex, 1)
                }

            } 

        },
        resetCart: (state) => {
            state.cart = []
        },
        setCart: (state, action) => {
            state.cart = action.payload
        }
    }
})

export const { setUser, resetUser, updateCart, resetCart, setCart } = userSlice.actions;
export default userSlice.reducer;