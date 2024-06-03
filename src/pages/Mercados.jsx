import { useContext } from "react"
import { ApuestaContext } from "../context/ApuestaProvider"

const Mercados = () => {

    const { mercados, setShowModalMercado, seleccionEditarMercado } = useContext(ApuestaContext)

    const handleModalAgregarMercado = () => {
        setShowModalMercado(true)
    }

    const handleModalEditarMercado = (mercado) => {
        seleccionEditarMercado(mercado)
    }


  return (
    <div className='ligas'>
    <button onClick={handleModalAgregarMercado} type="button" className="btn btn-success">Agregar Mercado</button>
      <ol>
        {mercados.map((m) => (
          <li key={m.id} className='my-4'>
            {m.nombre_mercado}
            <button onClick={() => handleModalEditarMercado(m)} type="button" className="btn btn-warning mx-4">editar</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Mercados
