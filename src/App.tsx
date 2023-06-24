import { RecoilRoot } from "recoil"
import TestPage from "./pages/auth/TestPage"

function App() {
  return (
    <>
      <RecoilRoot>
        <TestPage />
      </RecoilRoot>
    </>
  )
}

export default App
