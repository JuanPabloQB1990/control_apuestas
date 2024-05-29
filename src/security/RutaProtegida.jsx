import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Outlet, useNavigate } from 'react-router-dom'

const RutaProtegida = () => {

    const { userAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    
    useEffect(() => {
      if (userAuth === null) {
          return navigate("/login")
      }
      
    }, [navigate, userAuth]);

  return <Outlet/>
}

export default RutaProtegida
