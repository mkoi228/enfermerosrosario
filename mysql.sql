/* DATABASE NAME */
CREATE DATABASE `erdb`;

/* SELECT DATABASE */
USE `erdb`;

/* CREATE TABLE USERS */
DROP TABLE IF EXISTS `USERS`;

CREATE TABLE `USERS` (
  `USR_ID` varchar(40) COLLATE utf8mb4_unicode_520_ci,
  `USR_EMAIL` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`USR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE EQUIPMENT */
DROP TABLE IF EXISTS `EQUIPMENT`;

CREATE TABLE `EQUIPMENT` (
  `EQU_ID` int AUTO_INCREMENT,
  `EQU_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `EQU_DESC` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `EQU_PHOTO` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `EQU_CREATED_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `EQU_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`EQU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE EQUIPMENT_REQUESTS */
DROP TABLE IF EXISTS `EQUIPMENT_REQUESTS`;

CREATE TABLE `EQUIPMENT_REQUESTS` (
  `REQ_ID` varchar(40) COLLATE utf8mb4_unicode_520_ci,
  `REQ_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_EMAIL` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_MESSAGE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_PHONE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_EQUIPMENTS` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_START_DATE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_END_DATE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `REQ_CREATED_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `REQ_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`REQ_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE PLAN */
DROP TABLE IF EXISTS `PLAN`;

/*MODIFY ALL PICES FROM INT TO DECIMAL*/
CREATE TABLE `PLAN` (
  `PLN_ID` int AUTO_INCREMENT,
  `PLN_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PLN_PRICE` int NOT NULL,
  `PLN_DESC` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PLN_PHOTO` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `PLN_CREATED_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `PLN_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`PLN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE ASSOCIATE_PLAN_REQUESTS */
DROP TABLE IF EXISTS `ASSOCIATE_PLAN_REQUESTS`;

CREATE TABLE `ASSOCIATE_PLAN_REQUESTS` (
  `ASP_ID` varchar(40) COLLATE utf8mb4_unicode_520_ci,
  `ASP_PLAN` int NOT NULL,
  `ASP_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `ASP_EMAIL` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `ASP_MESSAGE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `ASP_PHONE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `ASP_CREATED_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `ASP_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`ASP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE COVID_REQUESTS */
DROP TABLE IF EXISTS `COVID_REQUESTS`;

CREATE TABLE `COVID_REQUESTS` (
  `COV_ID` varchar(40) COLLATE utf8mb4_unicode_520_ci,
  `COV_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `COV_EMAIL` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `COV_PHONE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `COV_ADDRESS` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `COV_MESSAGE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `COV_STATE` varchar(250) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `COV_CREATED_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `COV_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`COV_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE CONTACT_REQUESTS */
DROP TABLE IF EXISTS `CONTACT_REQUESTS`;

CREATE TABLE `CONTACT_REQUESTS` (
  `CON_ID` varchar(40) COLLATE utf8mb4_unicode_520_ci,
  `CON_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `CON_EMAIL` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `CON_MESSAGE` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `CON_STATE` varchar(250) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `CON_CREATED_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `CON_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`CON_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

/* CREATE TABLE RRHH */
DROP TABLE IF EXISTS `RRHH`;

/*MODIFY ALL PRICES FROM INT TO DECIMAL*/
CREATE TABLE `RRHH` (
  `RRH_ID` int AUTO_INCREMENT,
  `RRH_NAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `RRH_SURNAME` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `RRH_ADDRESS` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `RRH_IDREG` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `RRH_PHOTO` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `RRH_ROL` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `RRH_CREATE_AT` varchar(250) COLLATE utf8mb4_unicode_520_ci,
  `RRH_IS_DEL` TINYINT NOT NULL,
  PRIMARY KEY (`RRH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
