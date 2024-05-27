import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    
    const { userAuth, loginUsuarios, errors, setEmail, setPassword, email, password} = useContext(AuthContext)

    useEffect(() => {
        if (userAuth) {
          navigate("/control-apuestas");
          
        }
      }, [userAuth, navigate]);

    const handleSubmit = async(e) => {
      e.preventDefault()

      await loginUsuarios()
      console.log(email ," ", password);
    }

    return (
        <div className="contenedor-formulario">
            <form onSubmit={handleSubmit}>
                <h1 className="text-center">Inicia Sesión</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className='d-flex justify-content-between align-items-end'>
                    <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                    <Link to="/registro">Aún no tienes cuenta? Registrate</Link>

                </div>
                {errors && <div className="alert alert-danger mt-3" role="alert">{errors}</div>}
            </form>
        </div>
      )
}

export default Login
