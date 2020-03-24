-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  mar. 24 mars 2020 à 13:48
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `climact-projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `idees-article`
--

CREATE TABLE `idees-article` (
  `id_idee` int(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `explication_idee` text NOT NULL,
  `photo_couverture` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `idees-article`
--
ALTER TABLE `idees-article`
  ADD PRIMARY KEY (`id_idee`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `idees-article`
--
ALTER TABLE `idees-article`
  MODIFY `id_idee` int(11) NOT NULL AUTO_INCREMENT;
