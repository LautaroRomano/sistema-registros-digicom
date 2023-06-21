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
    flexWrap: 'wrap',
    fontSize: 9,
    width: "100%",
  },
  dataContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
  },
  dataLabel: {
    marginRight: 4,
    fontSize: 10,
    color:'#000'
  },
  dataValue: {
    color:'#363636'
  },
});

// Componente que genera el PDF
const PDFGenerator = ({ data,servicios }) => {
  console.log('servicios: ',servicios)
  const labels = Object.keys(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.border}>
          <View style={styles.body}>
            <Text style={styles.title}>Información de los datos</Text>
            <View style={styles.dataBox}>
              {labels.map((key, i) => {
                return (
                  <View style={styles.dataContainer} key={i}>
                    <Text style={styles.dataLabel}>{key}:</Text>
                    <Text style={styles.dataValue}>{data[key]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
