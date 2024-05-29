import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ControlApuestas from "./pages/ControlApuestas"
import Registro from "./pages/Registro"
import Login from "./pages/Login"
import RutaProtegida from "./security/RutaProtegida"
import { useContext } from "react"
import { AuthContext } from "./context/AuthProvider"
import ModalCrearApuesta from "./components/ModalCrearApuesta"
import { ToastContainer } from "react-toastify"

function App() {

  const { userAuth } = useContext(AuthContext)
  console.log(userAuth);
  if (userAuth === false ) {
    return <h1>Cargando...</h1>
  }

  return (
    <>
      <BrowserRouter>
      { userAuth && <Navbar/> }
        <Routes>
          <Route path="/control-apuestas" element={<RutaProtegida />}>
            <Route index element={<ControlApuestas/>}/>

          </Route>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/login" element={<Login/>} index/>
        </Routes>
      </BrowserRouter>
      <ModalCrearApuesta/>
    </>
  )
}

export default App
