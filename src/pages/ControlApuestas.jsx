import { useContext } from "react";
import Apuestas from "../components/Apuestas"
import { AuthContext } from "../context/AuthProvider";
import { ApuestaContext } from "../context/ApuestaProvider";


const ControlApuestas = () => {

    const { userAuth } = useContext(AuthContext)
    const { setShow } = useContext(ApuestaContext)

    const handleShow = () => setShow(true);
 
  return (
    <div>
      <div className="info-control">
        <div className="info info-1">Bank Inicial</div>
        <div className="info info-2">100.000 $</div>
        <div className="info info-3">Bank Actual</div>
        <div className="info info-4">150.000 $</div>
        <div className="info info-5">Stake 1</div>
        <div className="info info-6">1.000</div>
        <div className="info info-7">Yield</div>
        <div className="info info-8">50 %</div>
        <div className="info info-9">Total Picks</div>
        <div className="info info-10">15</div>
        <div className="info info-11">Ganados</div>
        <div className="info info-12">7</div>
        <div className="info info-13">% Acierto</div>
        <div className="info info-14">50 %</div>
        <div className="info info-15">Total Perdido</div>
        <div className="info info-16">20.000 $</div>
        <div className="info info-17">Perdidos</div>
        <div className="info info-18">3</div>
        <div className="info info-19"><button onClick={handleShow} type="button" className="btn btn-success text-light">Agregar Apuesta <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg></button></div>
        <div className="info info-20">Nulas</div>
        <div className="info info-21">2</div>
        <div className="info info-22">Cuota Media</div>
        <div className="info info-23">1.60</div>
        <div className="info info-24">Total Invertido</div>
        <div className="info info-25">105.000 $</div>
        <div className="info info-26">Ganancia Neta</div>
        <div className="info info-27">10.000 $</div>
      </div>
        <Apuestas/>
    </div>
  )
}

export default ControlApuestas
