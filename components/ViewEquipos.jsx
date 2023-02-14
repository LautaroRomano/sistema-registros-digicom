import React from "react";
import { Flex, Text, Select } from "@chakra-ui/react";
import styles from "../styles/Table.module.css";

const ViewEquipos = () => {
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      flexDir="column"
      overflowY={"scroll"}
    >
      <Flex
        my={"30px"}
        w={"80%"}
        h="100px"
        px={"1.5rem"}
        bg="#fff"
        justifyContent="center"
        alignItems={"end"}
        position="relative"
        borderRadius={"15px"}
      >
        <Flex
          position={"absolute"}
          top={-5}
          left="0"
          p="10px"
          bg={"#fff"}
          borderTopRadius="15px"
          color={"#gray.200"}
          fontWeight="600"
        >
          <Text mt={"-10px"}>Filtro</Text>
        </Flex>
        <Flex></Flex>
      </Flex>

      <Flex
        w={"80%"}
        h="60%"
        px={"1.5rem"}
        py={"1rem"}
        bg="#fff"
        justifyContent="center"
        alignItems={"start"}
        position="relative"
        borderRadius={"15px"}
      >
        <Flex
          position={"absolute"}
          top={-5}
          left="0"
          p="10px"
          bg={"#fff"}
          borderTopRadius="15px"
          color={"#gray.200"}
          fontWeight="600"
        >
          <Text mt={"-10px"}>Lista de equipos</Text>
        </Flex>
        <Table></Table>
      </Flex>
    </Flex>
  );
};

export default ViewEquipos;

const Table = () => (
  <Flex w={"100%"} h="100%" overflowY={"scroll"}>
    <table className={styles.container}>
      <thead>
        <tr>
          <th>
            <h1></h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  </Flex>
);
