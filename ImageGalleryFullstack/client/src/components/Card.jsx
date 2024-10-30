import axios from "axios"
import { deleteImage } from '../utils/deleteImage'
import { useDispatch, useSelector } from "react-redux"
import { hideLoading, showLoading, toggleFullImagewithData, updateImageData } from "../store/functionalitySlice"
import { removeImage, setLike } from "../store/dataSlice"

export const Card = (props) => {

    const dispatch = useDispatch()

    const userData = useSelector(state => state.data.userData)



    const fullHandler = (image) => {
        dispatch(toggleFullImagewithData(image))
    }


    const deleteHandler = async (imgId) => {
        try {
            dispatch(showLoading())
            const response = await deleteImage(imgId)
            dispatch(removeImage(imgId))
        } catch (error) {
            console.log(error.message)
        } finally {
            dispatch(hideLoading())
        }

    }


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
            } else throw new Error(response.data.message)

        } catch (error) {
            console.log(error.message)
            // localStorage.removeItem('userToken')
        }finally{
            dispatch(hideLoading())
        }
    }



    return (
        <div className="w-full h-full relative overflow-hidden shadow-lg rounded-md">
            <img className="object-contain h-full cursor-pointer" loading="lazy" src={props.image.url} alt="" onClick={() => fullHandler(props.image)} />
            <div className="flex flex-col items-center absolute right-0 bottom-0 p-2">
                <button onClick={() => likeHandler(props.image._id)} className="active:scale-90  hover:scale-110">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={props.image.isLiked ? 'red' : 'white'}
                    >
                        <path stroke="black" strokeWidth={0.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>

                </button>
                <p style={{ textShadow: '1px 1px 2px black' }} className="text-[8px] drop-shadow-md text-white ">{props.image.likedCount}</p>
            </div>
            {userData.role === 'editor' ? '' :
                <button
                    onClick={() => { deleteHandler(props.image._id) }}
                    className="absolute right-0 top-0 text-white px-2 -translate-y-1 bg-red-600 active:scale-90">x</button>}
        </div>
    )
}