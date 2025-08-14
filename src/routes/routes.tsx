import { Route, Routes } from "react-router-dom"
import { pagesList } from "../hooks/paths"

const MainRoutes = () => {
  return (
    <div>
        <Routes>{pagesList.map((item) => <Route element={item.element} path={item.path} key={item.id} />)}</Routes>
    </div>
  )
}

export default MainRoutes