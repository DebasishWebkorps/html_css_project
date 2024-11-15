import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { hideLoading, setAdminPage, setEditProductId, showLoading } from "../../store/functionalitySlice"

export const AdminEditProducts = () => {

    const [imagesUrl, setImagesUrl] = useState([])
    const [editData, setEditData] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const editProductId = useSelector(state => state.functionality.editProductId)

    const [error, setError] = useState({
        nameError: '',
        mrpError: '',
        priceError: '',
        descriptionError: '',
        // imageError: '',
        stockError: '',
        categoryError: ''
    })


    const nameRef = useRef()
    const mrpRef = useRef()
    const priceRef = useRef()
    const descriptionRef = useRef()
    const stockRef = useRef()
    // const imageRef = useRef()
    const categoryRef = useRef()


    const getProductData = async () => {
        const userToken = localStorage.getItem('userToken')

        try {
            dispatch(showLoading())
            // const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/${editProductId}`, {
                headers: {
                    userToken: userToken
                }
            })
            setEditData(response.data[0])
            setImagesUrl(response.data[0].images)

        } catch (error) {
            toast.error(error.message)
            // navigate('/')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getProductData()
    }, [])



    // const handleImageChange = (event) => {
    //     if (event.target.files.length > 5) {
    //         setError({
    //             ...error,
    //             imageError: 'You can select maximum 5 Images'
    //         })
    //         return
    //     }

    //     if (event.target.files.length > 0) {
    //         const files = [...event.target.files]
    //         const imagesUrl = files.map(file => URL.createObjectURL(file))
    //         setImagesUrl(imagesUrl)
    //     }
    // }

    const nameChangeHandler = () => {
        setEditData({
            ...editData,
            name: nameRef.current.value
        })
        if (nameRef.current.value.length > 4) {
            setError({
                ...error,
                nameError: ''
            })
        } else if (nameRef.current.value.length > 0 && nameRef.current.value.length < 5) {
            setError({
                ...error,
                nameError: 'Please write Product Name of atleast 5 character'
            })
        } else {
            setError({
                ...error,
                nameError: 'Please write Product Name'
            })
        }
    }

    const mrpChangeHandler = () => {
        setEditData({
            ...editData,
            mrp: mrpRef.current.value
        })
        if (+mrpRef.current.value <= 0) {
            setError({
                ...error,
                mrpError: 'Please write Product Mrp should be above 0'
            })
        } else {
            setError({
                ...error,
                mrpError: ''
            })
        }
    }

    const priceChangeHandler = () => {
        setEditData({
            ...editData,
            price: priceRef.current.value
        })
        if (+priceRef.current.value <= 0) {
            setError({
                ...error,
                priceError: 'Please write Product Selling Price should be above 0'
            })
        } else {
            setError({
                ...error,
                priceError: ''
            })
        }
    }

    const stockChangeHandler = () => {
        setEditData({
            ...editData,
            stock: stockRef.current.value
        })
        if (+stockRef.current.value <= 0) {
            setError({
                ...error,
                stockError: 'Please write Stock Inventory should be above 0'
            })
        } else {
            setError({
                ...error,
                stockError: ''
            })
        }
    }

    const descriptionChangeHandler = () => {
        setEditData({
            ...editData,
            description: descriptionRef.current.value
        })
        if (descriptionRef.current.value.split(' ').length < 4) {
            setError({
                ...error,
                descriptionError: 'Please Write Product details'
            })
        } else {
            setError({
                ...error,
                descriptionError: ''
            })
        }
    }

    const cancelHandler = () => {
        dispatch(setEditProductId(''))
        dispatch(setAdminPage('products'))
        navigate('/admin')
    }

    const categoryChangeHandler = () => {
        setEditData({
            ...editData,
            category: categoryRef.current.value
        })
        if (categoryRef.current.value === '') {
            setError({
                ...error,
                categoryError: 'Please Select a category'
            })
        } else {
            setError({
                ...error,
                categoryError: ''
            })
        }
    }

    const editProductHandler = async (event) => {
        event.preventDefault()

        if (nameRef.current.value === '' &&
            mrpRef.current.value === '' &&
            priceRef.current.value === '' &&
            descriptionRef.current.value === '' &&
            stockRef.current.value === '' &&
            categoryRef.current.value === ''
        ) {
            return setError({
                nameError: 'Please write Product Name',
                mrpError: 'Please write Mrp ',
                priceError: 'Please Write Selling Price',
                descriptionError: 'Please write Product Details',
                // imageError: '',
                stockError: 'Please add Stock',
                categoryError: 'Please Select Category'
            })
        }

        if (nameRef.current.value === '') {
            return setError({
                ...error,
                nameError: 'Please write Product Name'
            })
        }

        if (mrpRef.current.value === '') {
            return setError({
                ...error,
                mrpError: 'Please write Mrp '
            })
        }

        if (priceRef.current.value === '') {
            return setError({
                ...error,
                priceError: 'Please Write Selling Price'
            })
        }

        if (+priceRef.current.value > +mrpRef.current.value) {
            return setError({
                ...error,
                priceError: 'Price should be less than MRP'
            })
        }

        if (categoryRef.current.value === '') {
            return setError({
                ...error,
                categoryError: 'Please Select Category'
            })
        }

        if (descriptionRef.current.value === '') {
            return setError({
                ...error,
                descriptionError: 'Please write Product Details'
            })
        }

        if (stockRef.current.value === '') {
            return setError({
                ...error,
                stockError: 'Please add Stock'
            })
        }

        // if (imageRef.current.files.length <= 0) {
        //     setError({
        //         ...error,
        //         imageError: 'Please Select atleast 1 image'
        //     })
        //     return
        // }

        // if (imageRef.current.files.length > 5) {
        //     setError({
        //         ...error,
        //         imageError: 'You can Select Maximum 5 Images Only'
        //     })
        //     return
        // }

        // const formData = new FormData()

        // formData.append('name', nameRef.current.value)
        // formData.append('mrp', mrpRef.current.value)
        // formData.append('price', priceRef.current.value)
        // formData.append('description', descriptionRef.current.value)
        // formData.append('stock', stockRef.current.value)
        // formData.append('category', categoryRef.current.value)

        // const files = imageRef.current.files
        // for (let i = 0; i < files.length; i++) {
        //     formData.append('images', imageRef.current.files[i])
        // }


        const updateProduct = {
            name: nameRef.current.value,
            mrp: mrpRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            stock: stockRef.current.value,
            category: categoryRef.current.value,
            productId: editProductId
        }



        try {
            const userToken = localStorage.getItem('userToken')

            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}admin/addproduct`, updateProduct, {
                headers: {
                    userToken: userToken
                }
            })

            toast.success(response.data.message)
            cancelHandler()

        } catch (err) {
            toast.error(err.response.data.message)
        }

    }

    return (
        <div className="w-full mx-auto p-1 sm:p-6 bg-white shadow-md rounded-md font-interonly">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">Edit Product</h2>
            <form encType="multipart/form-data" onSubmit={(event) => editProductHandler(event)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        value={editData?.name}
                        onChange={nameChangeHandler}
                        ref={nameRef}
                        type="text"
                        id="name"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.nameError !== '' && <p className="text-red-400">{error.nameError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">Mrp</label>
                    <input
                        value={editData?.mrp}
                        onChange={mrpChangeHandler}
                        ref={mrpRef}
                        type="number"
                        id="mrp"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.mrpError !== '' && <p className="text-red-400">{error.mrpError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        value={editData?.price}
                        onChange={priceChangeHandler}
                        ref={priceRef}
                        type="number"
                        id="price"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.priceError !== '' && <p className="text-red-400">{error.priceError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="" id=""
                        value={editData?.category}
                        ref={categoryRef}
                        onChange={categoryChangeHandler}
                        className="block w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select</option>
                        <option value="electronics">Electronics</option>
                        <option value="mensfashion">Men's Fashion</option>
                        <option value="womenfashion">Women's Fashion</option>
                        <option value="home">Home</option>
                    </select>
                    {error.categoryError !== '' && <p className="text-red-400">{error.categoryError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={editData?.description}
                        onChange={descriptionChangeHandler}
                        ref={descriptionRef}
                        id="description"
                        rows="4"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.descriptionError !== '' && <p className="text-red-400">{error.descriptionError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                    {/* <input
                        max={5}
                        ref={imageRef}
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        multiple
                    /> */}

                    {imagesUrl && (
                        <div className="mt-2 flex flex-wrap gap-3 ">
                            {imagesUrl.map((image, idx) =>
                                <img
                                    key={idx}
                                    src={image}
                                    alt="Image preview" className="w-32 h-32 object-cover rounded-md" />
                            )}
                        </div>
                    )}

                    {error.imageError !== '' && <p className="text-red-400">{error.imageError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        value={editData?.stock}
                        onChange={stockChangeHandler}
                        ref={stockRef}
                        type="number"
                        id="stock"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.stockError !== '' && <p className="text-red-400">{error.stockError}</p>}
                </div>

                <div className="flex gap-2">

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600 active:scale-90">
                        Update Product
                    </button>

                    <button
                        onClick={cancelHandler}
                        className="w-full py-3 px-4 bg-orange-500 text-white rounded-md font-bold hover:bg-blue-600 active:scale-90">
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    )
}