import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAdminPage } from "../../store/functionalitySlice"
import { AdminDashboardComponent } from "./AdminDashboardComponent"
import { AdminOrdersComponent } from "./AdminOrdersComponent"
import { AdminProductComponent } from "./AdminProductComponent"
import { AdminAddProducts } from "./AdminAddProducts"
import { resetUser } from "../../store/userSlice"
import { AdminEditProducts } from "./AdminEditProducts"

export const Adminpage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const email = useSelector(state => state.user.email)
    const page = useSelector(state => state.functionality.adminPage)

    const changePage = (page) => {
        dispatch(setAdminPage(page))
    }

    const logoutHandler = () => {
        localStorage.removeItem('userToken')
        dispatch(resetUser())
        navigate('/admin/login')
    }


    return (
        <div className="w-full grid grid-cols-[1fr,4fr]">
            <div className="relative h-[100vh] bg-[#2874F0] shadow-md flex flex-col">

                <div onClick={() => { navigate('/') }} className="cursor-pointer flex flex-col justify-center items-center p-2">
                    <h2 className="italic text-white font-bold font-sans text-lg">Webkart</h2>
                    <p className="inline-flex items-center italic text-[#F0F0F0] text-xs -mt-2">Explore

                        <span className="text-[#FFE500] pr-1 pl-1">
                            Plus
                        </span>

                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect x="0.390015" y="0.859985" width="10" height="10" fill="url(#pattern0_1_1023)" />
                            <defs>
                                <pattern id="pattern0_1_1023" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_1_1023" transform="scale(0.0333333)" />
                                </pattern>
                                <image id="image0_1_1023" width="30" height="30" xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>

                    </p>
                </div>

                <h2 className="text-xs sm:text-lg font-interonly text-white py-3 px-2 border-b border-t">Welcome, <span className="uppercase"> {email.split('@')[0]}</span></h2>

                <div className="text-xs sm:text-sm flex flex-col text-white font-interonly ">

                    <div onClick={() => changePage('dashboard')} className={`cursor-pointer flex items-center justify-start gap-1 py-2 px-1 hover:bg-blue-700 ${page === 'dashboard' && 'bg-blue-700 shadow-md'}`}>
                        <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.565 511.565" xmlSpace="preserve" width="16px" height="16px" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M259.2,272.554c-4.881,2.33-9.779,4.659-14.635,7.031c-10.778,5.265-16.401,17.254-13.679,29.167 c2.091,9.131,9.626,16.666,18.756,18.748c11.878,2.714,23.902-2.901,29.167-13.679c2.347-4.813,4.659-9.651,6.955-14.49 c7.262-15.241,14.763-30.993,23.714-45.901l6.767-11.281l-11.29,6.767C290.099,257.834,274.389,265.318,259.2,272.554z"></path> <rect x="187.512" y="379.408" width="136.533" height="34.133"></rect> <path d="M426.453,302.605c0-4.71,3.814-8.533,8.533-8.533h76.578c-0.956-28.928-6.707-56.653-16.529-82.406l-38.007,18.15 c-1.186,0.563-2.441,0.836-3.669,0.836c-3.191,0-6.246-1.792-7.706-4.864c-2.039-4.25-0.239-9.344,4.019-11.375l38.733-18.492 c-11.81-25.651-27.733-49.007-46.933-69.257l-28.57,30.891c-1.69,1.818-3.977,2.739-6.272,2.739c-2.074,0-4.147-0.751-5.786-2.27 c-3.465-3.2-3.678-8.602-0.478-12.066l28.971-31.317c-19.311-17.852-41.37-32.742-65.459-44.015l-17.536,38.869 c-1.425,3.166-4.523,5.035-7.782,5.035c-1.169,0-2.364-0.247-3.499-0.759c-4.301-1.937-6.212-6.989-4.267-11.29l17.391-38.545 c-26.163-10.163-54.391-16.137-83.866-17.109v76.578c0,4.719-3.823,8.533-8.533,8.533c-4.719,0-8.533-3.814-8.533-8.533V46.827 c-27.648,0.913-54.204,6.161-78.976,15.198l15.002,40.021c1.656,4.412-0.58,9.335-4.983,10.991 c-0.998,0.358-2.005,0.538-3.004,0.538c-3.447,0-6.707-2.116-7.996-5.538l-14.831-39.569 c-26.47,11.725-50.577,27.793-71.441,47.317l29.943,29.943c3.337,3.328,3.337,8.73,0,12.066c-1.664,1.664-3.849,2.5-6.033,2.5 c-2.185,0-4.369-0.836-6.033-2.5l-29.943-29.943c-18.347,19.601-33.647,42.061-45.15,66.654l38.869,17.545 c4.301,1.937,6.204,6.989,4.267,11.281c-1.425,3.157-4.531,5.035-7.782,5.035c-1.169,0-2.364-0.247-3.507-0.76l-38.545-17.399 C6.946,236.369,0.973,264.597,0,294.072h76.587c4.71,0,8.533,3.823,8.533,8.533c0,4.719-3.823,8.533-8.533,8.533H0.137 c0.905,28.075,6.238,55.27,15.855,80.964l38.835-16.836c4.326-1.886,9.344,0.128,11.221,4.446 c1.869,4.318-0.111,9.344-4.437,11.213L22.4,407.915c8.585,18.91,19.49,36.881,32.751,53.598c1.613,2.039,4.07,3.226,6.682,3.226 h387.9c2.611,0,5.069-1.186,6.682-3.226c12.552-15.821,22.895-32.811,31.258-50.603l-38.818-17.758 c-4.284-1.963-6.17-7.023-4.216-11.307c1.963-4.275,7.006-6.195,11.315-4.216l38.4,17.562 c10.359-26.598,16.128-54.844,17.075-84.053h-76.442C430.268,311.138,426.453,307.324,426.453,302.605z M341.12,422.072 c0,4.719-3.823,8.533-8.533,8.533h-153.6c-4.719,0-8.533-3.814-8.533-8.533v-51.2c0-4.71,3.814-8.533,8.533-8.533h153.6 c4.71,0,8.533,3.823,8.533,8.533V422.072z M348.433,221.666l-24.329,40.55c-8.525,14.199-15.846,29.577-22.929,44.45 c-2.33,4.89-4.659,9.779-7.031,14.643c-7.296,14.942-22.298,23.945-38.46,23.945c-3.251,0-6.554-0.367-9.839-1.109 c-15.633-3.567-28.032-15.966-31.599-31.599c-4.489-19.669,4.898-39.535,22.818-48.29c4.915-2.406,9.856-4.753,14.797-7.108 c14.831-7.066,30.157-14.37,44.314-22.861l40.55-24.329c3.354-2.005,7.654-1.502,10.428,1.28 C349.918,214.012,350.447,218.304,348.433,221.666z"></path> </g> </g> </g> </g></svg>
                        <p>Dashboard</p>
                    </div>

                    <div onClick={() => changePage('orders')} className={`cursor-pointer flex items-center justify-start gap-1 py-2 px-1 hover:bg-blue-700 ${page === 'orders' && 'bg-blue-700 shadow-md'}`}>
                        <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 100 100" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M78.8,62.1l-3.6-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,70.6c-1.2,0.6-2.7,0.6-3.9,0L26.5,60.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.6,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,78.5c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,65,80.4,62.8,78.8,62.1z"></path> </g> <g> <path d="M78.8,48.1l-3.7-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,56.6c-1.2,0.6-2.7,0.6-3.9,0L26.6,46.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.7,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,64.6c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,51.1,80.4,48.9,78.8,48.1 z"></path> </g> <g> <path d="M21.2,37.8l26.8,12.7c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7c1.6-0.8,1.6-2.9,0-3.7L51.9,21.4 c-1.2-0.6-2.7-0.6-3.9,0L21.2,34.2C19.6,34.9,19.6,37.1,21.2,37.8z"></path> </g> </g> </g></svg>
                        <p>Orders</p>
                    </div>


                    <div onClick={() => changePage('products')} className={`cursor-pointer flex items-center justify-start gap-1 py-2 px-1 hover:bg-blue-700 ${page === 'products' && 'bg-blue-700 shadow-md'}`}>
                        <svg width="16px" height="16px" viewBox="0 0 20.00 20.00" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" strokeWidth="0.0002"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5 .71 0 1.39.15 2 .42.61-.27 1.29-.42 2-.42 2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02c.63.84 1.02 1.87 1.02 3v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z"></path> </g> </g></svg>
                        <p>Products</p>
                    </div>


                    <div onClick={() => changePage('addproducts')} className={`cursor-pointer flex items-center justify-start gap-1 py-2 px-1 hover:bg-blue-700 ${page === 'addproducts' && 'bg-blue-700 shadow-md'}`}>
                        <svg width="16px" height="16px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="2.4"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.528"></g><g id="SVGRepo_iconCarrier"> <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#1C274C"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#1C274C"></path> </g></svg>
                        <p>Add Products</p>
                    </div>

                    {page === 'editproduct' &&
                        <div className={`cursor-pointer flex items-center justify-start gap-1 py-2 px-1 bg-blue-700 shadow-md'}`}>
                            <svg fill="#ffffff" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="edit"> <rect width="24" height="24" opacity="0"></rect> <path d="M19.4 7.34L16.66 4.6A2 2 0 0 0 14 4.53l-9 9a2 2 0 0 0-.57 1.21L4 18.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 20h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71zM16 10.68L13.32 8l1.95-2L18 8.73z"></path> </g> </g> </g></svg>
                            <p>Edit Product</p>
                        </div>}


                </div>


                <div
                    onClick={logoutHandler}
                    className="font-interonly cursor-pointer absolute w-full text-center font-semibold py-2 active:scale-90 rounded-sm left-0 bottom-0 bg-white text-blue-800">
                    Logout
                </div>


            </div>
            <div className=" overflow-y-scroll h-[100vh]">
                {page === 'dashboard' && <AdminDashboardComponent />}
                {page === 'orders' && <AdminOrdersComponent />}
                {page === 'products' && <AdminProductComponent />}
                {page === 'addproducts' && <AdminAddProducts />}
                {page === 'editproduct' && <AdminEditProducts />}

            </div>
        </div>
    )
}