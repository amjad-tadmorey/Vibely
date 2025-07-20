import { BrowserRouter } from "react-router-dom"
import Feedback from "./components/Feedback"
import { ShopProvider } from "./context/ShopContext"


function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Feedback />
      </ShopProvider>
    </BrowserRouter>
  )
}

export default App
