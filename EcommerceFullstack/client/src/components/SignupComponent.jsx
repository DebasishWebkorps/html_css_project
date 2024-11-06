import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const SignupComponent = () => {

    const navigate = useNavigate()
    const emailRef = useRef('')
    const passwordRef = useRef('')

    const timeoutId = useRef()

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        roleError: ''
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

    const signupHandler = async (event) => {
        event.preventDefault()

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }


        if (user.email === '' && user.password === '') {
            setError({
                emailError: 'Enter Your Email Id',
                passwordError: 'Enter Password'
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
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/signup`, user)
                toast.success(response.data.message)
                navigate('/login')

            } catch (error) {
                toast.error(error.response.data.message)
                if (error.response.data.message === 'User Already Existed') {
                    navigate('/login')
                }
            }


        }

    }


    return (
        <div className="w-1/2 h-[70vh] bg-white my-3 mx-auto grid grid-cols-3 shadow-md">

            <div className="relative bg-[#2874F0]">
                <div className="p-8">
                    <h1 className="text-3xl text-white font-semibold">Looks like you're new here</h1>
                    <p className="text-[14px] font-sans text-gray-300 mt-3">Signup with your email address to get started</p>
                </div>
                <div className="w-full absolute bottom-10 left-0 flex justify-center">
                    <img className="object-cover" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="" />
                </div>
            </div>

            <div className="col-span-2 flex justify-center items-center">
                <form action="#" className="flex flex-col gap-10 w-full px-10">
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
                        onClick={(event) => signupHandler(event)}
                        className="flex bg-[#fb641b] justify-center py-3 rounded-sm shadow-md text-white font-bold active:scale-95 outline-none">Signup</button>
                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            navigate('/login')
                        }}
                        className="flex justify-center py-3 rounded-sm shadow-lg text-blue-500 font-semibold active:scale-95 outline-none">
                        Already have an account? Try Login
                    </button>
                </form>
            </div>

        </div >
    )
}