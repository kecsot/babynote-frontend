import { RecoilRoot } from "recoil"
import TestPage from "./pages/auth/TestPage"
import { AuthProvider } from "./auth/AuthProvider"

function App() {
  return (
    <>
      <RecoilRoot>
        <AuthProvider>
          <TestPage />
        </AuthProvider>
      </RecoilRoot>
    </>
  )
}

export default App
