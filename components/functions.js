export const armarFecha = (fec) => {
  let fecha = new Date(fec);
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear().toString();

  return dia + "/" + mes + "/" + anio;
};
