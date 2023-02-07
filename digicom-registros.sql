-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2023 a las 19:15:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `digicom-registros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `id_rtu` int(11) DEFAULT NULL,
  `id_master` int(11) DEFAULT NULL,
  `latitud_sur` decimal(10,8) DEFAULT NULL,
  `latitud_oeste` decimal(11,8) DEFAULT NULL,
  `orientacion_antena` decimal(5,2) DEFAULT NULL,
  `fecha_instalacion` date DEFAULT NULL,
  `cambio_bateria` date DEFAULT NULL,
  `numero_serie` int(11) DEFAULT NULL,
  `numero_serie_reemplazo` int(11) DEFAULT NULL,
  `velocidad_rtu` int(11) DEFAULT NULL,
  `canal_radio` int(11) DEFAULT NULL,
  `rpt_directo` varchar(100) DEFAULT NULL,
  `rpt_asociado` varchar(100) DEFAULT NULL,
  `v_prim` int(11) DEFAULT NULL,
  `numero_serie_radio_modem` int(11) DEFAULT NULL,
  `piquete` varchar(100) DEFAULT NULL,
  `tipo_sitio` varchar(100) DEFAULT NULL,
  `sitio` varchar(100) DEFAULT NULL,
  `administracion` varchar(100) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `tipo_equipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `id_rtu`, `id_master`, `latitud_sur`, `latitud_oeste`, `orientacion_antena`, `fecha_instalacion`, `cambio_bateria`, `numero_serie`, `numero_serie_reemplazo`, `velocidad_rtu`, `canal_radio`, `rpt_directo`, `rpt_asociado`, `v_prim`, `numero_serie_radio_modem`, `piquete`, `tipo_sitio`, `sitio`, `administracion`, `observaciones`, `tipo_equipo`) VALUES
