import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Select, Button, Input, Switch } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import { destroy } from 'chart.js/auto';

let CanvasGenerados = []
const chartEquiposID = 'informe-chart-equipos'
const chartTipoProblemaID = 'informe-chart-tipoProblema'
const chartTipoSolucionID = 'informe-chart-tipoSolucion'

const Informe = ({ fields, columns, config, handleViewInforme }) => {
    const chartRefEquipos = useRef();
    const chartRefTipoProblema = useRef();
    const chartRefTipoSolucion = useRef();


    const [chartType, setChatType] = useState({})
    const [isMaxWidth, setIsMaxWidth] = useState({});

    useEffect(() => {
        printCharts();
        return () => {
            deleteCanvas()
        }
    }, []);
    useEffect(() => {
        printCharts();
    }, [isMaxWidth, chartType]);

    const printCharts = () => {
        if (fields && fields.length > 0) {
            deleteCanvas();
            initChartEquipos(chartRefEquipos, 'equipo', 'Equipos', chartType[chartEquiposID]);
            initChartEquipos(chartRefTipoProblema, 'tipoProblema', 'Tipo de problema', chartType[chartTipoProblemaID]);
            initChartEquipos(chartRefTipoSolucion, 'tipoSolucion', 'Tipo de Solucion', chartType[chartTipoSolucionID]);
        }
    };

    const deleteCanvas = () => {
        for (const chart of CanvasGenerados) {
            chart.destroy();
        }
        CanvasGenerados = [];
    };

    const initChartEquipos = (ref, key, label, type) => {
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
            type: type ? 'doughnut' : 'bar',
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

    const handleMaxWidthChange = ({ target }) => {
        const { id } = target
        setIsMaxWidth((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };
    const handleChartTypeChange = ({ target }) => {
        const { id } = target
        setChatType((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    return (
        <Flex w={"100vw"} h={"100vh"} top={0} left={0} bg={"#0005"} zIndex={9999} position={"absolute"} align={"center"} justify={"center"}>
            <Flex w={"90%"} h={"95%"} bg={"#FFF"} borderRadius={"10px"} position={"relative"} p={'50px'} flexWrap={'wrap'} overflowY={'scroll'} justifyContent={'center'}>
                <Flex position={"sticky"} h={"50px"} w={"100%"} justifyContent={"end"} align={"center"} me={'-40px'} mt={'-40px'}>
                    <Button size={"sm"} onClick={handleViewInforme}>
                        X
                    </Button>
                </Flex>
                <Flex minW={['100%', isMaxWidth[chartEquiposID] ? '100%' : '45%']} h={400} flexDir={'column'} alignItems={'center'} bg={'#0001'} borderRadius={'10px'} p={'25px'} flexBasis={['100%', '45%']} m={'10px'}>
                    <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>Servicios a equipos</Text>
                        <Flex>
                            <Text fontSize={'12px'}>Tamaño maximo</Text>
                            <Switch id={chartEquiposID} onChange={handleMaxWidthChange} />
                        </Flex>
                        <Flex>
                            <Text fontSize={'12px'}>Circular</Text>
                            <Switch id={chartEquiposID} onChange={handleChartTypeChange} />
                        </Flex>
                    </Flex>
                    <canvas id={chartEquiposID} ref={chartRefEquipos}></canvas>
                </Flex>
                <Flex minW={['100%', isMaxWidth[chartTipoProblemaID] ? '100%' : '45%']} h={400} flexDir={'column'} alignItems={'center'} bg={'#0001'} borderRadius={'10px'} p={'25px'} flexBasis={['100%', '45%']} m={'10px'}>
                    <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>Problemas</Text>
                        <Flex>
                            <Text fontSize={'12px'}>Tamaño maximo</Text>
                            <Switch id={chartTipoProblemaID} onChange={handleMaxWidthChange} />
                        </Flex>
                        <Flex>
                            <Text fontSize={'12px'}>Circular</Text>
                            <Switch id={chartTipoProblemaID} onChange={handleChartTypeChange} />
                        </Flex>
                    </Flex>
                    <canvas id={chartTipoProblemaID} ref={chartRefTipoProblema}></canvas>
                </Flex>
                <Flex minW={['100%', isMaxWidth[chartTipoSolucionID] ? '100%' : '45%']} h={400} flexDir={'column'} alignItems={'center'} bg={'#0001'} borderRadius={'10px'} p={'25px'} flexBasis={['100%', '45%']} m={'10px'}>
                    <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>Soluciones</Text>
                        <Flex>
                            <Text fontSize={'12px'}>Tamaño maximo</Text>
                            <Switch id={chartTipoSolucionID} onChange={handleMaxWidthChange} />
                        </Flex>
                        <Flex>
                            <Text fontSize={'12px'}>Circular</Text>
                            <Switch id={chartTipoSolucionID} onChange={handleChartTypeChange} />
                        </Flex>
                    </Flex>
                    <canvas id={chartTipoSolucionID} ref={chartRefTipoSolucion}></canvas>
                </Flex>
            </Flex>
        </Flex >
    );
};

export default Informe;
