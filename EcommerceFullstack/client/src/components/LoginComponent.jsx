import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { setUser } from "../store/userSlice"

export const LoginComponent = () => {

    const email = useSelector(state => state.user.email)
    const role = useSelector(state => state.user.role)
    const navigate = useNavigate()

    const isUser = useLocation().pathname === '/login'
    const isUserLogin = useLocation().pathname === '/login'
    const isAdminLogin = useLocation().pathname === '/admin/login'

    useEffect(() => {

        if (isUserLogin) {
            if (email) return navigate('/')
        }

        if (isAdminLogin) {
            if (role === 'admin') return navigate('/admin')
        }

    }, [])

    const emailRef = useRef('')
    const passwordRef = useRef('')

    const dispatch = useDispatch()

    const timeoutId = useRef()

    const [error, setError] = useState({
        emailError: '',
        passwordError: ''
    })

    const emailChangeHandler = () => {
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            if (emailRef.current.value.length < 1) {
                setError({
                    ...error,
                    emailError: 'Enter Your Email Id'
                })
            } else if (emailRef.current.value.length < 5) {
                setError({
                    ...error,
                    emailError: 'Invalid Email Id'
                })
            } else if (emailRef.current.value.indexOf('@') !== emailRef.current.value.lastIndexOf('@')) {
                setError({
                    ...error,
                    emailError: 'Invalid Email Id'
                })
            } else if (!emailRef.current.value.includes('.com')) {
                setError({
                    ...error,
                    emailError: 'Invalid Email Id'
                })
            } else {
                setError({
                    ...error,
                    emailError: ''
                })
            }
        }, 500)
    }

    const passwordChangeHandler = () => {
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            if (passwordRef.current.value.length < 1) {
                setError({
                    ...error,
                    passwordError: 'Enter Password'
                })
            } else if (passwordRef.current.value.length < 6) {
                setError({
                    ...error,
                    passwordError: 'Password should be atleast 6 character'
                })
            } else {
                setError({
                    ...error,
                    passwordError: ''
                })
            }
        }, 500)
    }



    const loginHandler = async (event) => {
        event.preventDefault()

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: isUser ? 'user' : 'admin'
        }

        if (user.email === '' && user.password === '' && user.role === '') {
            setError({
                emailError: 'Enter Your Email Id',
                passwordError: 'Enter Password',
            })
            return
        }

        if (user.email === '') {
            setError({
                ...error,
                emailError: 'Enter Your Email Id',
            })
            return
        }

        if (user.password === '') {
            setError({
                ...error,
                passwordError: 'Enter Password',
            })
            return
        }


        if (error.emailError === '' && error.passwordError === '') {

            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/login`, user)
                localStorage.setItem('userToken', response.data.token)
                toast.success(response.data?.message)
                dispatch(setUser(response.data.user))
                if (isUserLogin) {
                    navigate('/')
                } else {
                    navigate('/admin')
                }

            } catch (err) {
                // alert(error.response.data.message)
                toast.error(err.response?.data?.message)
            }
        }

    }




    return (
        <div className="w-full sm:w-1/2 bg-white my-3 mx-auto grid grid-cols-3 shadow-md">

            <div className="relative bg-[#2874F0] overflow-hidden flex flex-col justify-between h-full">
                <div className="p-2 sm:p-8">
                    <h1 className="text-3xl text-white font-semibold">Login</h1>
                    <p className="text-[14px] font-sans text-gray-300 mt-3 break-all">Get access Your Orders Wishlist and Recommendations</p>
                </div>
                <div className="w-full absolute bottom-10 left-0 flex justify-center">
                    <img className="object-cover" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="" />
                </div>
            </div>

            <div className="col-span-2 flex justify-center items-center">
                <form action="#" className="flex flex-col gap-8 w-full px-10 py-3 my-3">
                    <label className="text-blue-800 font-bold uppercase text-center underline" htmlFor="">{isUser ? 'User' : 'Admin'} Login</label>
                    <input
                        ref={emailRef}
                        onChange={emailChangeHandler}
                        className="outline-none border-b-2 flex-1 placeholder:text-lg placeholder:text-gray-500 focus:border-b-blue-400" type="text" placeholder="Enter your Email" />
                    {error.emailError.length > 0 ? <p className="col-start-2 -mt-10 col-span-3 text-red-600">{error.emailError}</p> : ''}

                    <input
                        ref={passwordRef}
                        onChange={passwordChangeHandler}
                        className="outline-none border-b-2 flex-1 placeholder:text-lg placeholder:text-gray-500 focus:border-b-blue-400" type="password" placeholder="Enter your Password" />
                    {error.passwordError.length > 0 ? <p className="col-start-2 -mt-10 col-span-3 text-red-600">{error.passwordError}</p> : ''}

                    <button
                        onClick={(event) => loginHandler(event)}
                        className="flex bg-[#fb641b] justify-center py-3 rounded-sm shadow-md text-white font-bold active:scale-95 outline-none">Login</button>
                    {isUser && <button
                        onClick={(event) => {
                            event.preventDefault()
                            navigate('/signup')
                        }}
                        className="flex text-xs justify-center py-3 mb-2 rounded-sm shadow-lg text-blue-500 font-semibold active:scale-95 outline-none">
                        Don't have an account? Create an User account
                    </button>}


                    {!isUser &&
                        <button
                            onClick={(event) => {
                                event.preventDefault()
                                navigate('/admin/signup')
                            }}
                            className="flex text-xs justify-center py-3 mb-2 rounded-sm shadow-lg text-blue-500 font-semibold active:scale-95 outline-none">
                            Admin Signup
                        </button>}


                    {isUser === true ?
                        <Link className="text-right text-sm mb-2 cursor-pointer text-blue-600 underline" to={'/admin/signup'}>Create an Admin account</Link>
                        :
                        <Link className="text-right text-sm mb-2 cursor-pointer text-blue-600 underline" to={'/signup'}>Create an User account</Link>
                    }


                </form>
            </div>

        </div >
    )
}