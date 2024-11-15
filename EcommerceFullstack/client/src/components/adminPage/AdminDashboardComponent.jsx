import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../../store/functionalitySlice"

export const AdminDashboardComponent = () => {

    const [dashboard, setDashboard] = useState(null)
    const dispatch = useDispatch()

    const getDashboard = async () => {
        try {
            dispatch(showLoading())
            const userToken = localStorage.getItem('userToken')
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}admin/dashboard`, {
                headers: {
                    userToken: userToken
                }
            })

            setDashboard(response.data)
        } catch (error) {
            console.log('some error occured')
        }finally{
            dispatch(hideLoading())
        }

    }


    useEffect(() => {
        getDashboard()
    }, [])

    if (!dashboard) return null

    return (
        <div className="w-full p-2">


            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6 bg-gray-50">


                <div className="bg-indigo-600 p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
                    <div className="text-lg font-semibold">Orders</div>
                    <div className="text-2xl font-bold">{dashboard.orders}</div>
                </div>

                <div className="bg-green-400 p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
                    <div className="text-lg font-semibold">Products</div>
                    <div className="text-2xl font-bold">{dashboard.products}</div>
                </div>


                <div className="bg-orange-500 p-6 rounded-lg shadow-lg text-white flex justify-between items-center">
                    <div className="text-lg font-semibold">Revenue</div>
                    <div className="text-2xl font-bold">{dashboard.revenue || 120}</div>
                </div>
            </div>


        </div>
    )
}