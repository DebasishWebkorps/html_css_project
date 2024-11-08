import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const OrderComponent = () => {

    const navigate = useNavigate()

    const [orders, setOrders] = useState(null)

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
            navigate('/login')
        }
    }



    useEffect(() => {
        getOrders()
    }, [])


    return (
        <div className="w-4/5 mx-auto p-3 bg-white flex flex-col gap-5 my-3">

            {
                orders?.map(order => {
                    return (

                        <div key={order._id} className="w-full border-2 p-3 hover:shadow-md hover:border-[#2874F0]">
                            <div className=" bg-gray-100 p-3 border flex justify-between items-center">
                                <p className="bg-[#2874F0] text-white w-max p-2 rounded-sm">
                                    {order._id}
                                </p>
                            </div>

                            {
                                order.products?.map(product => {
                                    return (

                                        <div key={product._id} className="p-3 flex flex-col gap-2">

                                            <div className="grid grid-cols-4 gap-5 items-center justify-between">
                                                <div>
                                                    <img width={40} src={`${product.productImage}`} alt="" />
                                                </div>
                                                <h2>{product.productName}</h2>
                                                <p>Rs.{product.productPrice}/-</p>
                                                <p>qty - {product.quantity}</p>
                                            </div>


                                        </div>


                                    )
                                })
                            }
                            <div className=" p-3 border-t">
                                <h2 className="text-right">
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