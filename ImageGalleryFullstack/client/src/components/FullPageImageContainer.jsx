import axios from "axios"
import { hideLoading, showLoading, toggleFullImage, updateImageData } from "../store/functionalitySlice"
import { useDispatch, useSelector } from "react-redux"
import { setLike } from "../store/dataSlice"

export const FullPageImageContainer = () => {

    const dispatch = useDispatch()

    const fullImageData = useSelector(state => state.functionality.fullImageData)


    const fullHandler = () => {
        dispatch(toggleFullImage())
    }

    // const deleteHandler = async () => {
    //     const response = await deleteImage(imgId)
    // }

    const likeHandler = async (imgId) => {
        const userToken = localStorage.getItem('userToken')
        dispatch(showLoading())

        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}image/like`, {
                imgId
            }, {
                headers: {
                    'userToken': userToken
                }
            })

            if (response.data.message === 'process successfull') {
                dispatch(setLike(imgId))
                dispatch(updateImageData())
            } else throw new Error(response.data.message)

        } catch (error) {
            console.log(error.message)
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <div className="fixed flex justify-center items-center w-full h-full z-20 top-0 left-0 bg-gray-400 bg-opacity-80"
            onClick={fullHandler}>
            <div
                onClick={(event) => event.stopPropagation()}
                className="max-h-[90vh] max-w-[90vw] bg-red-800 relative ">

                <img className="max-h-[90vh] max-w-[90vw]" src={fullImageData.url} alt="" />
                <div className="flex flex-col items-center absolute right-0 bottom-0 p-2">
                    <button
                        onClick={() => likeHandler(fullImageData._id)}
                        className="active:scale-90 hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={fullImageData.isLiked ? 'red' : 'white'}


                        >
                            <path stroke="black" strokeWidth={0.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>

                    </button>
                    <p className="text-[8px] drop-shadow-md text-white">{fullImageData.likedCount}</p>

                </div>
                {/* {userData.role === 'editor' ? '' : <button onClick={deleteHandler} className="absolute right-0 top-0 text-white px-2 -translate-y-1 bg-red-600 active:scale-90">

                  Delete

                </button>} */}


                <button onClick={fullHandler} className="absolute top-0 right-0 bg-red-800 translate-x-full text-white p-1 rounded-r-md hover:scale-x-125">x</button>
            </div>
        </div >
    )
}