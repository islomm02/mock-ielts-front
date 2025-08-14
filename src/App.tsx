import { useNavigate } from "react-router-dom"
import MainRoutes from "./routes/routes"
import { useEffect } from "react"

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/tests")
  },[])
  return (
   <div>
    <MainRoutes/>
   </div>
  )
}

export default App
