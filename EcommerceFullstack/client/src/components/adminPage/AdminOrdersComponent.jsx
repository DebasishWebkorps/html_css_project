import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { hideLoading, showLoading } from "../../store/functionalitySlice"

export const AdminOrdersComponent = () => {

    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()

    const getOrders = async () => {
        try {
            dispatch(showLoading())
            const userToken = localStorage.getItem('userToken')
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}admin/orders`, {
                headers: {
                    userToken: userToken
                }
            })

            setOrders(response.data)
        } catch (error) {
            console.log('some error occured')
        }finally{
            dispatch(hideLoading())
        }

    }

    const statusChangeHandler = async (event, orderId) => {
        try {
            dispatch(showLoading())
            const status = event.target.value
            console.log(status, orderId)
            const userToken = localStorage.getItem('userToken')
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}admin/status`, {}, {
                headers: {
                    userToken: userToken,
                    orderId: orderId.toString(),
                    status
                }
            })
            toast.success('status updated')
            getOrders()
        } catch (error) {
            toast.error('some error occured', error.message)
        }finally{
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    if (orders.length === 0) {
        return <h2 className=" bg-white text-center py-5">You haven't get any Orders yet...</h2>
    }


    return (

        <div className="w-full mx-auto p-3 bg-white flex flex-col gap-5 my-3">

            {
                orders?.map(order => {
                    return (

                        <div key={order._id} className="w-full border-2 p-3 hover:shadow-md hover:border-[#2874F0] overflow-hidden">
                            <div className=" bg-gray-100 p-3 border flex flex-wrap justify-between items-center">
                                <p className="bg-[#2874F0] text-white w-max p-2 gap-2 rounded-sm text-xs sm:text-lg break-words">
                                    {order._id}
                                </p>

                                <select onChange={(event) => statusChangeHandler(event, order._id)} className="py-2 px-2 cursor-pointer focus:outline-none focus:ring-2 rounded-md" name="" id=""
                                    value={order.status}>
                                    <option value="pending">Pending</option>
                                    <option value="processed">Processed</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="completed">Completed</option>
                                </select>
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