import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentData: [],
    userData: {}

}


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.currentData = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setLike: (state, action) => {
            const imgIndex = state.currentData.findIndex(image => image._id === action.payload)
            if (imgIndex !== -1) {
                const isLiked = state.currentData[imgIndex].isLiked
                let likedCount;

                if (isLiked) {
                    likedCount = state.currentData[imgIndex].likedCount - 1
                } else {
                    likedCount = state.currentData[imgIndex].likedCount + 1
                }

                state.currentData[imgIndex] = {
                    ...state.currentData[imgIndex],
                    isLiked: !isLiked,
                    likedCount
                }
            }
        },
        removeImage: (state, action) => {
            const updatedData = state.currentData.filter(image => image._id !== action.payload)
            state.currentData = updatedData
        },
        addImage: (state, action) => {
            state.currentData.push(action.payload)
        },
        resetData: (state) => {
            return {
                currentData: [],
                userData: {}

            }
        }
    }

})

export const { setData, setUserData, setLike, removeImage, addImage, resetData } = dataSlice.actions

export default dataSlice.reducer;