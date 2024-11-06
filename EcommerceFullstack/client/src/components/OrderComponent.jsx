import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const OrderComponent = () => {
   
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
            toast.error(error.message)
            navigate('/login')
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])


    return (
        <div className="w-4/5 mx-auto p-3 bg-white flex flex-col gap-5">


            <div className="w-full border-2 p-3 hover:shadow-md hover:border-[#2874F0]">
                <div className=" bg-gray-100 p-3 border flex justify-between items-center">
                    <p className="bg-[#2874F0] text-white w-max p-2 rounded-sm">
                        OD1421245522541554425
                    </p>
                </div>
                <div className="p-3 flex flex-col gap-2">

                    <div className="flex gap-5 items-center justify-between">
                        <div>
                            <img width={40} src="https://images.pexels.com/photos/12078994/pexels-photo-12078994.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                        </div>
                        <h2>Title</h2>
                        <p>product details</p>
                        <p>21999 /-</p>
                    </div>


                </div>

                <div className=" p-3 border-t">
                    <h2 className="text-right">
                        Total Order - 1499/-
                    </h2>
                </div>


            </div>





        </div>

    )
}