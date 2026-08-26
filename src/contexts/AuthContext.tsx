import { createContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/Service"
import type UsuarioLogin from "../models/UsuarioLogin"
import { toast } from "react-toastify"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogin(usuarioLogin: UsuarioLogin): Promise<void>
    handleLogout(): void
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0, nome: '', usuario: '', senha: '', foto: '', dataNascimento: '', token: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login('/usuarios/logar', usuarioLogin, setUsuario)
            toast.success('Login realizado com sucesso!')
            navigate('/home')
        } catch (error) {
            toast.error('Os dados de usuário estão incorretos!')
        } finally {
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({ id: 0, nome: '', usuario: '', senha: '', foto: '', dataNascimento: '', token: '' })
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}