import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const ProtectComponent = ({ children }) => {

    const adminDashboard = useLocation().pathname === '/admin/login'

    const email = useSelector(state => state.user.email)
    const role = useSelector(state => state.user.role)

    const navigate = useNavigate()

    if (!email) return null

    if (adminDashboard) {
        if (role !== 'admin') return navigate('/admin/login')
    }

    return (
        <>{children}</>
    )
}

