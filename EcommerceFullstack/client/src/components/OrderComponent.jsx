import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const OrderComponent = () => {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {
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
        }
    }



    useEffect(() => {
        getOrders()
    }, [])

    if(orders.length === 0){
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
                            <div className=" bg-gray-100 p-3 border flex justify-between items-center">
                                <p className="bg-[#2874F0] text-white w-max p-2 rounded-sm text-sm sm:text-lg break-words">
                                    {order._id}
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
                                                <h2 className="text-ellipsis whitespace-nowrap overflow-hidden">{product.productName}</h2>
                                                <p>Rs.{product.productPrice}/-</p>
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