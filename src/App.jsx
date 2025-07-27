import { BrowserRouter } from "react-router-dom"
import Feedback from "./components/Feedback"
import { ShopProvider } from "./context/ShopContext"
import { Toaster } from "react-hot-toast"
import ErrorBoundary from "./components/ErrorBoundary"


function App() {

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <ShopProvider>
            <Feedback />
          </ShopProvider>
        </ErrorBoundary>
      </BrowserRouter>

      <Toaster
        gutter={12}
        containerStyle={{
          width: '100%',
          top: '35%',
          left: '50%',
          translate: '-50% -50%'
        }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '1rem',
            width: 'fit-content',
            padding: '8px 24px',
            backgroundColor: 'white',
            color: 'var(--color-grey-700)'
          }
        }}
      />
    </>
  )
}

export default App
