import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const SearchComponent = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [filteredData, setFilteredData] = useState([])

    const getProducts = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/`)
        const filteredData = response.data.filter(data => data.title.toLowerCase().includes(params.query?.toLowerCase()))
        setFilteredData(filteredData)
    }

    useEffect(() => {
        getProducts()
    }, [params.query])

    if (filteredData.length === 0) {
        return (
            <h1 className="py-5 text-center">No Such Products...</h1>
        )
    }

    return (

        <>
            <h3 className="sm:pl-10 pt-5">Showing {filteredData.length} matched Products...</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full sm:w-4/5 mx-auto my-4 p-2">
                {filteredData?.map(product => {
                    return (

                        <div key={product.id}
                            onClick={() => {
                                navigate(`/products/${product.id}`)
                            }}
                            className="shadow-md overflow-hidden bg-white rounded-md relative border flex flex-col justify-between">
                            {/* <p className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full z-10">{product.rating.rate}</p> */}
                            <div className="w-full h-3/4 overflow-hidden p-2">
                                <img className="object-contain w-full h-full hover:scale-110 cursor-pointer" src={product.image} alt="" />
                            </div>

                            <div>
                                <p className="px-2 font-mono whitespace-nowrap">{product.title.split(' ').slice(0, 3).join(' ')}</p>
                                {/* <p className="px-2 font-mono whitespace-nowrap">{product.title}</p> */}
                                <p className="text-right px-2 pb-2 text-yellow-600">Rs.{product.price}/-</p>
                            </div>
                        </div>

                    )
                })}

            </div>
        </>
    )
}


