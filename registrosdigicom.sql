CREATE DATABASE  IF NOT EXISTS `registrosdigicom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `registrosdigicom`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: registrosdigicom
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administraciones`
--

DROP TABLE IF EXISTS `administraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administraciones` (
  `id_administracion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_administracion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administraciones`
--

LOCK TABLES `administraciones` WRITE;
/*!40000 ALTER TABLE `administraciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `administraciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion` (
  `id_equipo` int NOT NULL AUTO_INCREMENT,
  `id_rtu` int DEFAULT NULL,
  `id_master` int DEFAULT NULL,
  `latitud_sur` varchar(40) DEFAULT NULL,
  `latitud_oeste` varchar(40) DEFAULT NULL,
  `orientacion_antena` decimal(5,2) DEFAULT NULL,
  `fecha_instalacion` date DEFAULT NULL,
  `cambio_bateria` date DEFAULT NULL,
  `numero_serie` varchar(40) DEFAULT NULL,
  `numero_serie_reemplazo` varchar(40) DEFAULT NULL,
  `velocidad_rtu` int DEFAULT NULL,
  `canal_radio` int DEFAULT NULL,
  `rpt_directo` varchar(100) DEFAULT NULL,
  `rpt_asociado` varchar(100) DEFAULT NULL,
  `v_prim` int DEFAULT NULL,
  `numero_serie_radio_modem` int DEFAULT NULL,
  `sucursal` int DEFAULT NULL,
  `localidad` int DEFAULT NULL,
  `direccion` varchar(80) DEFAULT NULL,
  `administracion` int DEFAULT NULL,
  `observaciones` text,
  `tipo_equipo` int NOT NULL,
  `id_radio` int DEFAULT NULL,
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
INSERT INTO `configuracion` VALUES (12,19467,19456,' 26°49\'38.19\"S','65° 8\'58.79\"O',260.00,'2009-04-17',NULL,'00265a 04/2009','',9600,2,'D',NULL,13000,424,NULL,NULL,'ALFREDO GUZMAN 1º CDRA - EL CORTE',NULL,'sin obervaciones',1,19979);
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_reconectador`
--

DROP TABLE IF EXISTS `equipos_reconectador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos_reconectador` (
  `id_equipo_reconectador` int NOT NULL AUTO_INCREMENT,
  `id_equipo` int NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `marca_modelo` varchar(255) NOT NULL,
  `id_sistema` int NOT NULL,
  `v_seccionador` int NOT NULL,
  `distribuidor` varchar(255) NOT NULL,
  `seccionador` varchar(255) NOT NULL,
  PRIMARY KEY (`id_equipo_reconectador`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `equipos_reconectador_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `configuracion` (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_reconectador`
--

LOCK TABLES `equipos_reconectador` WRITE;
/*!40000 ALTER TABLE `equipos_reconectador` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos_reconectador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_seccionador`
--

DROP TABLE IF EXISTS `equipos_seccionador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos_seccionador` (
  `id_equipo_seccionador` int NOT NULL AUTO_INCREMENT,
  `id_equipo` int DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `marca_modelo` varchar(255) DEFAULT NULL,
  `id_sistema` int DEFAULT NULL,
  `v_seccionador` float DEFAULT NULL,
  `distribuidor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_equipo_seccionador`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `equipos_seccionador_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `configuracion` (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_seccionador`
--

LOCK TABLES `equipos_seccionador` WRITE;
/*!40000 ALTER TABLE `equipos_seccionador` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos_seccionador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_telgecs`
--

DROP TABLE IF EXISTS `equipos_telgecs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos_telgecs` (
  `id_equipo_telgecs` int NOT NULL AUTO_INCREMENT,
  `id_equipo` int NOT NULL,
  `configuracion` varchar(255) NOT NULL,
  `t_m` varchar(255) NOT NULL,
  `numero_serie_medidor` varchar(50) DEFAULT NULL,
  `id_modbus` int NOT NULL,
  `placa_radio_modem` varchar(255) NOT NULL,
  `programa_radio_modem` varchar(255) NOT NULL,
  `radio_modem_protegido` varchar(255) NOT NULL,
  `capacidad_rtu` int NOT NULL,
  `nro_set` varchar(15) DEFAULT NULL,
  `codigo_caja` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_equipo_telgecs`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `equipos_telgecs_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `configuracion` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_telgecs`
--

LOCK TABLES `equipos_telgecs` WRITE;
/*!40000 ALTER TABLE `equipos_telgecs` DISABLE KEYS */;
INSERT INTO `equipos_telgecs` VALUES (1,12,'T_500.SET','TRIFASICO','383801189-72088',180,'Modificada','RM2RMX22.HEX','SI',800,'85','XF');
/*!40000 ALTER TABLE `equipos_telgecs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fallas`
--

DROP TABLE IF EXISTS `fallas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fallas` (
  `id_falla` int NOT NULL AUTO_INCREMENT,
  `id_servicio` int DEFAULT NULL,
  `fecha_solucion` date DEFAULT NULL,
  `tipo_falla` varchar(255) DEFAULT NULL,
  `detalle_falla` text,
  `solucionado` tinyint(1) DEFAULT NULL,
  `detalle_solucion` text,
  `observaciones` text,
  PRIMARY KEY (`id_falla`),
  KEY `id_servicio` (`id_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fallas`
--

LOCK TABLES `fallas` WRITE;
/*!40000 ALTER TABLE `fallas` DISABLE KEYS */;
INSERT INTO `fallas` VALUES (1,5,'2023-03-18','MALA COMUNICACION','Sin detalle.',1,'Sin detalle.','Sin observaciones.');
/*!40000 ALTER TABLE `fallas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidades`
--

DROP TABLE IF EXISTS `localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidades` (
  `id_localidad` int NOT NULL AUTO_INCREMENT,
  `id_sucursal` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_localidad`),
  KEY `id_sucursal` (`id_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidades`
--

LOCK TABLES `localidades` WRITE;
/*!40000 ALTER TABLE `localidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `localidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `id_equipo` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo_servicio` varchar(255) DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id_servicio`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `configuracion` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (3,12,'2023-03-12','PREVENTIVO','Sin observaciones.'),(4,12,'2023-03-12','PREVENTIVO','Sin observaciones.'),(5,12,'2023-03-13','CORRECTIVO','Sin observaciones.');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursales` (
  `id_sucursal` int NOT NULL AUTO_INCREMENT,
  `id_administracion` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_sucursal`),
  KEY `id_administracion` (`id_administracion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_equipos`
--

DROP TABLE IF EXISTS `tipos_equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_equipos` (
  `id_tipo_equipo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_equipos`
--

LOCK TABLES `tipos_equipos` WRITE;
/*!40000 ALTER TABLE `tipos_equipos` DISABLE KEYS */;
INSERT INTO `tipos_equipos` VALUES (1,'telgecs'),(2,'seccionador'),(3,'reconectador');
/*!40000 ALTER TABLE `tipos_equipos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-13  9:01:23
