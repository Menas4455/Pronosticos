import { Route, Routes, BrowserRouter } from "react-router-dom"
import { IsAdmin } from "./pages/admin/login"
import { Home } from "./pages/home"
import { AdminProvider } from "./context/admin"
import { Protected } from "./protected"
import { Logout } from "./pages/admin/logout"
import { FormForecast } from "./pages/forecast/form.forecast"
import { ForecastProvider } from "./context/forecast"

function App() {

  return (

    <BrowserRouter>
        <AdminProvider>    
          <ForecastProvider>
          <Routes>
            
            <Route path="/login" element={<IsAdmin/>}/>
            <Route path="/" element={<Home/>}/>

            {/* rutas protegidas */}
            <Route element={<Protected/>}>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/add/forecast" element={<FormForecast/>}/>
            </Route>

            </Routes>
          </ForecastProvider>
        </AdminProvider>
    </BrowserRouter>

  )
}

export default App
