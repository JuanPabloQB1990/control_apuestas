import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import { ApuestaContext } from "../context/ApuestaProvider";

const ModalAgregarMercado = () => {

const { showModalMercado, setShowModalMercado, crearMercado, editandoMercado, setEditandoMercado, actualizarMercadoFiltrado, editarMercado } = useContext(ApuestaContext);

const [mercado, setMercado] = useState("");
useEffect(() => {
    if (editandoMercado) {
        setMercado(actualizarMercadoFiltrado)
    }
  }, [editandoMercado, actualizarMercadoFiltrado]);

const handleCerrarModal = () => {
    setShowModalMercado(false)
    setEditandoMercado(false)
    setMercado("")
}

const handleAgregarMercado = (e) => {
  setMercado(e.target.value)
}

const agregarMercado = async() => {
    await crearMercado(mercado).then(() => handleCerrarModal())
}

const submitEditarMercado = async() => {
    const mercadoEditado = {
        id: actualizarMercadoFiltrado.id,
        nombre_mercado: mercado
    }

    await editarMercado(mercadoEditado).then(() => {
        handleCerrarModal()
    })
}


  return (
    <Modal
      size="lg"
      show={showModalMercado}
      onHide={handleCerrarModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{editandoMercado ? "Editar Mercado" : "Crear Mercado"}</Modal.Title>
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
                onChange={handleAgregarMercado}
                value={mercado.nombre_mercado}
                />
                {!editandoMercado || mercado === "" && <label htmlFor="liga">Ingrese Mercado</label>}
                
            </div>
            </div>
        </form>

      </Modal.Body>
      <Modal.Footer>
      <button onClick={editandoMercado ? submitEditarMercado : agregarMercado} type="button" className="btn btn-primary">{editandoMercado ? "Editar" : "Agregar Mercado"}</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAgregarMercado
