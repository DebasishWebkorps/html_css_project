import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectComponent = ({ children }) => {

    const navigate = useNavigate()

    const email = useSelector(state => state.user.email)

    useEffect(() => {

        if (!email) {
            return navigate('/login')
        }

    },[])

    if (!email) return null

    return (
        <>{children}</>
    )
}

