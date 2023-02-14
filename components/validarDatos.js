export const validarDatosCrearNuevoServicio = (datos) => {
  const fallas = [];
  fallas.push({
    error: "Debe agregar una fecha de servicio.",
    value: datos.fechaServicio.length > 0,
  });
  fallas.push({
    error: "Debe agregar una fecha de solucion.",
    value: datos.fechaSolucion.length > 0 || datos.solucionado === "0",
  });

  return fallas;
};
