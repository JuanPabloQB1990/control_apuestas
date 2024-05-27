export const colorResultado = (resultado) => {
  if (resultado === "Ganada") {
    return "text-success"
  }
  if (resultado === "Perdida") {
    return "text-danger"
  }
  if (resultado === "Nula" ) {
    return "text-info "
  }
  if (resultado === "Pendiente" ) {
    return "text-secondary "
  }
}
