import { ToastContainer } from "react-toastify"
import Footer from "./components/common/Footer"
import Header from "./components/common/Header"
import MainRoutes from "./routes/MainRoutes"

function App() {

  return (
    <div className="min-h-screen flex flex-col">
    <Header />
    <ToastContainer />
    <MainRoutes />
    <Footer />
    </div>
  )
}

export default App
