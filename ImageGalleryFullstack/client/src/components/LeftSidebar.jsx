import axios from "axios"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addImage, resetData } from "../store/dataSlice"
import { hideLoading, resetFunctionality, setTypeOfData, showLoading } from "../store/functionalitySlice"

export const LeftSidebar = (props) => {

    const userData = useSelector(state => state.data.userData)

    const dataType = useSelector(state => state.functionality.typeOfData)


    const imageRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rightSideHandler = (name) => {
        dispatch(setTypeOfData(name))
    }

    const uploadHandler = async (event) => {
        event.preventDefault()
        dispatch(showLoading())

        if (!imageRef.current.files.length) {
            alert('select image first')
            dispatch(hideLoading())
            return
        }

        const formData = new FormData()

        formData.append('image', imageRef.current.files[0])

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}image/upload`, formData, {
                headers: {
                    'userToken': localStorage.getItem('userToken')
                }
            })

            const uploadedImage = {
                likedCount: 0,
                isLiked: false,
                ...response.data.img
            }
            dispatch(addImage(uploadedImage))
            alert(response.data.message)

        } catch (error) {
            alert('some error occured')
        } finally {
            dispatch(hideLoading())
        }



    }

    const logoutHandler = () => {
        localStorage.removeItem('userToken')
        dispatch(resetFunctionality())
        dispatch(resetData())
        navigate('/login')
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col justify-center items-center mt-7 text-white py-3 border-b-2 border-b-red-500">
                <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex justify-center items-center shadow-sm shadow-yellow-200">
                    <img className="object-cover" src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" />
                </div>
                <h3>{userData.email}</h3>
                <p className="text-sm font-light">{userData.role}</p>

            </div>

            <div className="py-3 w-full text-white border-b-2 border-b-red-500">
                <form action="#">
                    <input
                        ref={imageRef}
                        type="file" name="toupload" className="w-full p-3 cursor-pointer" />
                    <button
                        onClick={(event) => uploadHandler(event)}
                        className="text-white cursor-pointer bg-red-500 min-w-full py-1 rounded-xl active:scale-90">
                        Upload
                    </button>
                </form>
            </div>

            <div className="flex flex-col flex-1 my-3 justify-between items-center">
                <div className="flex flex-col w-full text-xs">
                    <button className={`text-white cursor-pointer py-2 ${dataType === 'all' ? ' bg-black min-w-full border-r-4 border-red-500' : ''}`} onClick={() => rightSideHandler('all')}>All Image</button>
                    <button className={`text-white cursor-pointer py-2 ${dataType === 'myImage' ? ' bg-black min-w-full border-r-4 border-red-500' : ''}`} onClick={() => rightSideHandler('myImage')}>My Image</button>
                    <button className={`text-white cursor-pointer py-2 ${dataType === 'likedImage' ? ' bg-black min-w-full border-r-4 border-red-500' : ''}`} onClick={() => rightSideHandler('likedImage')}>Liked Image</button>
                    {userData.role === 'admin' &&
                        <button className={`text-white cursor-pointer py-2 ${dataType === 'statistics' ? ' bg-black min-w-full border-r-4 border-red-500' : ''}`} onClick={() => rightSideHandler('statistics')}>Statistics</button>
                    }
                </div>
                <button
                    onClick={logoutHandler}
                    className="text-white cursor-pointer bg-red-500 min-w-full py-1 rounded-xl active:scale-90">Logout</button>
            </div>
        </div>
    )
}
