import { useSelector } from "react-redux";

export const ProtectComponent = ({ children }) => {

    const email = useSelector(state => state.user.email)

    if (!email) return null

    return (
        <>{children}</>
    )
}

