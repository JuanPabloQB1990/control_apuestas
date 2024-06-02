import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

const Navbar = () => {

  const { cerrarSesion } = useContext(AuthContext)
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink  className="navbar-brand" to="/">Apuestas</NavLink >
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink  className="nav-link active" aria-current="page" href="#">Home</NavLink >
              </li>
              <li className="nav-item">
                <NavLink  className="nav-link" to="/ligas">Ligas</NavLink >
              </li>
              <li className="nav-item dropdown">
                <NavLink  className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </NavLink >
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><NavLink  className="dropdown-item" href="#">Action</NavLink ></li>
                  <li><NavLink  className="dropdown-item" href="#">Another action</NavLink ></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li><NavLink  className="dropdown-item" href="#">Something else here</NavLink ></li>
                </ul>
              </li>
            </ul>
            
              <button onClick={cerrarSesion} type="button" className="btn btn-danger mt-3">Cerrar Sesion</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
