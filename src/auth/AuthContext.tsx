import { createContext } from "react"
import { UserType } from "../api/types";

export type AuthContextType = {
    isLoggedIn: boolean,
    user: UserType,
    isInitialized: boolean,
    loginWithGoogle: VoidFunction,
    logout: VoidFunction    
}

const AuthContext = createContext<AuthContextType | null>(null)
export default AuthContext;