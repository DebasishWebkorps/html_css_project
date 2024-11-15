import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { hideLoading, showLoading } from "../store/functionalitySlice"

export const ProductComponent = () => {
    const [products, setProducts] = useState(null)

    const params = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getProducts = async () => {
        const userToken = localStorage.getItem('userToken')

        try {
            dispatch(showLoading())
            let response;
            if (params?.category === 'home') {
                response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/category/home`, {
                    headers: {
                        userToken: userToken
                    }
                })
            } else if (params?.category === 'electronics') {
                response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/category/electronics`, {
                    headers: {
                        userToken: userToken
                    }
                })
            } else if (params?.category === 'jewellery') {
                response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/category/jewellery`, {
                    headers: {
                        userToken: userToken
                    }
                })
            } else if (params?.category === 'womensfashion') {
                response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/category/womenfashion`, {
                    headers: {
                        userToken: userToken
                    }
                })
            } else if (params?.category === 'mensfashion') {
                response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/category/mensfashion`, {
                    headers: {
                        userToken: userToken
                    }
                })
            } else {
                response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product`, {
                    headers: {
                        userToken: userToken
                    }
                })

            }
            setProducts(response.data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getProducts()
    }, [params?.category])
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full sm:w-4/5 mx-auto my-4 p-2">
            {products?.map(product => {
                return (

                    <div key={product._id}
                        onClick={() => {
                            navigate(`/products/${product._id}`)
                        }}
                        className="shadow-md overflow-hidden bg-white rounded-md relative border flex flex-col justify-between">
                        {/* <p className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full z-10">{product.rating.rate}</p> */}
                        <div className="w-full h-3/4 overflow-hidden p-2">
                            <img className="object-contain w-full h-full hover:scale-110 cursor-pointer" src={product.images[0]} alt="" />
                            {/* <img className="object-contain w-full h-full hover:scale-110 cursor-pointer" src={product.image} alt="" /> */}
                        </div>

                        <div>
                            <p className="px-2 font-mono whitespace-nowrap">{product.name.split(' ').slice(0, 3).join(' ')}</p>
                            {/* <p className="px-2 font-mono whitespace-nowrap">{product.title.split(' ').slice(0, 3).join(' ')}</p> */}
                            <p className="text-right px-2 pb-2 text-yellow-600">Rs.{product.price}/-</p>
                        </div>
                    </div>

                )
            })}

        </div>
    )
}