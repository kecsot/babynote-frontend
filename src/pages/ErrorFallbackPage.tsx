type Props = {
    error: Error,
    resetErrorBoundary: () => void
}

function ErrorFallbackPage({ error, resetErrorBoundary }: Props) {
  
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <span>{error.message}</span>
        <button onClick={resetErrorBoundary}>{error.message}</button>
      </div>
    );
  }

export default ErrorFallbackPage;