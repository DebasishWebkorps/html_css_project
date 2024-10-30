import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export const SignupPage = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const roleRef = useRef()

    const timeoutId = useRef()

    const navigate = useNavigate()


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

    const roleChangeHandler = () => {
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            if (roleRef.current.value.length < 1) {
                setError({
                    ...error,
                    roleError: 'Enter Your Role'
                })
            } else {
                setError({
                    ...error,
                    roleError: ''
                })
            }
        })
    }


    const signupHandler = async (event) => {
        event.preventDefault()

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: roleRef.current.value
        }


        if (user.email === '' && user.password === '' && user.role === '') {
            setError({
                emailError: 'Enter Your Email Id',
                passwordError: 'Enter Password',
                roleError: 'Select Role'
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

        if (user.role === '') {
            setError({
                ...error,
                roleError: 'Select Role'
            })
            return
        }



        if (error.emailError === '' && error.passwordError === '' && error.roleError === '') {

            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/signup`, user)
                alert(response.data.message)
                navigate('/login')

            } catch (error) {
                alert(error.response.data.message)
                if (error.response.data.message === 'User Already Existed') {
                    navigate('/login')
                }
            }


        }

    }

    return (
        <div className="w-full h-[100vh] grid grid-cols-2">
            {/* left */}
            <div className=" bg-red-800 h-full overflow-hidden hidden sm:block">

                <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            {/* right */}
            <div className="h-full flex items-center font-serif col-span-2 sm:col-span-1">

                <form action="#" className="grid grid-cols-4 w-11/12 lg:w-3/5 gap-3 mx-auto">

                    <h2 className="col-span-4 text-center ">Signup</h2>

                    <label htmlFor="emailId" className="flex items-center justify-between px-1">Email Id <span>:</span></label>
                    <input
                        ref={emailRef}
                        onChange={emailChangeHandler}
                        className="pl-2 col-span-3 border leading-8 focus:outline-none hover:outline-none focus:border-orange-100 hover:border-orange-100 focus:shadow-md" type="email" />
                    {error.emailError.length > 0 ? <p className="col-start-2 col-span-3 text-red-600">{error.emailError}</p> : ''}

                    <label htmlFor="emailId" className="flex justify-between items-center px-1">Password<span>:</span></label>
                    <input
                        ref={passwordRef}
                        onChange={passwordChangeHandler}
                        className="pl-2 col-span-3 border leading-8 focus:outline-none hover:outline-none focus:border-orange-100 hover:border-orange-100 focus:shadow-md" type="password" />
                    {error.passwordError.length > 0 ? <p className="col-start-2 col-span-3 text-red-600">{error.passwordError}</p> : ''}

                    <label htmlFor="" className="flex justify-between items-center px-1">Role <span>:</span> </label>
                    <select
                        ref={roleRef}
                        onChange={roleChangeHandler}
                        className="col-span-3 py-2 border focus:outline-none  focus:border-orange-100 hover:border-orange-100 focus:shadow-md" name="" id="">
                        <option value="">Select</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                    </select>
                    {error.roleError.length > 0 ? <p className="col-start-2 col-span-3 text-red-600">{error.roleError}</p> : ''}

                    <p className="col-span-4 text-right text-xs">Already have an account ? <Link className="text-blue-800" to='/Login'>Login</Link></p>


                    <button onClick={(event) => signupHandler(event)} className=" col-span-2  col-start-2 py-2 bg-green-400 rounded-md active:scale-90">Signup</button>

                </form>

            </div>
        </div>
    )
}