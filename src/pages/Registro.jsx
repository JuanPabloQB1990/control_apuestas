import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {

    const navigate = useNavigate();
    
    const { registroUsuario, errors, message, setMessage, setEmail, setName, setPassword, email, name, password} = useContext(AuthContext)

    useEffect(() => {
      if (message) {
        navigate("/control-apuestas");
      }
    }, [message, navigate]);

    const handleSubmit = async(e) => {
      e.preventDefault()

      await registroUsuario()
      
      setTimeout(() => {
        setMessage("")
      }, 5000);
      
    }
    
  return (
    <div className="contenedor-formulario">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Registro</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp"/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className='d-flex justify-content-between align-items-end'>
              <button type="submit" className="btn btn-primary">Registrar</button>
              {message && <div className="alert alert-success mt-3" role="alert">{message}</div>}
              <Link to="/login">Ya tienes cuenta? Inicia Sesion</Link>

            </div>
              {errors && <div className="alert alert-danger mt-3" role="alert">{errors}</div>}
        </form>
    </div>
  )
}

export default Registro
