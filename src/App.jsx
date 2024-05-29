import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ControlApuestas from "./pages/ControlApuestas"
import Registro from "./pages/Registro"
import Login from "./pages/Login"
import RutaProtegida from "./security/RutaProtegida"
import { useContext } from "react"
import { AuthContext } from "./context/AuthProvider"
import ModalCrearApuesta from "./components/ModalCrearApuesta"

function App() {

  const { userAuth } = useContext(AuthContext)
  
  if (userAuth === false ) {
    return <h1>Cargando...</h1>
  }

  return (
    <>
      <BrowserRouter>
      { userAuth && <Navbar/> }
        <Routes>
          <Route path="/" element={<RutaProtegida />}>
            <Route index element={<ControlApuestas/>}/>

          </Route>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <ModalCrearApuesta/>
    </>
  )
}

export default App
