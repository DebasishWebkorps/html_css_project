import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"

export const ProductComponent = () => {
    const [products, setProducts] = useState(null)
    console.log(products)

    const getProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/category/electronics')
            const data = await response.json()
            setProducts(data)
           
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className="grid grid-cols-5 gap-2">
            {products?.map(product => {
                return (

                    <div key={product.id} className="shadow-md overflow-hidden bg-white rounded-md relative">
                        <p className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full z-10">{product.rating.rate}</p>
                        <div className="w-full h-4/5 overflow-hidden p-2">
                            <img className="object-contain w-full h-full hover:scale-110 cursor-pointer" src={product.image} alt="" />
                        </div>
                        <p className="px-2 font-mono text-ellipsis whitespace-nowrap">{product.title}</p>
                        <p className="text-right px-2 text-yellow-600">Rs.{product.price}/-</p>
                    </div>

                )
            })}

        </div>
    )
}