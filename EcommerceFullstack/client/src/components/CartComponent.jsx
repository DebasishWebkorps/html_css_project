import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../store/userSlice"
import { useEffect } from "react"

export const CartComponent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const verifyToken = async () => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}auth/verifytoken`,
                {},
                {
                    headers: {
                        userToken: userToken
                    },
                }
            );
            dispatch(setUser(response.data.email))

        } catch (error) {
            console.log(error.message)
            // alert(error.response.data.message)
            navigate('/login')
            // toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])


    return (
        <div className="w-4/5 mx-auto flex my-4 gap-4">
            <div className="flex-1 bg-white p-4">
                <h3 className="capitalize border-b border-b-gray-400 px-3">My Cart <span>(5)</span></h3>

                <div className="flex gap-3 p-3 border-b items-center">
                    <div>
                        <img width={40} src="https://images.pexels.com/photos/12078994/pexels-photo-12078994.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                    </div>
                    <div>
                        <h2>Title</h2>
                        <p>product details</p>
                        <p>21999 /-</p>
                    </div>
                </div>

               

            </div>
            <div className="bg-white h-max p-4 sticky top-14 flex flex-col gap-3">
                <h3 className="text-gray-400 capitalize border-b border-b-gray-400">Price Details</h3>
                <h2 className="flex justify-between gap-2">Total Item : <span>12000</span></h2>
                <h2 className="flex justify-between gap-2">Total Amount : <span>12000</span></h2>

                <button className="bg-[#fb641b] text-white py-2 rounded-sm">Place Order</button>
            </div>
        </div>
    )
}