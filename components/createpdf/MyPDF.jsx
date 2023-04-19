import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Estilos CSS personalizados para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 50,
  },
  border: {
    borderWidth: 2,
    borderColor: "#000000",
    height: "100%",
  },
  body: {
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
    backgroundColor: "#ababab",
  },
  dataBox: {
    flexDirection: "row",
    fontSize: 9,
    width: "100%",
  },
  dataContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
  },
  dataLabel: {
    fontWeight: "800",
    marginRight: 10,
  },
  dataValue: {},
});

// Datos para el PDF
const data = {
  id: "1",
  set: " T_500.SET",
  numero: " 383801189-72088",
  idModbus: "180",
  placaRadioModem: " Modificada",
  programaRadioModem: " RM2RMX22.HEX",
  protegido: " SI",
  capacidad: "800",
  numeroCaja: " 85",
  nroSet: " XF",
};

// Componente que genera el PDF
const PDFGenerator = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.border}>
          <View style={styles.body}>
            <Text style={styles.title}>Información de los datos</Text>
            <View style={styles.dataBox}>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>SECCIONAMIENTO:</Text>
                <Text style={styles.dataValue}>S/N</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>DISTRIBUIDOR:</Text>
                <Text style={styles.dataValue}>BELGRANO</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>PIQUETE: </Text>
                <Text style={styles.dataValue}>S/N</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>NC: </Text>
                <Text style={styles.dataValue}>Rec Holmberg</Text>
              </View>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>ID:</Text>
              <Text style={styles.dataValue}>{data.id}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>SET:</Text>
              <Text style={styles.dataValue}>{data.set}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Número:</Text>
              <Text style={styles.dataValue}>{data.numero}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>ID MODBUS:</Text>
              <Text style={styles.dataValue}>{data.idModbus}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>PLACA RADIO MODEM:</Text>
              <Text style={styles.dataValue}>{data.placaRadioModem}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>PROGRAMA RADIO MODEM:</Text>
              <Text style={styles.dataValue}>{data.programaRadioModem}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>PROTEGIDO:</Text>
              <Text style={styles.dataValue}>{data.protegido}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>CAPACIDAD:</Text>
              <Text style={styles.dataValue}>{data.capacidad}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>NÚMERO CAJA:</Text>
              <Text style={styles.dataValue}>{data.numeroCaja}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>NRO SET:</Text>
              <Text style={styles.dataValue}>{data.nroSet}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
