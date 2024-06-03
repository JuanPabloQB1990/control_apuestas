import { useCallback, useContext, useEffect, useState } from "react";
import Apuestas from "../components/Apuestas";
import { AuthContext } from "../context/AuthProvider";
import { ApuestaContext } from "../context/ApuestaProvider";
import { formatearGanancia } from "../helpers/formatearMoneda";

const ControlApuestas = () => {
  const { userData } = useContext(AuthContext);
  const { setShow, apuestasUsuario, mercados, obtenerApuestas } = useContext(ApuestaContext);

  const [ganadas, setGanadas] = useState(0);
  const [perdidas, setPerdidas] = useState(0);
  const [nulas, setNulas] = useState(0);
  const [totalPerdido, setTotalPerdido] = useState(0);
  const [gananciaNeta, setGananciaNeta] = useState(0);
  const [totalInvertido, setTotalInvertido] = useState(0);
  const [promCuota, setPromCuota] = useState(0);
  const [totalApuestas, setTotalApuestas] = useState(0);

  const calculosCuenta = useCallback(() => {

    let gan = 0
    let per = 0
    let nul = 0
    let totPerdido = 0
    let gananciaNeta = 0
    let totInvertido = 0
    let totCuotas = 0
    let totApuestas = 0

    apuestasUsuario.map(apuesta => {
      
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

      if (apuesta.resultado !== "Pendiente") {
        gananciaNeta = gananciaNeta + apuesta.ganancia
        totInvertido = totInvertido + apuesta.inversion
        totApuestas = totApuestas + 1
      }

      totCuotas = totCuotas + Number(apuesta.cuota)
      
    })

    setGanadas(gan);
    setPerdidas(per);
    setNulas(nul);
    setTotalPerdido(totPerdido);
    setGananciaNeta(gananciaNeta);
    setTotalInvertido(totInvertido);
    setPromCuota(totCuotas/apuestasUsuario.length);
    setTotalApuestas(totApuestas)
    
  },[apuestasUsuario])
  
  useEffect(() => {
    calculosCuenta()
  }, [calculosCuenta]);

  const handleShow = () => setShow(true);

  const handleSeleccionMercado = (e) => {
    obtenerApuestas(e.target.value)
  }
 
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
        <div className={`info info-8 ${((gananciaNeta/totalInvertido)*100).toFixed(2) > 0 ? "texto-verde" : "texto-rojo"}`}>{((gananciaNeta/totalInvertido)*100).toFixed(2)} %</div>
        <div className="info info-9">Total Picks</div>
        <div className="info info-10">{apuestasUsuario.length}</div>
        <div className="info info-11">Ganados</div>
        <div className="info info-12">{ganadas}</div>
        <div className="info info-13">% Acierto</div>
        <div className={`info info-14 ${(ganadas/totalApuestas*100).toFixed(2) > 0 ? "texto-verde" : "texto-rojo"}`}>{(ganadas/totalApuestas*100).toFixed(2)} %</div>
        <div className="info info-15">Perdido</div>
        <div className="info info-16">{formatearGanancia(totalPerdido)}</div>
        <div className="info info-17">Perdidos</div>
        <div className="info info-18">{perdidas}</div>
        <div className="info info-19">
          <button
            onClick={handleShow}
            type="button"
            className="btn btn-success text-light fs-6 mx-4"
          >
            Agregar Apuesta{" "}
            
          </button>
          <select className="form-select mx-4" aria-label="Default select example" name="mercado" defaultValue="todos" onChange={handleSeleccionMercado}>
            <option selected>Todos los mercados</option>
              {mercados.map(mercado => {
                return <option key={mercado.id} value={mercado.nombre_mercado}>{mercado.nombre_mercado}</option>
              })}
          </select>
        </div>
        <div className="info info-20">Nulas</div>
        <div className="info info-21">{nulas}</div>
        <div className="info info-22">Cuota</div>
        <div className="info info-23">{promCuota.toFixed(2)}</div>
        <div className="info info-24">Invertido</div>
        <div className="info info-25">{formatearGanancia(totalInvertido)}</div>
        <div className="info info-26">Ganancia</div>
        <div className={`info info-27 ${formatearGanancia(gananciaNeta) > 0 ? "texto-verde" : "texto-rojo"}`}>{formatearGanancia(gananciaNeta)}</div>
      </div>
      <Apuestas />
    </div>
  );
};

export default ControlApuestas;
