import { useContext, useEffect } from "react";
import { ApuestaContext } from "../context/ApuestaProvider";
import { formatearFecha } from "../helpers/formatearFecha";
import { formatearGanancia } from "../helpers/formatearMoneda";
import { colorResultado } from "../helpers/colorResultado";


const Apuestas = () => {
    
const { apuestasUsuario, seleccionEditarApuesta } = useContext(ApuestaContext)

const handleEditarApuesta = (apuesta) => {
  seleccionEditarApuesta(apuesta)
}

  return (
    <table className="tabla_apuestas">
      <thead>
        <tr key="">
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cuota</th>
            <th>Stake</th>
            <th>Inversion</th>
            <th>Resultado</th>
            <th>Ganancia</th>
            <th>Ver Apuesta</th>
        </tr>
      </thead>
      <tbody>
        {apuestasUsuario.map(apuesta => {
          return (
                  <tr key={apuesta.id} className="rows-data">
                    <td>{formatearFecha(apuesta.fecha)}</td>
                    <td>{apuesta.tipo}</td>
                    <td>{apuesta.cuota}</td>
                    <td>{apuesta.stake}</td>
                    <td>{formatearGanancia(apuesta.inversion)}</td>
                    <td className={`fw-bolder ${colorResultado(apuesta.resultado)}`}>{apuesta.resultado}</td>
                    <td>{formatearGanancia(apuesta.ganancia)}</td>
                    <td style={{width: 53}}>
                      <button type="button" className="btn btn-info my-2" onClick={() => handleEditarApuesta(apuesta)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-zoom-in" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M7 10l6 0" />
                        <path d="M10 7l0 6" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                      </button>
                    </td>
                  </tr>

        )})}
      </tbody>
    </table>
  )
}

export default Apuestas
