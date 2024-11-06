import { useEffect, useState } from "react"

export const SingleProductComponent = () => {
    const [product, setProduct] = useState(null)

    const getProduct = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/1')
            const data = await response.json()
            setProduct(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    console.log(product)

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <div className="w-4/5 mx-auto p-2 grid grid-cols-3 gap-3 bg-white my-2">
            <div className="w-full h-max overflow-hidden sticky top-0 p-2">
                <img className="object-cover p-3 hover:scale-110 overflow-hidden" src={product?.image} alt="" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="bg-yellow-400 rounded-md py-2 cursor-pointer active:scale-95">Add to cart</button>
                    <button className="bg-orange-400 rounded-md py-2 cursor-pointer active:scale-95">Buy Now</button>
                </div>
            </div>
            <div className="col-span-2 p-2 flex flex-col gap-4">
                <h4 className="font-sans font-semibold">{product?.title}</h4>
                <p>Rating - <span className="font-semibold">{product?.rating.rate}</span></p>
                <p>Rs.{product?.price}/-</p>
                <p className="font-mono text-sm">{product?.description}</p>
                <p>Stock - {product?.rating.count}</p>
            </div>
        </div>
    )
}