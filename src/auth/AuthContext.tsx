import { createContext } from "react"

export type AuthContextType = {
    isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)
export default AuthContext;