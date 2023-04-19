import { Routes, Route } from "react-router-dom"

import Page404 from "pages/404"

import { routes } from "./routes"

const RouterSetup = () => {
  return (
    <Routes>
      {routes.map((routeProps) => (
        <Route {...routeProps} key={routeProps.path as string} />
      ))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default RouterSetup
