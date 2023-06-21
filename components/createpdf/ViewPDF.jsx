import MyPDF from "../../components/createpdf/MyPDF";
import { PDFViewer } from "@react-pdf/renderer";
const PDF = ({data,servicios}) => {
  return (
    <PDFViewer style={{ width: "100vw", height: "100vh" }}>
      <MyPDF data={data} servicios={servicios}></MyPDF>
    </PDFViewer>
  );
};

export default PDF;
