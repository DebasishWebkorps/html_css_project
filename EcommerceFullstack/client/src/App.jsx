import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { MenuBar } from './components/MenuBar'
import { HeroBar } from './components/HeroBar'
import { LoginComponent } from './components/LoginComponent'
import { SignupComponent } from './components/SignupComponent'
import { Footer } from './components/Footer'
import { CartComponent } from './components/CartComponent'
import { OrderComponent } from './components/OrderComponent'
import { toast, ToastContainer } from 'react-toastify'
import { ProductComponent } from './components/ProductComponent'
import { SingleProductComponent } from './components/SingleProductComponent'
import 'react-toastify/dist/ReactToastify.css';
import { HomeProduct } from './components/HomeProduct'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from './store/userSlice'
import { ProtectComponent } from './components/ProtectComponent'


function App() {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const verifyToken = async () => {
    try {
      const userToken = localStorage.getItem('userToken')

      if (!userToken) throw new Error('Token Missing')

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}auth/verifytoken`,
        {},
        {
          headers: {
            userToken: userToken
          },
        }
      );
      dispatch(setUser(response.data.email))

    } catch (error) {

      if (error.message !== 'Token Missing') {
        toast.error(error.message)
      }
      navigate('/login')
    }
  }

  useEffect(() => {
    verifyToken()
  }, [])


  return (
    <>
      <Navbar />

      {/* {location.pathname === '/' && <MenuBar />}
      {location.pathname === '/cart' && <MenuBar />}
      {location.pathname === '/orders' && <MenuBar />} */}

      {
        (location.pathname !== '/login' &&
          location.pathname !== '/signup') && <MenuBar />
      }

      <Routes>
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/signup' element={<SignupComponent />} />

        <Route path='/cart' element={
          <ProtectComponent>
            <CartComponent />
          </ProtectComponent>
        } />

        <Route path='/orders' element={
          <ProtectComponent>
            <OrderComponent />
          </ProtectComponent>
        } />

        {/* <Route path='/cart' element={<CartComponent />} /> */}
        {/* <Route path='/orders' element={<OrderComponent />} /> */}
        <Route path='/products' element={<ProductComponent />} />
        <Route path='/:category' element={<ProductComponent />} />
        <Route path='/products/:productId' element={<SingleProductComponent />} />
        <Route path='/' element={<><HeroBar /><HomeProduct /></>} />
      </Routes>

      <ToastContainer
        position='bottom-right'
        autoClose='2000'
      />
      <Footer />

    </>
  )
}

export default App
