import { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext can only be used inside AuthProvider");
    }
    return context;
};