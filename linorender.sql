-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2023 a las 03:48:07
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `linorender`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`, `createdAt`, `updatedAt`) VALUES
(1, 'Vendedor', '2023-03-23 18:10:36', '2023-03-23 18:10:36'),
(2, 'Cajero', '2023-03-23 18:10:36', '2023-03-23 18:10:36'),
(3, 'Despachador', '2023-03-23 18:10:47', '2023-03-23 18:10:47'),
(4, 'Administrador', '2023-03-23 18:10:47', '2023-03-23 18:10:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL DEFAULT 'perfil_predefinido.jpg',
  `token` varchar(255) DEFAULT 'u92kb418-a7u86ee8-rhd7l48-tsc8pj3o',
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rolid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `email`, `password`, `imagen`, `token`, `estado`, `createdAt`, `updatedAt`, `rolid`) VALUES
('3b8dddf6-13bd-47ad-a420-5bd2f8c8bb06', 'LUIS', 'pruebaphpcode@gmail.com', '$2b$10$wKKncxZsFkg5BgF8bGdmx.j3U.rAKhO6u3dmAJStkzL7FBAveBWu.', 'brd3bh18-oou6abg-4uikeig8-j6lo9qq8.jpeg', 'jrs938pg-1emcvpq8-puee9h1g-53c4vv8', 0, '2023-03-23 17:16:08', '2023-03-26 16:00:00', 2),
('726801fe-7b0e-4196-baa0-14759f36740d', 'PAULINO ALFONSO', '1923010051@untels.edu.pe', '$2b$10$Samv1w5ik6/8Fl.ErR9Ip.G0CIGhxt1K4CTnOf0Q/e1HbVFWiC8zu', 'perfil_predefinido.jpg', 'revrjkc-itqlcdgo-poequmqo-4ruh5il8', 0, '2023-03-23 17:25:10', '2023-03-23 17:25:10', 2),
('822679a4-9aa5-4940-bfdc-5b8327ded0d9', 'PAULINO ALFONSO', '1923010051@untels.edu.pe', '$2b$10$dQAelEX16Xe8MSeBf.RXduPqwewF45M6NkPbY/Xr29fDUshPyV2ay', 'perfil_predefinido.jpg', 'jrs938pg-1emcvpq8-puee9h1g-53c4vv8', 0, '2023-03-23 17:11:30', '2023-03-23 17:11:30', 2),
('90b24aa5-cd9e-4627-bfed-c24ff0ecd5f6', 'Alfonso', 'prue12baphpcode@gmail.com', '$2b$10$s2hiE3I9xcJV5b/xRYbFau/jpDASxaD8oGTh.j1tT/uTteKYV.ejK', 'perfil_predefinido.jpg', '', 1, '2023-03-23 17:42:03', '2023-03-23 17:42:19', 2),
('c51e2055-4a99-4806-ac4d-fbcc3fd88758', '<script>alert(\"hola\")</script>', 'pruebaphpcode@gmail.com', '$2b$10$H9TcvFarsFPtoFuOIhUYK.Z6TTK9zMmaPnXr/JM.ccEhUQdJKCHUG', 'perfil_predefinido.jpg', 'r50ltepg-tvehp2lg-lnfq23t8-53gshs5o', 0, '2023-03-23 17:46:51', '2023-03-23 17:46:51', 2),
('d59a8ad9-0bfd-43bb-9d96-337a6a239bf2', 'PAULINO ALFONSO', '1923010051@untels.edu.pe', '$2b$10$v4Ek6PL.JcqwJL6CCoJ5suO24VgobyqxS15kqx.V7xvYRxJBjLV5S', 'perfil_predefinido.jpg', 'nn7se1u8-cqag7rq-v78jomo8-i71akr0o', 0, '2023-03-23 17:16:35', '2023-03-23 17:16:35', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `rolid` (`rolid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rolid`) REFERENCES `roles` (`idRol`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
