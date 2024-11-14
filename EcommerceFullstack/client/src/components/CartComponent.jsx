import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetCart, setCart, setUser, updateCart } from "../store/userSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const CartComponent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.user.cart)

    const totalPrice = cart?.reduce((acc, product) => acc += (+product?.product?.price * +product?.quantity), 0)

    const totalItem = cart?.reduce((acc, product) => acc += product?.quantity, 0)

    const getCart = async () => {

        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.get(`http://localhost:3000/product/cart`, {
                headers: {
                    userToken: userToken
                },
            })
            dispatch(setCart(response.data))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const increaseCart = async (productId) => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}product/addtocart`, {
                productId: productId,
                type: 'increase'
            }, {
                headers: {
                    userToken: userToken
                },
            })
            toast.success('increased quantity successfully')
            dispatch(updateCart({ type: 'increase', productId }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const decreaseCart = async (productId) => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}product/addtocart`, {
                productId: productId,
                type: 'decrease'
            }, {
                headers: {
                    userToken: userToken
                },
            })
            toast.success('decreased quantity successfully')
            dispatch(updateCart({ type: 'decrease', productId }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}product/removecart`, {
                productId: productId,
            }, {
                headers: {
                    userToken: userToken
                },
            })
            toast.success('item removed successfully')
            dispatch(updateCart({ type: 'remove', productId }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const placeOrderHandler = async () => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}product/order`, {}, {
                headers: {
                    userToken: userToken
                },
            })
            toast.success('Order placed successfully')
            dispatch(resetCart())
            navigate('/orders')
        } catch (error) {
            toast.error(error.message)
        }
    }



    useEffect(() => {
        getCart()
    }, [])


    return (
        <div className="w-full sm:w-4/5 mx-auto flex my-4 gap-4 flex-col md:flex-row">

            {cart?.length > 0 ?

                <div className="flex-1 bg-white p-1 sm:p-4">
                    <h3 className="capitalize border-b border-b-gray-400 px-3 text-sm sm:text-lg">My Cart <span>({cart.length})</span></h3>
                    {
                        cart?.map(item => {
                            return (

                                <div key={item.product?._id} className="flex gap-3 p-1 sm:p-3 border-b items-center" >
                                    <div className="p-1 overflow-hidden w-6 sm:w-8 lg:w-10">
                                        <img className="object-contain" src={`${item.product?.images[0]}`} alt="" />
                                    </div>
                                    <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-0 sm:gap-2 justify-center flex-1 font-robotothin text-sm">
                                        <h2 className="text-ellipsis whitespace-nowrap overflow-hidden">{item.product?.name}</h2>
                                        <p className="text-xs sm:text-sm whitespace-nowrap">Rs. {item.product?.price} /-</p>
                                        <p className="text-xs sm:text-sm whitespace-nowrap">qty - {item.quantity}</p>
                                        <div className="flex gap-1 justify-evenly flex-nowrap">
                                            <button onClick={() => {
                                                increaseCart(item.product._id)
                                            }} className="text-green-400 shadow-md px-1 sm:px-2 w-max h-max font-bold active:scale-95">+</button>
                                            <button
                                                onClick={() => {
                                                    decreaseCart(item.product._id)
                                                }} className="px-1 sm:px-2 shadow-md w-max text-yellow-500 font-extrabold h-max active:scale-95">-</button>
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item.product._id)
                                                }}
                                                className="shadow-md text-red-500 px-1 sm:px-2 w-max h-max active:scale-95 font-bold" >x</button>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


                : <h2 className="py-5 text-center"> Empty Cart</h2>
            }

            {
                cart.length > 0 &&

                <div className="bg-white h-max p-4 sticky top-14 flex flex-col gap-3">
                    <h3 className="text-gray-400 capitalize border-b border-b-gray-400">Price Details</h3>
                    <h2 className="flex justify-between gap-4 text-xs">Total Item : <span>{totalItem}</span></h2>
                    <h2 className="flex justify-between gap-4 text-xs">Total Amount : <span>Rs.{totalPrice.toFixed(2)}/-</span></h2>

                    <button onClick={placeOrderHandler} className="bg-[#fb641b] text-white py-2 rounded-sm active:scale-90">Place Order</button>
                </div>
            }

        </div >
    )
}