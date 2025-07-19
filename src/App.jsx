import { BrowserRouter } from "react-router-dom"
import Feedback from "./components/Feedback"
import { ShopProvider } from "./context/ShopContext"
import { LoadingProvider } from "./context/LoadingContext"


function App() {

  return (
    <BrowserRouter>
      <ShopProvider>
        <LoadingProvider>
          <Feedback />
        </LoadingProvider>
      </ShopProvider>
    </BrowserRouter>
  )
}

export default App
