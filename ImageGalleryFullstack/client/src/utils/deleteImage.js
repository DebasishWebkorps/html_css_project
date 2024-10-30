import axios from "axios"

const deleteImage = async (imgId) => {

    const permissionToDelete = confirm('Do you want to delete it')

    if (!permissionToDelete) return

    const userToken = localStorage.getItem('userToken')

    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}image/delete/${imgId}`, {
            headers: {
                'userToken': userToken
            }
        })

        return true

    } catch (error) {
        console.log(error.message)
        return false
    }
}


export { deleteImage }