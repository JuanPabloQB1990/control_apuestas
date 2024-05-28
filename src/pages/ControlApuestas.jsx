import { useCallback, useContext, useEffect, useState } from "react";
import Apuestas from "../components/Apuestas";
import { AuthContext } from "../context/AuthProvider";
import { ApuestaContext } from "../context/ApuestaProvider";
import { formatearGanancia } from "../helpers/formatearMoneda";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const ControlApuestas = () => {
  const { userData } = useContext(AuthContext);
  const { setShow, apuestasUsuario } = useContext(ApuestaContext);

  const [ganadas, setGanadas] = useState(0);
  const [perdidas, setPerdidas] = useState(0);
  const [nulas, setNulas] = useState(0);
  const [totalPerdido, setTotalPerdido] = useState(0);
  const [gananciaNeta, setGananciaNeta] = useState(0);
  const [totalInvertido, setTotalInvertido] = useState(0);
  const [promCuota, setPromCuota] = useState(0);

  const calculosCuenta = useCallback(() => {

    let gan = 0
    let per = 0
    let nul = 0
    let totPerdido = 0
    let gananciaNeta = 0
    let totInvertido = 0
    let totCuotas = 0

    apuestasUsuario.map(apuesta => {
      console.log(apuesta);
      if (apuesta.resultado === "Ganada") {
        gan = gan + 1
      }

      if (apuesta.resultado === "Perdida") {
        per = per + 1
        totPerdido = totPerdido + apuesta.inversion
      }

      if (apuesta.resultado === "Nula") {
        nul = nul + 1
      }

      gananciaNeta = gananciaNeta + apuesta.ganancia
      totInvertido = totInvertido + apuesta.inversion
      totCuotas = totCuotas + Number(apuesta.cuota)
      
    })

    setGanadas(gan);
    setPerdidas(per);
    setNulas(nul);
    setTotalPerdido(totPerdido);
    setGananciaNeta(gananciaNeta);
    setTotalInvertido(totInvertido);
    setPromCuota(totCuotas/apuestasUsuario.length);
    
  },[apuestasUsuario])
  
  useEffect(() => {
    calculosCuenta()
  }, [calculosCuenta]);

  console.log(apuestasUsuario);
  console.log(userData);

  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="info-control">
        <div className="info info-1">Bank Inicial</div>
        <div className="info info-2">{formatearGanancia(userData.bank_inicial)}</div>
        <div className="info info-3">Bank Actual</div>
        <div className="info info-4">{formatearGanancia(userData.bank_inicial + gananciaNeta)} $</div>
        <div className="info info-5">Stake 1</div>
        <div className="info info-6">{formatearGanancia((1*userData.bank_inicial)/100)}</div>
        <div className="info info-7">Yield</div>
        <div className="info info-8">{((gananciaNeta/totalInvertido)*100).toFixed(2)} %</div>
        <div className="info info-9">Total Picks</div>
        <div className="info info-10">{apuestasUsuario.length}</div>
        <div className="info info-11">Ganados</div>
        <div className="info info-12">{ganadas}</div>
        <div className="info info-13">% Acierto</div>
        <div className="info info-14">{(ganadas/apuestasUsuario.length*100).toFixed(2)} %</div>
        <div className="info info-15">Total Perdido</div>
        <div className="info info-16">{formatearGanancia(totalPerdido)}</div>
        <div className="info info-17">Perdidos</div>
        <div className="info info-18">{perdidas}</div>
        <div className="info info-19">
          <button
            onClick={handleShow}
            type="button"
            className="btn btn-success text-light"
          >
            Agregar Apuesta{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-plus"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </button>
        </div>
        <div className="info info-20">Nulas</div>
        <div className="info info-21">{nulas}</div>
        <div className="info info-22">Cuota Media</div>
        <div className="info info-23">{promCuota.toFixed(2)}</div>
        <div className="info info-24">Total Invertido</div>
        <div className="info info-25">{formatearGanancia(totalInvertido)}</div>
        <div className="info info-26">Ganancia Neta</div>
        <div className="info info-27">{formatearGanancia(gananciaNeta)}</div>
      </div>
      <Apuestas />
    </div>
  );
};

export default ControlApuestas;
