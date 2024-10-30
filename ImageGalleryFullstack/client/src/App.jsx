
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./components/pages/HomePage"
import { SignupPage } from "./components/pages/signupPage"
import { LoginPage } from "./components/pages/LoginPage"


function App() {

  return (

    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>

  )
}

export default App
