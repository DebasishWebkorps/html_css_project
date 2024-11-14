import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateCart } from "../store/userSlice"

export const SingleProductComponent = () => {
    const [product, setProduct] = useState(null)

    const { productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const email = useSelector(state => state.user.email)
    const role = useSelector(state => state.user.role)

    const getProduct = async () => {
        const userToken = localStorage.getItem('userToken')

        try {
            // const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/${productId}`, {
                headers: {
                    userToken: userToken
                }
            })
            setProduct(response.data[0])
        } catch (error) {
            toast.error(error.message)
            navigate('/')
        }
    }

    const addToCartHandler = async () => {
        try {
            if (!email) {
                return navigate('/login')
            }
            const userToken = localStorage.getItem('userToken')

            if (!userToken) throw new Error

            const response = await axios.post(`http://localhost:3000/product/addtocart`, {
                productId: productId,
                type: 'increase'
            },
                {
                    headers: {
                        userToken: userToken
                    },
                }
            )
            toast.success(response.data.message)
            // dispatch(updateCart({ type: 'increase', productId }))
            navigate('/cart')

        } catch (error) {
            toast.error(error.message)
        }
    }

    const buyNowHandler = async () => {
        try {
            if (!email) {
                return navigate('/login')
            }
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

    if (!product) {
        return (
            <div className="text-center py-4">The Product May be removed...Go to<Link className=" underline cursor-pointer text-blue-600"> Home </Link> for browse other product</div>
        )
    }


    return (
        <div className="w-full sm:w-4/5 mx-auto p-2 grid grid-cols-3 gap-3 bg-white my-2">
            <div className="w-full h-max overflow-hidden sticky top-10 p-2">
                <img className="object-cover p-3 hover:scale-110 overflow-hidden" src={product?.images[0]} alt="" />
                {/* <img className="object-cover p-3 hover:scale-110 overflow-hidden" src={product?.image} alt="" /> */}
                {role === 'user' && <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    <button
                        onClick={addToCartHandler}
                        className="bg-yellow-400 rounded-md py-2 cursor-pointer active:scale-95">Add to cart</button>
                    <button
                        onClick={buyNowHandler}
                        className="bg-orange-400 rounded-md py-2 cursor-pointer active:scale-95">Buy Now</button>
                </div>}
            </div>
            <div className="col-span-2 p-2 flex flex-col gap-4">
                <h4 className="font-sans font-semibold">{product?.name}</h4>
                {/* <h4 className="font-sans font-semibold">{product?.title}</h4> */}
                {/* <p>Rating - <span className="font-semibold">{product?.rating.rate}</span></p> */}
                <p className="text-sm font-semibold">Rs. <span className="line-through font-normal text-xs">{product?.mrp}</span> <span className="text-sm">{product?.price}</span>/-</p>
                <p>Discount - <span className="text-lg font-semibold italic"> {Math.ceil(((product?.mrp - product?.price) / product?.mrp)*100)}%</span></p>
                <p className="font-mono text-sm text-justify">{product?.description}</p>
                {/* <p>Stock - {product?.rating.count}</p> */}
            </div>
        </div>
    )
}