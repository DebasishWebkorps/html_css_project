import { useEffect, useState } from "react"
import { LeftSidebar } from "../LeftSidebar"
import { RightSidebar } from "../RightSidebar"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { FullPageImageContainer } from "../FullPageImageContainer"
import { setUserData } from "../../store/dataSlice"
import { Loader } from "../Loader"

export const HomePage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const isFullImage = useSelector(state => state.functionality.showFullImage)

    const isLoading = useSelector(state => state.functionality.isLoading)



    const [page, setPage] = useState('dashboard')

    const [showPage, setShowPage] = useState(false)

    const setPageHandler = (name) => {
        setPage(name)
    }



    const verifyToken = async () => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) navigate('/login')
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}auth/isValidToken`, {
                headers: {
                    'userToken': userToken
                }
            })

            dispatch(setUserData(response.data.user))
            setShowPage(true)

        } catch (error) {
            navigate('/login')
        }
    }

    useEffect(() => {

        verifyToken()
    }, [])


    return (
        <div className="w-full flex">

            {/* left sidebar */}
            {showPage &&
                <div className="w-40 border-r-2 bg-gray-800 h-[100vh] sticky top-0">
                    <LeftSidebar setPageHandler={setPageHandler} />
                </div>
            }

            {/* right sidebar */}
            {showPage &&
                <div className="flex-1 m-2 overflow-y-auto">
                    <RightSidebar page={page} />
                </div>
            }

            {isFullImage && <FullPageImageContainer />}

            {isLoading && <Loader />}

        </div>
    )
}