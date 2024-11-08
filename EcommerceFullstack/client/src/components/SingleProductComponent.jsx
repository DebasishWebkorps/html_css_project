import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export const SingleProductComponent = () => {
    const [product, setProduct] = useState(null)

    const { productId } = useParams()
    const navigate = useNavigate()

    const getProduct = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            setProduct(response.data)
        } catch (error) {
            toast.error(error.message)
            navigate('/')
        }
    }

    const addToCartHandler = async () => {
        try {
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`http://localhost:3000/product/addtocart`, {
                productId: productId
            },
                {
                    headers: {
                        userToken: userToken
                    },
                }
            )
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const buyNowHandler = async () => {
        try {
            await addToCartHandler()
            navigate('/cart')
        } catch (error) {
            toast.error(error.message)
            navigate('/')
        }
    }


    useEffect(() => {
        getProduct()
    }, [])


    return (
        <div className="w-4/5 mx-auto p-2 grid grid-cols-3 gap-3 bg-white my-2">
            <div className="w-full h-max overflow-hidden sticky top-0 p-2">
                <img className="object-cover p-3 hover:scale-110 overflow-hidden" src={product?.image} alt="" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                        onClick={addToCartHandler}
                        className="bg-yellow-400 rounded-md py-2 cursor-pointer active:scale-95">Add to cart</button>
                    <button
                        onClick={buyNowHandler}
                        className="bg-orange-400 rounded-md py-2 cursor-pointer active:scale-95">Buy Now</button>
                </div>
            </div>
            <div className="col-span-2 p-2 flex flex-col gap-4">
                <h4 className="font-sans font-semibold">{product?.title}</h4>
                <p>Rating - <span className="font-semibold">{product?.rating.rate}</span></p>
                <p className="text-xs font-semibold">Rs. <span className="text-sm">{product?.price}</span>/-</p>
                <p className="font-mono text-sm">{product?.description}</p>
                <p>Stock - {product?.rating.count}</p>
            </div>
        </div>
    )
}