import MyPDF from "../../components/createpdf/MyPDF";
import { PDFViewer } from "@react-pdf/renderer";
import { Flex } from "@chakra-ui/react";
const PDF = () => {
  return (
    <PDFViewer style={{ width: "100vw", height: "100vh" }}>
      <MyPDF></MyPDF>
    </PDFViewer>
  );
};

export default PDF;
