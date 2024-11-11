import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const HomeProduct = () => {

    const [jewellery, setJewellery] = useState([])
    const [electronics, setElectronics] = useState([])

    const navigate = useNavigate()

    const getProds = async () => {
        try {
            const jewellery = await axios.get('https://fakestoreapi.com/products/category/jewelery?limit=4')
            const electronics = await axios.get('https://fakestoreapi.com/products/category/electronics?limit=4')
            setJewellery(jewellery.data)
            setElectronics(electronics.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getProds()
    }, [])
    return (
        <div className="w-11/12 flex flex-col gap-3 my-2 mx-auto">


            {
                jewellery[0] &&

                <div className="flex flex-col bg-white">
                    <div className="flex w-full justify-between items-center py-2 px-6 border-b">
                        <h2 className="capitalize">{jewellery[0]?.category}</h2>
                        <button
                            onClick={() => navigate(`/${jewellery[0]?.category}`)}
                            className="w-max px-8 bg-blue-600 text-white active:scale-95">See All</button>
                    </div>
                    <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {
                            jewellery?.map(prod => {
                                return (
                                    <div key={prod.id} className=" w-4/5 mx-auto h-60 overflow-hidden shadow-md p-3 rounded-sm">
                                        <img
                                            onClick={() => {
                                                navigate(`/products/${prod.id}`)
                                            }}
                                            className="object-contain h-full w-full cursor-pointer" src={prod.image} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

            {
                electronics[0] &&
                <div className="flex flex-col bg-white">
                    <div className="flex w-full justify-between items-center py-2 px-6 border-b">
                        <h2 className="capitalize text-xs sm:text-lg">{electronics[0]?.category}</h2>
                        <button
                            onClick={() => navigate(`/${electronics[0]?.category}`)}
                            className="w-max p-2 sm:px-8 text-xs sm:text-lg bg-blue-600 text-white active:scale-95">See All</button>
                    </div>
                    <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {
                            electronics?.map(prod => {
                                return (
                                    <div key={prod.id} className=" w-4/5 mx-auto h-60 overflow-hidden shadow-md p-3 rounded-sm">
                                        <img
                                            onClick={() => {
                                                navigate(`/products/${prod.id}`)
                                            }}
                                            className="object-contain h-full w-full cursor-pointer" src={prod.image} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

            <div className="flex justify-center">
                <button onClick={() => navigate('/products')} className="bg-blue-600 text-white px-8 py-3 rounded-md active:scale-90">All Products</button>
            </div>

        </div>
    )
}