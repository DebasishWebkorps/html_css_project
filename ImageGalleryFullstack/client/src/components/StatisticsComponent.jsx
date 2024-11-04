import { Bar } from "react-chartjs-2"


import {
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    CategoryScale, // Include if you're using categorical data on the x-axis
} from 'chart.js';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setData } from "../store/dataSlice";
import { hideLoading, showLoading } from "../store/functionalitySlice";
import { UserStats } from "./userStats";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, CategoryScale, BarElement, Title);






export const StatisticComponent = () => {

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.functionality.isLoading)

    const getStatistics = async () => {
        const userToken = localStorage.getItem('userToken')
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}auth/statistics`, {
                headers: {
                    'userToken': userToken
                }
            })


            dispatch(setData(response.data))

        } catch (error) {
            console.log(error.message)
            // localStorage.removeItem('userToken')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        dispatch(showLoading())
        getStatistics()
    }, [])


    const statisticsData = useSelector(state => state.data.currentData)

    const labels = statisticsData.map(element => element.email)
    const data = statisticsData.map(element => element.totalPosts)

    const barData = {
        labels,
        datasets: [
            {
                label: 'Total Posts',
                data,
                fill: false,
                backgroundColor: 'rgba(30,58,138,0.8)',
                borderColor: 'rgba(30, 58, 138, 0.9)',
                borderWidth: 1,
                tension: 0.1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (

        <div className="p-2">
            {isLoading ? (
                <h1>Loading..............</h1>
            ) : (
                <div className="font-mono">
                    <div className="w-full bg-blue-900 text-blue-300 py-3 text-center mb-4 rounded-full">
                        <h1>Total Posts</h1>
                    </div>

                    <div className="w-3/4">
                        <Bar data={barData} options={options} />
                    </div>

                    <div className="w-full bg-blue-900 text-blue-300 py-3 text-center mt-10 mb-4 rounded-full">
                        <h1>User's Stats</h1>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-between">

                        {
                            statisticsData.map(data =>
                                <UserStats key={data._id} data={data} />
                            )
                        }

                    </div>

                </div>
            )}
        </div>
    )
}