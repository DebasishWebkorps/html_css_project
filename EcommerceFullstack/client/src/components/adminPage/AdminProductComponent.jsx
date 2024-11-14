import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setAdminPage, setEditProductId } from "../../store/functionalitySlice"

export const AdminProductComponent = () => {

    const [products, setProducts] = useState([])
    const dispatch = useDispatch()


    const getProducts = async () => {

        const userToken = localStorage.getItem('userToken')
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}admin/products`, {
            headers: {
                userToken: userToken
            }
        })
        setProducts(response.data)
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div className="w-full min-h-full mx-auto p-1 sm:p-6 bg-white shadow-md rounded-md font-interonly">


            {products.length > 0 ?
                <table className="w-full p-2 text-xs sm:text-sm lg:text-lg">
                    <thead className="border-b border-b-blue-300">
                        <tr>
                            <th className="text-start">Sl.No.</th>
                            <th className="text-start">Name</th>
                            <th className="text-start">Mrp</th>
                            <th className="text-start">Price</th>
                            <th>Images</th>
                            {/* <th className="text-start">Description</th> */}
                            <th className="text-start">Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((prod, index) => {
                                return <tr className="py-2 shadow-md hover:scale-x-105" key={prod._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.mrp}</td>
                                    <td>{prod.price}</td>
                                    <td className="flex flex-wrap gap-1 p-1">
                                        {prod.images.map((image, idx) => {
                                            return <img key={idx} className="w-6 sm:w-12 lg:w-18 rounded-md" src={image} alt="" />
                                        })}
                                    </td>

                                    {/* <td>{prod.description}</td> */}
                                    <td>{prod.stock}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                dispatch(setEditProductId(prod._id))
                                                dispatch(setAdminPage('editproduct'))
                                            }}
                                            className="bg-blue-500 text-white px-4 py-1 rounded-md active:scale-90">Edit</button>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
                :

                <h2 className="text-center">You haven't added any Product Yet...</h2>
            }

        </div>

    )
}