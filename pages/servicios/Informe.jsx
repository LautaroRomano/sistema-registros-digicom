import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import Chart from "chart.js/auto";

let CanvasGenerados = []

const Informe = ({ fields, columns, config, handleViewInforme }) => {
    const chartRefEquipos = useRef();
    const chartRefTipoProblema = useRef();
    const chartRefTipoSolucion = useRef();

    useEffect(() => {
        if (fields && fields.length > 0) {
            deleteCanvas();
            initChartEquipos(chartRefEquipos, 'equipo', 'Equipos', 'bar')
            initChartEquipos(chartRefTipoProblema, 'tipoProblema', 'Tipo de problema', 'bar')
        }
    }, []);

    const deleteCanvas = (ref, id) => {
        for (const element of CanvasGenerados) {
            element.destroy()
        };
    }

    const initChartEquipos = (ref, key, label, type = 'bar') => {
        const items = fields.map((item) => item[key]).filter(item => item !== undefined).map(item => item === null ? 'No definido' : item)
        const counts = items.reduce((acc, val) => {
            if (Array.isArray(val)) {
                for (const v of val) {
                    acc[v] = (acc[v] || 0) + 1;
                }
            } else {
                acc[val] = (acc[val] || 0) + 1;
            }
            return acc;
        }, {});

        const ctx = ref.current.getContext("2d");
        const newChart = new Chart(ctx, {
            type: type,
            data: {
                labels: Object.keys(counts),
                datasets: [
                    {
                        label: label,
                        data: Object.values(counts),
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1,
                    },
                },
            },
        });
        CanvasGenerados.push(newChart)
    }

    return (
        <Flex w={"100vw"} h={"100vh"} top={0} left={0} bg={"#0005"} zIndex={9999} position={"absolute"} align={"center"} justify={"center"}>
            <Flex w={"90%"} h={"95%"} bg={"#FFF"} borderRadius={"10px"} position={"relative"} p={'50px'}>
                <Flex position={"absolute"} h={"50px"} bg={"#0001"} w={"100%"} bottom={0} left={0} justifyContent={"end"} align={"center"}>
                    <Button colorScheme="blue" size={"sm"} onClick={handleViewInforme} me={"50px"}>
                        Cerrar
                    </Button>
                </Flex>
                <Flex w={'50%'} h={300}>
                    <canvas id={"informe-chart-equipos"} ref={chartRefEquipos}></canvas>
                </Flex>
                <Flex w={'50%'} h={300}>
                    <canvas id={"informe-chart-tipoProblema"} ref={chartRefTipoProblema}></canvas>
                </Flex>
                <Flex w={'50%'} h={300}>
                    <canvas id={"informe-chart-tipoSolucion"} ref={chartRefTipoSolucion}></canvas>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Informe;
