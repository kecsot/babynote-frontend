import { RecoilRoot } from "recoil"
import { AuthProvider } from "./auth/AuthProvider"
import ExamplePage from "./pages/auth/ExamplePage"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallbackPage from "./pages/ErrorFallbackPage"

function App() {

  const handleOnError = (error: Error, info: {componentStack: string;}) => {
      // TODO: log error
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage} onError={handleOnError}>
      <RecoilRoot>
        <AuthProvider>
          <ExamplePage />
        </AuthProvider>
      </RecoilRoot>
    </ErrorBoundary>
  )
}

export default App
