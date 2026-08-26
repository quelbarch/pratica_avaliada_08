import { useContext, type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

interface ProtectedRouteProps {
    children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { usuario } = useContext(AuthContext)

    if (usuario.token === '') {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute