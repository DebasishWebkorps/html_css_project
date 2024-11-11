import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetUser } from "../store/userSlice"
import { hideMobileMenu, showMobileMenu } from "../store/functionalitySlice"
import { useRef } from "react"

export const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchRef = useRef()

    const email = useSelector(state => state.user.email)
    const isMobileOpen = useSelector(state => state.functionality.isMobileMenu)

    const navigateTo = (path) => {
        dispatch(hideMobileMenu())
        navigate(path)
    }


    const searchHandler = async () => {
        dispatch(hideMobileMenu())
        navigate(`/search/${searchRef.current.value}`)
    }


    const logoutHandler = () => {
        dispatch(hideMobileMenu())
        localStorage.removeItem('userToken')
        dispatch(resetUser())
        navigate('/login')
    }



    const toggleMobileMenu = () => {
        if (isMobileOpen) {
            dispatch(hideMobileMenu())

        } else {
            dispatch(showMobileMenu())
        }
    }

    const closeMobileMenu = () => {
        if (isMobileOpen) {
            dispatch(hideMobileMenu())
        }
    }



    return (
        <div onClick={closeMobileMenu} className="w-full bg-[#2874F0] py-2 flex px-3 justify-between sm:justify-center gap-4 sticky top-0 z-10">

            <div onClick={() => { navigate('/') }} className="cursor-pointer flex flex-col justify-center items-center">
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

            {isMobileOpen === false ?
                <div className="sm:hidden flex items-center cursor-pointer " onClick={toggleMobileMenu}>
                    <svg viewBox="0 0 100 80" width="30" height="20">
                        <rect width="100" height="20" rx="10" fill="white"></rect>
                        <rect y="30" width="100" height="20" rx="10" fill="white"></rect>
                        <rect y="60" width="100" height="20" rx="10" fill="white"></rect>
                    </svg>
                </div>
                :
                <div className="sm:hidden flex items-center cursor-pointer" onClick={toggleMobileMenu}>
                    <svg viewBox="0 0 12 12" width="30" height="20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="11" x2="11" y2="1" stroke="white" strokeWidth="2" />
                        <line x1="1" y1="1" x2="11" y2="11" stroke="white" strokeWidth="2" />
                    </svg>

                </div>
            }



            <div className="w-1/3 hidden sm:flex rounded-[3px] overflow-hidden">
                <input ref={searchRef} type="text" className="flex-1 pl-4 placeholder:text-[#757575] font-sans text-sm outline-none" placeholder="Search for products brand and more" />
                <button onClick={searchHandler} className="bg-[#FFFFFF] p-2 active:scale-90">
                    {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5922 12.6122C4.90331 12.6122 2.72442 10.4389 2.72442 7.75889C2.72442 5.07778 4.90331 2.90444 7.5922 2.90444C10.2811 2.90444 12.46 5.07778 12.46 7.75889C12.46 10.44 10.2811 12.6122 7.5922 12.6122ZM7.5922 0.573334C3.6122 0.573334 0.385529 3.79 0.385529 7.75889C0.385529 11.7278 3.6122 14.9444 7.5922 14.9444C11.5722 14.9444 14.7989 11.7278 14.7989 7.75889C14.7989 3.79 11.5722 0.573334 7.5922 0.573334Z" fill="#2874F0" />
                    </svg> */}

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M10.5 3C6.357 3 3 6.357 3 10.5S6.357 18 10.5 18c1.859 0 3.536-.742 4.786-1.962l6.792 6.792 1.5-1.5-6.792-6.792C17.758 14.536 18 12.859 18 10.5 18 6.357 14.643 3 10.5 3zM10.5 5C13.537 5 16 7.463 16 10.5S13.537 16 10.5 16 5 13.537 5 10.5 7.463 5 10.5 5z" fill="#2874F0" />
                    </svg>

                </button>
            </div>




            {email ?
                <div
                    onClick={() => navigate('/cart')}
                    className="hidden sm:flex justify-center items-center gap-2 text-[#FFFFFF] cursor-pointer active:scale-95">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1_1045)">
                            <path d="M16.0901 2.405H5.65713C3.77013 2.405 3.23013 0.805 3.23013 0.805L3.02713 0.21C2.97813 0.085 2.85313 0 2.71613 0H1.10613C0.870128 0 0.706128 0.24 0.794128 0.46L1.43813 2.405L3.88013 9.767C3.92713 9.904 4.05513 9.997 4.20013 9.997H12.6181L12.1251 11.955H4.53813L4.54013 11.958C4.52313 11.958 4.50713 11.955 4.49013 11.955C3.43013 11.955 2.57013 12.815 2.57013 13.875C2.57013 14.935 3.43013 15.795 4.49013 15.795C5.48013 15.795 6.29513 15.045 6.40013 14.083L11.9501 14.159C12.0701 15.081 12.8601 15.795 13.8171 15.795C14.8571 15.795 15.7021 14.951 15.7021 13.91C15.7021 13.044 15.1181 12.317 14.3221 12.096L16.7451 3.264C16.8651 2.831 16.5391 2.405 16.0901 2.405Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_1045">
                                <rect width="16" height="16" fill="white" transform="translate(0.77002)" />
                            </clipPath>
                        </defs>
                    </svg>

                    Cart
                </div>
                : ''
            }

            {email ?
                <div
                    onClick={() => navigate('/orders')}
                    className="hidden sm:flex justify-center items-center gap-2 text-[#FFFFFF] cursor-pointer active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="white" d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm-1 3c-0.553 0-1 0.447-1 1v2c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-2c0-0.553-0.447-1-1-1H2zm0 1h22v1H1z" />
                    </svg>



                    Orders
                </div>
                : ''
            }



            {email && <p className="hidden sm:flex text-white rounded-md capitalize justify-center items-center px-4">Hi, {email.split('@')[0]}</p>}


            <div
                onClick={logoutHandler}
                className="cursor-pointer bg-[#FFFFFF] hidden sm:flex justify-center items-center rounded-[3px] active:scale-95">
                <button className="px-7">
                    {email ? 'Logout' : 'Login'}
                </button>
            </div>








            {isMobileOpen &&
                <div
                    className="absolute h-[100vh] sm:hidden left-0  bottom-0 translate-y-full border-t w-full bg-gray-400 bg-opacity-10  ease-in-out transition-all delay-1000"
                    onClick={closeMobileMenu}>

                    <div
                        className="flex flex-col bg-[#2874F0] p-2"
                        onClick={(event) => event.stopPropagation()}>

                        <div className="w-full flex rounded-[3px] overflow-hidden">
                            <input ref={searchRef}
                                type="text"
                                className="flex-1 pl-4 placeholder:text-[#757575] font-sans text-sm outline-none"
                                placeholder="Search for products brand and more" />
                            <button onClick={searchHandler} className="bg-[#FFFFFF] p-2 active:scale-90">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M10.5 3C6.357 3 3 6.357 3 10.5S6.357 18 10.5 18c1.859 0 3.536-.742 4.786-1.962l6.792 6.792 1.5-1.5-6.792-6.792C17.758 14.536 18 12.859 18 10.5 18 6.357 14.643 3 10.5 3zM10.5 5C13.537 5 16 7.463 16 10.5S13.537 16 10.5 16 5 13.537 5 10.5 7.463 5 10.5 5z" fill="#2874F0" />
                                </svg>

                            </button>
                        </div>




                        {email ?
                            <div
                                onClick={() => navigateTo('/cart')}
                                className="flex justify-center py-3 items-center gap-2 text-[#FFFFFF] cursor-pointer active:scale-95 hover:bg-blue-600">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1_1045)">
                                        <path d="M16.0901 2.405H5.65713C3.77013 2.405 3.23013 0.805 3.23013 0.805L3.02713 0.21C2.97813 0.085 2.85313 0 2.71613 0H1.10613C0.870128 0 0.706128 0.24 0.794128 0.46L1.43813 2.405L3.88013 9.767C3.92713 9.904 4.05513 9.997 4.20013 9.997H12.6181L12.1251 11.955H4.53813L4.54013 11.958C4.52313 11.958 4.50713 11.955 4.49013 11.955C3.43013 11.955 2.57013 12.815 2.57013 13.875C2.57013 14.935 3.43013 15.795 4.49013 15.795C5.48013 15.795 6.29513 15.045 6.40013 14.083L11.9501 14.159C12.0701 15.081 12.8601 15.795 13.8171 15.795C14.8571 15.795 15.7021 14.951 15.7021 13.91C15.7021 13.044 15.1181 12.317 14.3221 12.096L16.7451 3.264C16.8651 2.831 16.5391 2.405 16.0901 2.405Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1_1045">
                                            <rect width="16" height="16" fill="white" transform="translate(0.77002)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                Cart
                            </div>
                            : ''
                        }

                        {email ?
                            <div
                                onClick={() => navigateTo('/orders')}
                                className="flex justify-center items-center gap-2 text-[#FFFFFF] cursor-pointer active:scale-95 hover:bg-blue-600 py-3">
                                {/* <div onClick={() => navigate('/orders')} className="flex justify-center items-center gap-2 text-[#FFFFFF] cursor-pointer active:scale-95 hover:bg-blue-600 py-3"> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="white" d="M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm-1 3c-0.553 0-1 0.447-1 1v2c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-2c0-0.553-0.447-1-1-1H2zm0 1h22v1H1z" />
                                </svg>



                                Orders
                            </div>
                            : ''
                        }



                        {email && <p
                            className="flex text-white rounded-md capitalize justify-center items-center px-4  hover:bg-blue-600 py-3">
                            Hi, {email.split('@')[0]}
                        </p>}


                        <div
                            onClick={logoutHandler}
                            className="cursor-pointer bg-[#FFFFFF] flex justify-center items-center rounded-[3px] active:scale-95  hover:bg-blue-100 py-3">
                            <button className="px-7">
                                {email ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    </div>


                </div>
            }


        </div>
    )
}