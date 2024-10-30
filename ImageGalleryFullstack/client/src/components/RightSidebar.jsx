import { useEffect } from "react"
import { Card } from "./Card"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setData } from "../store/dataSlice"
import { hideLoading, showLoading } from "../store/functionalitySlice"

export const RightSidebar = (props) => {

    const data = useSelector(state => state.data.currentData)
    const dataType = useSelector(state => state.functionality.typeOfData)


    const dispatch = useDispatch()


    const getAllImages = async () => {
        const userToken = localStorage.getItem('userToken')
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}image/${dataType}`, {
                headers: {
                    'userToken': userToken
                }
            })


            // if (response.data.length > 0) {
            dispatch(setData(response.data))
            // }

        } catch (error) {
            console.log(error.message)
            // localStorage.removeItem('userToken')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        dispatch(showLoading())
        getAllImages()
    }, [dataType])




    return (
        <div className="grid grid-cols-5 gap-3">

            {/* {data.length === 0 ? <h1>No Data....</h1> : ''}
            {data?.map((img) => {
                return <Card key={img._id} image={img} />
            })} */}

            {
                data.length === 0 ? (
                    <h1>No Data...</h1>
                ) : (
                    data.map((img) => <Card key={img._id} image={img} />)
                )
            }


        </div>
    )
}
