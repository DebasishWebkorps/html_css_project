import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../store/userSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const CartComponent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cart, setCart] = useState([])

    const totalPrice = cart?.reduce((acc, product) => acc += (+product.productPrice * +product.quantity), 0)

    const totalItem = cart?.reduce((acc, product) => acc += product.quantity, 0)

    const getCart = async () => {

        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.get(`http://localhost:3000/product/cart`, {
                headers: {
                    userToken: userToken
                },
            })
            setCart(response.data.cart)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const placeOrderHandler = async () => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`http://localhost:3000/product/order`, {}, {
                headers: {
                    userToken: userToken
                },
            })
            toast.success('Order placed successfully')
            navigate('/orders')
        } catch (error) {
            toast.error(error.message)
        }
    }


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
        // verifyToken()
        getCart()
    }, [])


    return (
        <div className="w-4/5 mx-auto flex my-4 gap-4">

            {cart.length > 0 ?

                <div className="flex-1 bg-white p-4">
                    <h3 className="capitalize border-b border-b-gray-400 px-3">My Cart <span>({cart.length})</span></h3>
                    {
                        cart.map(item => {
                            return (

                                < div key={item._id} className="flex gap-3 p-3 border-b items-center" >
                                    <div>
                                        <img width={40} src={`${item.productImage}`} alt="" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 justify-between flex-1">
                                        <h2 className="col-span-2">{item.productName}</h2>
                                        <p>Rs. {item.productPrice} /-</p>
                                        <p>qty - {item.quantity}</p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


                : <h2> Empty Cart</h2>
            }

            {
                cart.length > 0 &&

                <div className="bg-white h-max p-4 sticky top-14 flex flex-col gap-3">
                    <h3 className="text-gray-400 capitalize border-b border-b-gray-400">Price Details</h3>
                    <h2 className="flex justify-between gap-4 text-xs">Total Item : <span>{totalItem}</span></h2>
                    <h2 className="flex justify-between gap-4 text-xs">Total Amount : <span>Rs.{totalPrice}/-</span></h2>

                    <button onClick={placeOrderHandler} className="bg-[#fb641b] text-white py-2 rounded-sm">Place Order</button>
                </div>
            }

        </div >
    )
}