-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2025 at 11:47 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cwsms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`) VALUES
(232, 'gloria', 'gloria'),
(233, 'Kevin', 'Kevin');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `platenumber` varchar(20) NOT NULL,
  `cartype` varchar(50) DEFAULT NULL,
  `carsize` varchar(20) DEFAULT NULL,
  `drivename` varchar(100) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`platenumber`, `cartype`, `carsize`, `drivename`, `phonenumber`) VALUES
('4', '576jh', '565', 'hj', '67676'),
('565', 'hg', '565', 'hgh', '656');

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `packagenumber` int(11) NOT NULL,
  `packagename` varchar(100) DEFAULT NULL,
  `packagedescription` text DEFAULT NULL,
  `packageprice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`packagenumber`, `packagename`, `packagedescription`, `packageprice`) VALUES
(343, 'rg', 'rfg', '3434.00');

-- --------------------------------------------------------

--
-- Table structure for table `package_services`
--

CREATE TABLE `package_services` (
  `packagenumber` int(11) NOT NULL,
  `recordnumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `paymentnumber` int(11) NOT NULL,
  `platenumber` varchar(20) DEFAULT NULL,
  `packagenumber` int(11) DEFAULT NULL,
  `amountpaid` decimal(10,2) DEFAULT NULL,
  `paymentdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `servicepackage`
--

CREATE TABLE `servicepackage` (
  `recordnumber` int(11) NOT NULL,
  `servicename` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicepackage`
--

INSERT INTO `servicepackage` (`recordnumber`, `servicename`) VALUES
(343, 'gdfg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`platenumber`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`packagenumber`);

--
-- Indexes for table `package_services`
--
ALTER TABLE `package_services`
  ADD PRIMARY KEY (`packagenumber`,`recordnumber`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paymentnumber`);

--
-- Indexes for table `servicepackage`
--
ALTER TABLE `servicepackage`
  ADD PRIMARY KEY (`recordnumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
