
import { ReactNode } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";

export type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

    const value = {
        isLoggedIn: true
    } as AuthContextType

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}