import { useContext } from 'react'
import { ApuestaContext } from '../context/ApuestaProvider'

const Ligas = () => {

    const { ligas, setShowModalLiga, seleccionEditarLiga } = useContext(ApuestaContext)

    const handleModalAgregarLiga = () => {
        setShowModalLiga(true)
    }

    const handleModalEditarLiga = (liga) => {
        seleccionEditarLiga(liga)
    }
    
    return (
    <div className='ligas'>
    <button onClick={handleModalAgregarLiga} type="button" className="btn btn-success">Agregar Liga</button>
      <ol>
        {ligas.map((l) => (
          <li key={l.id} className='my-4'>
            {l.nombre}
            <button onClick={() => handleModalEditarLiga(l)} type="button" className="btn btn-warning mx-4">editar</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Ligas
