
import { useAuthContext } from "../../auth/useAuthContext";

function LoginPage() { 
    const {isLoggedIn} = useAuthContext();

    const handleLogin = () => {
        
    }

    const handleLogout = () => {
        
    }

    if(isLoggedIn){
        return (
            <>
                <div>You are logged IN!</div>
                <div onClick={handleLogout}>Logout</div>
            </>
        )
    }
    
    return (
        <>
            <div>You are logged OUT!</div>
            <div onClick={handleLogin}>Login</div>
        </>
    )
}

export default LoginPage
