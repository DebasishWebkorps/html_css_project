import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showFullImage: false,
    fullImageData: {},
    typeOfData: 'all',
    isLoading: false
}


export const functionalitySlice = createSlice({
    name: 'functionality',
    initialState,
    reducers: {
        toggleFullImagewithData: (state, action) => {
            state.fullImageData = action.payload
            state.showFullImage = !state.showFullImage
        },
        toggleFullImage: (state) => {
            state.showFullImage = !state.showFullImage
        },
        updateImageData: (state) => {
            const likeStatus = state.fullImageData.isLiked
            state.fullImageData.isLiked = !state.fullImageData.isLiked
            if (likeStatus) {
                state.fullImageData.likedCount = state.fullImageData.likedCount - 1
            } else {
                state.fullImageData.likedCount = state.fullImageData.likedCount + 1
            }
        },
        setTypeOfData: (state, action) => {
            state.typeOfData = action.payload
        },
        showLoading: (state) => {
            state.isLoading = true
        },
        hideLoading: (state) => {
            state.isLoading = false
        },
        resetFunctionality: (state) => {
            return {
                showFullImage: false,
                fullImageData: {},
                typeOfData: 'all',
                isLoading: false
            }
        }

    }

})

export const { toggleFullImagewithData, toggleFullImage, updateImageData, setTypeOfData, showLoading, hideLoading, resetFunctionality } = functionalitySlice.actions;
export default functionalitySlice.reducer;