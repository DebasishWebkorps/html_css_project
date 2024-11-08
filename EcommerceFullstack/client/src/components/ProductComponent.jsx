import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ProductComponent = () => {
    const [products, setProducts] = useState(null)

    const params = useParams()

    const navigate = useNavigate()

    const getProducts = async () => {
        try {
            let response;
            if (params?.category === 'electronics') {
                response = await axios.get('https://fakestoreapi.com/products/category/electronics')
            } else if (params?.category === 'jewelery') {
                response = await axios.get('https://fakestoreapi.com/products/category/jewelery')
            } else {
                response = await axios.get(`https://fakestoreapi.com/products`)
            }
            setProducts(response.data)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [params])
    return (
        <div className="grid grid-cols-5 gap-2 w-4/5 mx-auto my-4">
            {products?.map(product => {
                return (

                    <div key={product.id}
                        onClick={() => {
                            navigate(`/products/${product.id}`)
                        }}
                        className="shadow-md overflow-hidden bg-white rounded-md relative">
                        {/* <p className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full z-10">{product.rating.rate}</p> */}
                        <div className="w-full h-4/5 overflow-hidden p-2">
                            <img className="object-contain w-full h-full hover:scale-110 cursor-pointer" src={product.image} alt="" />
                        </div>
                        <p className="px-2 font-mono whitespace-nowrap">{product.title.split(' ').slice(0, 3).join(' ')}</p>
                        {/* <p className="px-2 font-mono whitespace-nowrap">{product.title}</p> */}
                        <p className="text-right px-2 text-yellow-600">Rs.{product.price}/-</p>
                    </div>

                )
            })}

        </div>
    )
}