(1, 1001, 2001, '-34.60372200', '-58.38159200', '0.00', '2020-01-01', '2021-01-01', 123456, 654321, 9600, 9, 'rpt_dir_1', 'rpt_asoc_1', 5, 111111, 'piquete_1', 'tipo_sitio_1', 'sitio_1', 'admin_1', 'observaciones_1', 'SECCIONADOR'),
(2, 1002, 2002, '-34.60372200', '-58.38159200', '0.00', '2020-02-01', '2021-02-01', 234567, 765432, 9600, 10, 'rpt_dir_2', 'rpt_asoc_2', 6, 222222, 'piquete_2', 'tipo_sitio_2', 'sitio_2', 'admin_2', 'observaciones_2', 'SECCIONADOR'),
(3, 1003, 2003, '-34.60372200', '-58.38159200', '0.00', '2020-01-01', '2021-01-01', 123457, 654321, 9600, 9, 'rpt_dir_3', 'rpt_asoc_3', 5, 111111, 'piquete_3', 'tipo_sitio_3', 'sitio_3', 'admin_3', 'observaciones_3', 'TELGECS'),
(4, 1004, 2004, '-34.60372200', '-58.38159200', '0.00', '2020-02-01', '2021-02-01', 234568, 765432, 9600, 10, 'rpt_dir_4', 'rpt_asoc_4', 6, 222222, 'piquete_4', 'tipo_sitio_4', 'sitio_4', 'admin_4', 'observaciones_4', 'TELGECS'),
(5, 1005, 2005, '-34.60372200', '-58.38159200', '0.00', '2020-01-01', '2021-01-01', 123459, 654321, 9600, 9, 'rpt_dir_5', 'rpt_asoc_5', 5, 111111, 'piquete_5', 'tipo_sitio_5', 'sitio_5', 'admin_5', 'observaciones_5', 'RECONECTADOR'),
(6, 1006, 2006, '-34.60372200', '-58.38159200', '0.00', '2020-02-01', '2021-02-01', 234570, 765432, 9600, 10, 'rpt_dir_6', 'rpt_asoc_6', 6, 222222, 'piquete_6', 'tipo_sitio_6', 'sitio_6', 'admin_6', 'observaciones_6', 'RECONECTADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_reconectador`
--

CREATE TABLE `equipos_reconectador` (
  `id_equipo_reconectador` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `marca_modelo` varchar(255) NOT NULL,
  `id_sistema` int(11) NOT NULL,
  `v_seccionador` int(11) NOT NULL,
  `distribuidor` varchar(255) NOT NULL,
  `seccionador` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_seccionador`
--

CREATE TABLE `equipos_seccionador` (
  `id_equipo_seccionador` int(11) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `marca_modelo` varchar(255) DEFAULT NULL,
  `id_sistema` int(11) DEFAULT NULL,
  `v_seccionador` float DEFAULT NULL,
  `distribuidor` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos_seccionador`
--

INSERT INTO `equipos_seccionador` (`id_equipo_seccionador`, `id_equipo`, `tipo`, `nombre`, `marca_modelo`, `id_sistema`, `v_seccionador`, `distribuidor`) VALUES
(5, 1, 'Tipo 1', 'Seccionador 1', 'Marca 1 Modelo 1', 101, 110, 'Distribuidor 1'),
(6, 2, 'Tipo 2', 'Seccionador 2', 'Marca 2 Modelo 2', 102, 220, 'Distribuidor 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_telgecs`
--

CREATE TABLE `equipos_telgecs` (
  `id_equipo_telgecs` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `configuracion` varchar(255) NOT NULL,
  `t_m` varchar(255) NOT NULL,
  `numero_serie_medidor` int(11) NOT NULL,
  `id_modbus` int(11) NOT NULL,
  `placa_radio_modem` varchar(255) NOT NULL,
  `programa_radio_modem` varchar(255) NOT NULL,
  `radio_modem_protegido` varchar(255) NOT NULL,
  `capacidad_rtu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos_telgecs`
--

INSERT INTO `equipos_telgecs` (`id_equipo_telgecs`, `id_equipo`, `configuracion`, `t_m`, `numero_serie_medidor`, `id_modbus`, `placa_radio_modem`, `programa_radio_modem`, `radio_modem_protegido`, `capacidad_rtu`) VALUES
(3, 1, 'config1', 'tm1', 1000, 1001, 'placa1', 'programa1', 'protegido1', 500),
(4, 2, 'config2', 'tm2', 1001, 1002, 'placa2', 'programa2', 'protegido2', 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fallas`
--

CREATE TABLE `fallas` (
  `id_falla` int(11) NOT NULL,
  `id_servicio` int(11) DEFAULT NULL,
  `fecha_solucion` date DEFAULT NULL,
  `tipo_falla` varchar(255) DEFAULT NULL,
  `detalle_falla` text DEFAULT NULL,
  `solucionado` tinyint(1) DEFAULT NULL,
  `detalle_solucion` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fallas`
--

INSERT INTO `fallas` (`id_falla`, `id_servicio`, `fecha_solucion`, `tipo_falla`, `detalle_falla`, `solucionado`, `detalle_solucion`, `observaciones`) VALUES
(1, 3, '2023-01-05', 'Falla en RTU', 'No se encuentra enviando datos', 1, 'Se reemplazo el RTU', 'RTU reemplazado con éxito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(11) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo_servicio` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicio`, `id_equipo`, `fecha`, `tipo_servicio`, `observaciones`) VALUES
(1, 1, '2023-01-01', 'PREVENTIVO', 'Se necesita reemplazar el RTU'),
(2, 2, '2023-02-01', 'PREVENTIVO', 'Se requiere cambio de radio modem'),
(3, 3, '2023-03-01', 'CORRECTIVO', 'Se necesita reemplazar el medidor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `equipos_reconectador`
--
ALTER TABLE `equipos_reconectador`
  ADD PRIMARY KEY (`id_equipo_reconectador`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `equipos_seccionador`
--
ALTER TABLE `equipos_seccionador`
  ADD PRIMARY KEY (`id_equipo_seccionador`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `equipos_telgecs`
--
ALTER TABLE `equipos_telgecs`
  ADD PRIMARY KEY (`id_equipo_telgecs`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `fallas`
--
ALTER TABLE `fallas`
  ADD PRIMARY KEY (`id_falla`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `equipos_reconectador`
--
ALTER TABLE `equipos_reconectador`
  MODIFY `id_equipo_reconectador` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos_reconectador`
--
ALTER TABLE `equipos_reconectador`
  ADD CONSTRAINT `equipos_reconectador_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `equipos_seccionador`
--
ALTER TABLE `equipos_seccionador`
  ADD CONSTRAINT `equipos_seccionador_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `equipos_telgecs`
--
ALTER TABLE `equipos_telgecs`
  ADD CONSTRAINT `equipos_telgecs_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `fallas`
--
ALTER TABLE `fallas`
  ADD CONSTRAINT `fallas_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
