import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ApuestaContext } from "../context/ApuestaProvider";
import { AuthContext } from "../context/AuthProvider";
import { formatearGanancia } from "../helpers/formatearMoneda";

const ModalCrearApuesta = () => {
  const { mercados, ligas, show, setShow, crearApuesta, actualizarApuestaFiltrada, editarApuesta, editandoApuesta, setEditandoApuesta, eliminarApuestaDB } = useContext(ApuestaContext);
  const { userData } = useContext(AuthContext);
  
  const [showLinea, setShowLinea] = useState(false);
  const [apuesta, setApuesta] = useState({});
  const [lineas, setLineas] = useState([]);
  const [stake, setStake] = useState("");
  const [editing, setEditing] = useState(false);
  const [mensaje, setMensaje] = useState("");
  
  const [linea, setLinea] = useState({
    liga: "",
    local: "",
    visitante: "",
    mercado: "",
    cuota: "",
    resultado: "",
  });

  useEffect(() => {
    
    if (editandoApuesta) {
      setLineas(actualizarApuestaFiltrada.lineas)
      setApuesta(actualizarApuestaFiltrada)
      setStake(actualizarApuestaFiltrada.stake)
    }

  }, [actualizarApuestaFiltrada, editandoApuesta]);

  const handleClose = () => {
    setShow(false);
    setLineas([]);
    setShowLinea(false);
    setApuesta({})
    setStake("")
    setEditandoApuesta(false)
  };

  const handleLinea = () => setShowLinea(true);

  const handleAgregarLinea = (e) => {
    setLinea({
      ...linea,
      [e.target.name]: e.target.value,
    });
  };

  const handleStake = (e) => {
   
    setStake(e.target.value)

  }

  useEffect(() => {
    
    if (!editandoApuesta) {
      let cuotas = []
  
      lineas.map((linea) => {
        if (linea.resultado !== "Nula") {
          cuotas.push(linea.cuota)
        }
      })
      
      const totalCuota = cuotas.reduce((acum, value) => {
        return acum * value;
      }, 1);
    
      let res = [];
    
      lineas.map((linea) => {
        res.push(linea.resultado);
      });
    
      let resultado;
    
      if (res.includes("Pendiente")) {
        resultado = "Pendiente";
      } else if (res.includes("Ganada") && res.includes("Nula")) {
        resultado = "Ganada";
      }else if (res.includes("Nula")){
        resultado = "Nula";
      } else if (res.every(r => r === "Ganada")) {
        resultado = "Ganada";
      } else if (res.includes("Perdida")) {
        resultado = "Perdida";
      }

      setApuesta({...apuesta,
        id: editandoApuesta ? apuesta.id : Date.now(),
        fecha: editandoApuesta ? apuesta.fecha : Date.now(),
        cuota: totalCuota.toFixed(2),
        stake: stake,
        inversion: (stake * (1 * userData.bank_inicial)) / 100,
        tipo: lineas.length > 1 ? "Combinada" : "Simple",
        resultado: resultado,
        ganancia: resultado === "Ganada" || resultado === "Pendiente" ? Math.round(((stake * (1 * userData.bank_inicial)) / 100) * totalCuota.toFixed(2)-(stake * (1 * userData.bank_inicial)) / 100) : resultado === "Nula" ? 0 : 0 - (stake * (1 * userData.bank_inicial)) / 100,
        lineas: lineas,
        id_usuario: userData.uid
      });
      
    }

  }, [stake]);

  const agregarLinea = () => {
    setLineas([...lineas, { ...linea, id: Date.now()}]);
    
    setLinea({
      liga: "",
      local: "",
      visitante: "",
      mercado: "",
      cuota: 0,
      resultado: "",
    });

    setShowLinea(false);
  };

  const cargarApuesta = () => {
    if (stake === "") {
      setMensaje("el stake es obligatorio")
    }
    let cuotas = []
    
    if (lineas.every(linea => { return linea.resultado === "Nula"})) {
      lineas.map(linea => {
        cuotas.push(linea.cuota)
      })
    }else{
      lineas.map((linea) => {
        if (linea.resultado !== "Nula") {
          cuotas.push(linea.cuota)
        }
        
      })
    }
    const totalCuota = cuotas.reduce((acum, value) => {
      return acum * value;
    }, 1);
  
    let res = [];
  
    lineas.map((linea) => {
      res.push(linea.resultado);
    });
   
    let resultado;
  
    if (res.includes("Pendiente")) {
      resultado = "Pendiente";
    } else if (res.includes("Ganada") && res.includes("Nula")) {
      resultado = "Ganada";
    }else if (res.includes("Nula")){
      resultado = "Nula";
    }else if (res.every(r => r === "Ganada")){
      resultado = "Ganada";
    } else if (res.includes("Perdida")) {
      resultado = "Perdida";
    }

    setApuesta({...apuesta,
      id: editandoApuesta ? apuesta.id : Date.now(),
      fecha: editandoApuesta ? apuesta.fecha : Date.now(),
      cuota: totalCuota.toFixed(2),
      stake: stake,
      inversion: (stake * (1 * userData.bank_inicial)) / 100,
      tipo: lineas.length > 1 ? "Combinada" : "Simple",
      resultado: resultado,
      ganancia: resultado === "Ganada" || resultado === "Pendiente" ? Math.round(((stake * (1 * userData.bank_inicial)) / 100) * totalCuota.toFixed(2)-(stake * (1 * userData.bank_inicial)) / 100) : resultado === "Nula" ? 0 : 0 - (stake * (1 * userData.bank_inicial)) / 100,
      lineas: lineas,
      id_usuario: userData.uid
    });
  }
  

  const guardarApuesta = () => {
    
    crearApuesta(apuesta)

    handleClose();
  };

  const actualizarApuesta = () => {
    
    editarApuesta(apuesta)
    handleClose();
  }
  
  const eliminarApuesta = (id) => {
    const respuesta = window.confirm('seguro deseas eliminar esta apuesta?')
    if (respuesta) {
      eliminarApuestaDB(id)
      handleClose();
    }
  }
  

  const eliminarLinea = (id) => {
    const lineasFiltradas = lineas.filter(linea => linea.id !== id)
    setLineas(lineasFiltradas)
  }
  
  const handleEditarLinea = (id) => {
    handleLinea()
    setEditing(true)
    const lineaFiltrada = lineas.filter(linea => linea.id === id)
    setLinea(lineaFiltrada[0])
  }

  const editarLinea = (id) => {
    const lineasEditadas = lineas.map(lineaActual => lineaActual.id === id ? linea : lineaActual)
    setLineas(lineasEditadas)
    setShowLinea(false)
    setLinea({
      liga: "",
      local: "",
      visitante: "",
      mercado: "",
      cuota: 0,
      resultado: "",
    });

    setEditing(false)

  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Crear Apuesta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="w-100">
          {lineas?.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Competicion</th>
                  <th scope="col">Local</th>
                  <th scope="col">Visitante</th>
                  <th scope="col">Mercado</th>
                  <th scope="col">Cuota</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {lineas.map((linea) => {
                  return (
                    <tr key={linea.id}>
                      <td>{linea.liga}</td>
                      <td>{linea.local}</td>
                      <td>{linea.visitante}</td>
                      <td>{linea.mercado}</td>
                      <td>{linea.cuota}</td>
                      <td>{linea.resultado}</td>
                      <td>
                        <button type="button" className="btn btn-warning" onClick={() => handleEditarLinea(linea.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-edit"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="#2c3e50"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                          </svg>
                        </button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-danger" onClick={() => eliminarLinea(linea.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-trash"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="#2c3e50"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              id="stake"
              placeholder="Ingresa el stake"
              name="stake"
              onChange={handleStake}
              value={stake}
            />
            <label htmlFor="stake" className={`${mensaje && !stake ? "text-danger" : ""}`}>{mensaje && !stake ? mensaje : "Stake"}</label>
          </div>
          <section className="row text-center my-3 mx-0">
            <div className="col">
              <h5>Cuota</h5>
              {apuesta.cuota}
            </div>
            <div className="col">
              <h5>Inversion</h5>
              {formatearGanancia(apuesta.inversion)}
            </div>
            <div className="col">
              <h5>Resultado</h5>
              {apuesta.resultado}
            </div>
            <div className="col">
              <h5>Tipo</h5>
              {apuesta.tipo}
            </div>
            <div className={`col border  rounded ${apuesta.ganancia > 0 ? "text-success border-success" : "text-danger border-danger"}`}>
              <h5>Ganancia</h5>
              {formatearGanancia(apuesta.ganancia)}
            </div>
          </section>
          <button
            onClick={handleLinea}
            type="button"
            className="btn btn-success mb-2"
          >
            Agregar linea
          </button>
          <section
            className={`${showLinea ? "formLineaVisible" : "formLineaHidden"}`}
          >
            <div className="form-floating mb-2">
              <select className="form-select py-2" aria-label="Default select example" name="liga" value={linea.liga} onChange={handleAgregarLinea}>
                  <option selected>Selecciona una liga</option>
                  {ligas.map(liga => {
                    return <option key={liga.id} selected={editandoApuesta ? liga.nombre === linea.liga? true : false : null} value={liga.nombre}>{liga.nombre}</option>
                  })}
              </select>
            </div>
            <div className="row g-2 mb-2">
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="local"
                    placeholder="Ingrese equipo local"
                    name="local"
                    onChange={handleAgregarLinea}
                    value={linea.local}
                  />
                  <label htmlFor="local">Local</label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="visitante"
                    placeholder="Ingrese equipo visitante"
                    name="visitante"
                    onChange={handleAgregarLinea}
                    value={linea.visitante}
                  />
                  <label htmlFor="visitante">Visitante</label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-2">
              <div className="form-floating mb-2">
                <select className="form-select" aria-label="Default select example" name="mercado" value={linea.mercado} onChange={handleAgregarLinea}>
                  <option selected>Selecciona un mercado</option>
                  {mercados.map(mercado => {
                    return <option key={mercado.id} selected={editandoApuesta ? mercado.nombre_mercado === linea.mercado ? true : false : null} value={mercado.nombre_mercado}>{mercado.nombre_mercado}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="form-floating mb-2">
              <input
                type="number"
                className="form-control"
                id="cuota"
                placeholder="Ingresa la cuota"
                name="cuota"
                onChange={handleAgregarLinea}
                value={linea.cuota}
              />
              <label htmlFor="cuota">Cuota</label>
            </div>
            <select
              className="form-select mb-2"
              aria-label="Default select example"
              name="resultado"
              onChange={handleAgregarLinea}
              value={linea.resultado}
            >
              <option defaultValue="Pendiente">Selecciona resultado</option>
              <option value="Ganada">Ganada</option>
              <option value="Perdida">Perdida</option>
              <option value="Nula">Nula</option>
              <option value="Pendiente">Pendiente</option>
            </select>
            <div>
              
              <button
                onClick={editing ? () => editarLinea(linea.id) : agregarLinea}
                type="button"
                className="btn btn-primary"
              >
                {editing ? "Editar" : "Agregar"}
              </button>
              <Button variant="secondary" className="mx-2" onClick={() => setShowLinea(false)}>
                Cerrar
              </Button>
            </div>
          </section>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="secondary" className="mx-2" onClick={() => cargarApuesta()}>
                Cargar
        </Button>
        <Button variant="primary" onClick={editandoApuesta ? actualizarApuesta : guardarApuesta}>
          {editandoApuesta ? "Editar" : "Crear Apuesta"}
        </Button>
        <Button variant="danger" className="mx-2" onClick={() => eliminarApuesta(apuesta.id)}>
                Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrearApuesta;
