import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../store/functionalitySlice";

export const OrderComponent = () => {

    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()


    const getOrders = async () => {
        try {
            dispatch(showLoading())
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/order`, {
                headers: {
                    userToken: userToken
                },
            });

            setOrders(response.data)

        } catch (error) {
            toast.error(error.message)
        } finally{
            dispatch(hideLoading())
        }
    }



    useEffect(() => {
        getOrders()
    }, [])

    if (orders.length === 0) {
        return (
            <div className="text-center py-5">No orders...</div>
        )
    }


    return (
        <div className="w-full sm:w-4/5 mx-auto p-3 bg-white flex flex-col gap-5 my-3">

            {
                orders?.map(order => {
                    return (

                        <div key={order._id} className="w-full border-2 p-3 hover:shadow-md hover:border-[#2874F0] overflow-hidden">
                            <div className=" bg-gray-100 p-3 border flex flex-wrap justify-between items-center">
                                <p className="bg-[#2874F0] text-white w-max p-2 gap-2 rounded-sm text-xs sm:text-lg break-words">
                                    {order._id}
                                </p>

                                <p className={`${order.status === 'pending' ? 'bg-orange-400 text-white' : ''}
                                ${order.status === 'processed' ? 'bg-indigo-500 text-white' : ''}
                                ${order.status === 'shipped' ? 'bg-yellow-400 text-black' : ''}
                                ${order.status === 'completed' ? 'bg-green-600 text-white' : ''}
                                  text-xs sm:p-2 py-2 rounded-sm`}>
                                    {order.status}
                                </p>
                            </div>

                            {
                                order.products?.map(product => {
                                    return (

                                        <div key={product._id} className="p-3 flex flex-col gap-2">

                                            <div className="grid grid-cols-[auto,3fr,1fr,1fr] gap-5 items-center justify-between font-inter text-sm">
                                                <div>
                                                    <img width={40} src={`${product.productImage}`} alt="" />
                                                </div>
                                                <h2 className="text-ellipsis whitespace-nowrap overflow-hidden">{product.name}</h2>
                                                <p>Rs.{product.price}/-</p>
                                                <p className="whitespace-nowrap">qty - {product.quantity}</p>
                                            </div>


                                        </div>


                                    )
                                })
                            }
                            <div className=" p-3 border-t">
                                <h2 className="text-right font-robotothin">
                                    Total - {order.total}/-
                                </h2>
                            </div>

                        </div>


                    )
                })
            }


        </div>

    )
}