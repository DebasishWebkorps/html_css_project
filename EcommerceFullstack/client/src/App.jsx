import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { MenuBar } from './components/MenuBar'
import { HeroBar } from './components/HeroBar'
import { LoginComponent } from './components/LoginComponent'
import { SignupComponent } from './components/SignupComponent'
import { Footer } from './components/Footer'
import { CartComponent } from './components/CartComponent'
import { OrderComponent } from './components/OrderComponent'
import { ToastContainer } from 'react-toastify'
import { ProductComponent } from './components/ProductComponent'
import { SingleProductComponent } from './components/SingleProductComponent'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const location = useLocation()


  return (
    <>
      <Navbar />
      {location.pathname.startsWith === '/products' && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/cart'
        && location.pathname !== '/orders' && (<MenuBar />)}
      <Routes>
        <Route path='/products/:productname' element={<SingleProductComponent />} />
        <Route path='/login' element={<><LoginComponent /></>} />
        <Route path='/signup' element={<SignupComponent />} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/orders' element={<OrderComponent />} />
        <Route path='/products' element={<ProductComponent />} />
        <Route path='/' element={<HeroBar />} />
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
