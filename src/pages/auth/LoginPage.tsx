
import { useAuthContext } from "../../auth/useAuthContext";

function LoginPage() {
    const { isInitialized, logout, isLoggedIn, user, loginWithGoogle } = useAuthContext();

    if (!isInitialized) return <div>Loading...</div>

    return (
        <>
            {isLoggedIn &&
                <>
                    <div>You are logged IN as ({user.name}) !</div>
                    <div onClick={logout}>Logout</div>
                </>
            }

            {!isLoggedIn &&
                <>
                    <div>You are logged OUT!</div>
                    <div onClick={loginWithGoogle}>Google Login</div>
                </>
            }
        </>
    )
}

export default LoginPage
