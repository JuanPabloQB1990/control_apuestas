import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ApuestaContext } from "../context/ApuestaProvider";

const ModalAgregarLiga = () => {
  const { showModalLiga, setShowModalLiga, crearLiga, actualizarLigaFiltrada, editandoLiga, setEditandoLiga, editarLiga } = useContext(ApuestaContext);
  const [liga, setLiga] = useState("");

  useEffect(() => {
    if (editandoLiga) {
        setLiga(actualizarLigaFiltrada)
    }
  }, [editandoLiga, actualizarLigaFiltrada]);

  const handleCerrarModal = () => {
    setShowModalLiga(false);
    setLiga("")
    setEditandoLiga(false)
  };

  const handleAgregarLiga = (e) => {
    setLiga(e.target.value)
  };

  const agregarLiga = async() => {
    
    
    await crearLiga(liga).then( res => {
        handleCerrarModal()
    })
  }

  const submitEditarLiga = async() => {

    const ligaEditada = {
        id: actualizarLigaFiltrada.id,
        nombre: liga
    }

    await editarLiga(ligaEditada).then( res => {
        handleCerrarModal()
    })
  }
  
  
  return (
    <Modal
      size="lg"
      show={showModalLiga}
      onHide={handleCerrarModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Crear Liga</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="w-100">
            <div className="">
            <div className="form-floating">
                <input
                type="text"
                className="form-control"
                id="liga"
                placeholder="Ingrese liga"
                name="liga"
                onChange={handleAgregarLiga}
                value={liga.nombre}
                />
                <label htmlFor="liga">Liga</label>
            </div>
            </div>
        </form>

      </Modal.Body>
      <Modal.Footer>
      <button onClick={editandoLiga ? submitEditarLiga : agregarLiga} type="button" className="btn btn-primary">{editandoLiga ? "Editar" : "Agregar Liga"}</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAgregarLiga;
