import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyPDF";

const PDFButton = () => (
  <PDFDownloadLink document={<MyDocument />} fileName="tabla-de-datos.pdf">
    {({ blob, url, loading, error }) =>
      loading ? "Generando PDF..." : "Descargar PDF"
    }
  </PDFDownloadLink>
);

export default PDFButton;
