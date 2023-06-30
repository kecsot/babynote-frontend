
import { ReactNode, useEffect, useMemo, useState } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import { account } from "../api/appwrite";
import { UserType } from "../api/types";

export type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const loginSuccessCallbackUrl = import.meta.env.VITE_LOGIN_SUCCESS_CALLBACK || ''
    const loginFailedCallbackUrl = import.meta.env.VITE_APP_LOGIN_FAILED_CALLBACK || ''
    const [isInitialized, setInitialized] = useState<any>();
    const [user, setUser] = useState<UserType | null>();

    useEffect(() => {
        if (!isInitialized) {
            account.get().then((user) => {
                if (user) {
                    setUser(user)
                }
                setInitialized(true)
            })
                .catch(() => {
                    setInitialized(true)
                })
        }
    }, [])

    const loginWithGoogle = () => account.createOAuth2Session('google', 
    loginSuccessCallbackUrl, 
        loginFailedCallbackUrl)

    const logoutClient = () => setUser(null)

    const logout = () => account.deleteSessions().then(logoutClient)

    const value = useMemo(
        () => ({
            isLoggedIn: user != undefined,
            user: user,
            isInitialized: isInitialized,
            loginWithGoogle: loginWithGoogle,
            logout: logout
        } as AuthContextType), [user, loginWithGoogle, logout])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}