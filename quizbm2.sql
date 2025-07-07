-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 07 juil. 2025 à 14:44
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `quizbm2`
--

-- --------------------------------------------------------

--
-- Structure de la table `answers`
--

CREATE TABLE `answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_attempt_id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `choice_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `answers`
--

INSERT INTO `answers` (`id`, `quiz_attempt_id`, `question_id`, `choice_id`, `created_at`, `updated_at`) VALUES
(4, 4, 3, 12, '2025-07-06 19:05:23', '2025-07-06 19:05:23'),
(5, 4, 4, 16, '2025-07-06 19:05:23', '2025-07-06 19:05:23'),
(6, 4, 5, 21, '2025-07-06 19:05:23', '2025-07-06 19:05:23');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `choices`
--

CREATE TABLE `choices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `text` varchar(255) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `choices`
--

INSERT INTO `choices` (`id`, `question_id`, `text`, `is_correct`, `created_at`, `updated_at`) VALUES
(12, 3, 'blue', 1, '2025-07-06 19:01:58', '2025-07-06 19:01:58'),
(13, 3, 'white', 0, '2025-07-06 19:01:58', '2025-07-06 19:01:58'),
(14, 3, 'red', 0, '2025-07-06 19:01:58', '2025-07-06 19:01:58'),
(15, 3, 'yellow', 0, '2025-07-06 19:01:58', '2025-07-06 19:01:58'),
(16, 4, '2', 1, '2025-07-06 19:02:30', '2025-07-06 19:02:30'),
(17, 4, '3', 0, '2025-07-06 19:02:30', '2025-07-06 19:02:30'),
(18, 4, '5', 0, '2025-07-06 19:02:30', '2025-07-06 19:02:30'),
(19, 4, '9', 0, '2025-07-06 19:02:30', '2025-07-06 19:02:30'),
(20, 5, 'no', 0, '2025-07-06 19:03:39', '2025-07-06 19:03:39'),
(21, 5, 'yes', 1, '2025-07-06 19:03:39', '2025-07-06 19:03:39'),
(22, 5, 'no', 0, '2025-07-06 19:03:39', '2025-07-06 19:03:39'),
(23, 5, 'no', 0, '2025-07-06 19:03:39', '2025-07-06 19:03:39'),
(68, 1, 'Both `int` and `String` are reference types.', 0, '2025-07-06 22:32:50', '2025-07-06 22:32:50'),
(69, 1, '`int` is a reference type, while `String` is a primitive type.', 0, '2025-07-06 22:32:50', '2025-07-06 22:32:50'),
(70, 1, '`int` is a primitive type, while `String` is a reference type.', 1, '2025-07-06 22:32:50', '2025-07-06 22:32:50'),
(71, 1, '`int` is a primitive type, and `String` is also a primitive type.', 0, '2025-07-06 22:32:50', '2025-07-06 22:32:50');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"85e32efb-2cfc-465f-9f14-53541d8ad331\",\"displayName\":\"App\\\\Events\\\\ScoreUpdated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\ScoreUpdated\\\":2:{s:4:\\\"quiz\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\Quiz\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:7:\\\"attempt\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\QuizAttempt\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"},\"createdAt\":1751375842,\"delay\":null}', 0, NULL, 1751375842, 1751375842),
(2, 'default', '{\"uuid\":\"986c5d65-539d-430c-b416-f633134192a6\",\"displayName\":\"App\\\\Events\\\\ScoreUpdated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\ScoreUpdated\\\":2:{s:4:\\\"quiz\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\Quiz\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:7:\\\"attempt\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\QuizAttempt\\\";s:2:\\\"id\\\";i:2;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"},\"createdAt\":1751399163,\"delay\":null}', 0, NULL, 1751399164, 1751399164),
(3, 'default', '{\"uuid\":\"c4cf1a79-3184-48de-a5f4-20f944cc9bca\",\"displayName\":\"App\\\\Events\\\\ScoreUpdated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\ScoreUpdated\\\":2:{s:4:\\\"quiz\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\Quiz\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:7:\\\"attempt\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\QuizAttempt\\\";s:2:\\\"id\\\";i:3;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"},\"createdAt\":1751399327,\"delay\":null}', 0, NULL, 1751399327, 1751399327),
(4, 'default', '{\"uuid\":\"3c084c32-6a2d-4e07-8a42-722270d87c5f\",\"displayName\":\"App\\\\Events\\\\ScoreUpdated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\ScoreUpdated\\\":2:{s:4:\\\"quiz\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\Quiz\\\";s:2:\\\"id\\\";i:3;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:7:\\\"attempt\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\QuizAttempt\\\";s:2:\\\"id\\\";i:4;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"},\"createdAt\":1751832325,\"delay\":null}', 0, NULL, 1751832325, 1751832325);

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_06_18_102858_create_quizzes_table', 1),
(5, '2025_06_18_102947_create_questions_table', 1),
(6, '2025_06_18_102954_create_choices_table', 1),
(7, '2025_06_18_102959_create_quiz_attempts_table', 1),
(8, '2025_06_18_103005_create_answers_table', 1),
(9, '2025_06_18_104653_create_statistics_table', 1),
(10, '2025_06_19_100215_add_slug_to_quizzes_table', 1),
(11, '2025_06_25_144343_add_time_per_question_to_quizzes_table', 1),
(12, '2025_06_25_203421_add_time_per_question_to_quizzes_table', 1),
(13, '2025_06_25_232758_add_time_taken_to_quiz_attempts_table', 1),
(14, '2025_06_25_232805_add_time_taken_to_quiz_attempts_table', 1),
(15, '2025_06_29_134724_remove_pin_from_quizzes_table', 1),
(16, '2025_06_29_135128_remove_pin_from_quizzes_table', 1),
(17, '2025_07_02_212153_create_personal_access_tokens_table', 2);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '0d37f8b53391c8cb9195ac4f259fba48de3e2c4615452503910ca1ef9e88bba2', '[\"*\"]', '2025-07-02 20:26:26', NULL, '2025-07-02 20:24:10', '2025-07-02 20:26:26'),
(2, 'App\\Models\\User', 2, 'auth_token', 'fc6f3c76c62a31130f926ccc1f958bf1e42b815bd60d8f1e0a5c4b971ac32b11', '[\"*\"]', '2025-07-02 20:32:54', NULL, '2025-07-02 20:32:52', '2025-07-02 20:32:54'),
(3, 'App\\Models\\User', 1, 'auth_token', 'd50dee7f48b5259673241725c3476b26e401d6ef8b93dd77b7ce7794fa647df9', '[\"*\"]', NULL, NULL, '2025-07-02 20:33:34', '2025-07-02 20:33:34'),
(4, 'App\\Models\\User', 8, 'auth_token', '9f53e92e6faf9ccc3c11d8be6495b665548ef11c993c1a52b552ffc2d83ffdef', '[\"*\"]', '2025-07-02 20:34:35', NULL, '2025-07-02 20:33:52', '2025-07-02 20:34:35'),
(5, 'App\\Models\\User', 2, 'auth_token', '247af56a731afeb0d20053ae5f48c83199a2f6e4f4c0e46ca057327841d3df12', '[\"*\"]', '2025-07-02 20:47:00', NULL, '2025-07-02 20:35:04', '2025-07-02 20:47:00'),
(6, 'App\\Models\\User', 1, 'auth_token', 'ec640f27dcc6c1369aff5242c67fe29459342ee0b09d7d9109e4e0530363089b', '[\"*\"]', '2025-07-02 20:47:23', NULL, '2025-07-02 20:47:12', '2025-07-02 20:47:23'),
(7, 'App\\Models\\User', 2, 'auth_token', '7a52294ed378713cec6ef076d8a29ed38b7ff7db5cab0caf6a575bb43a4d4c70', '[\"*\"]', '2025-07-02 20:47:36', NULL, '2025-07-02 20:47:34', '2025-07-02 20:47:36'),
(8, 'App\\Models\\User', 16, 'auth_token', 'e488ce55a92aa21056da104ae19a6d5127da0582de6384052666af4d2566fbbe', '[\"*\"]', '2025-07-02 20:50:54', NULL, '2025-07-02 20:48:11', '2025-07-02 20:50:54'),
(9, 'App\\Models\\User', 17, 'auth_token', 'da37dfa8551db6c5455609b9ed23092b4232a8e70175f235d76c94f7d468684b', '[\"*\"]', '2025-07-02 20:51:48', NULL, '2025-07-02 20:51:11', '2025-07-02 20:51:48'),
(10, 'App\\Models\\User', 2, 'auth_token', 'f89b9e70d80a4f2704a699d168b0318405f92badab851e2587926f18710bcb90', '[\"*\"]', '2025-07-03 09:33:24', NULL, '2025-07-02 20:51:58', '2025-07-03 09:33:24'),
(11, 'App\\Models\\User', 1, 'auth_token', '18ce34faa0942ec9ab8bf822f14988192d1d6ecc0031186e0854237089e99326', '[\"*\"]', NULL, NULL, '2025-07-03 09:33:50', '2025-07-03 09:33:50'),
(12, 'App\\Models\\User', 1, 'auth_token', '57b40ec858f89d25349768b23dccbe3649ae313ccc56b03f401c4a87735bb34c', '[\"*\"]', '2025-07-03 09:34:06', NULL, '2025-07-03 09:33:54', '2025-07-03 09:34:06'),
(13, 'App\\Models\\User', 2, 'auth_token', 'c18b3d72197b9139ef6bf80f3183ba9c5dc6799b2c5d150efa3e5332281b5ba2', '[\"*\"]', '2025-07-03 12:20:26', NULL, '2025-07-03 09:34:25', '2025-07-03 12:20:26'),
(14, 'App\\Models\\User', 2, 'auth_token', '5bd8185cbaf9491e92fd039f8995d2be9d8a55b95078277714922b809ae07dbe', '[\"*\"]', '2025-07-03 13:05:14', NULL, '2025-07-03 12:20:39', '2025-07-03 13:05:14'),
(15, 'App\\Models\\User', 2, 'auth_token', '866109a306593e36cf301556e4aa07e7c4ace08e0daa059a2fc776c55a427055', '[\"*\"]', '2025-07-03 13:27:09', NULL, '2025-07-03 13:06:49', '2025-07-03 13:27:09'),
(16, 'App\\Models\\User', 1, 'auth_token', '90b6f11f4524a587da71816e1d854a4c09307ceaabd8a232fe070b84b9bb0b2c', '[\"*\"]', '2025-07-03 13:31:22', NULL, '2025-07-03 13:29:46', '2025-07-03 13:31:22'),
(17, 'App\\Models\\User', 1, 'auth_token', '9d2045920185e1df86b7c35c53fa318558d0fc91b4e72afe3c0b26a9daf9142d', '[\"*\"]', NULL, NULL, '2025-07-03 13:31:37', '2025-07-03 13:31:37'),
(18, 'App\\Models\\User', 2, 'auth_token', 'a82e4dc243cb2c06e42b449c747488de9fbb35f268254354f212c88e03cf3598', '[\"*\"]', '2025-07-03 13:59:49', NULL, '2025-07-03 13:31:54', '2025-07-03 13:59:49'),
(19, 'App\\Models\\User', 2, 'auth_token', '0e728ed0e46079fd1da7106ca2ecda7ae7f4b959e6a28ddd282120be278f5961', '[\"*\"]', '2025-07-03 14:02:31', NULL, '2025-07-03 14:00:04', '2025-07-03 14:02:31'),
(20, 'App\\Models\\User', 2, 'auth_token', 'bfeeeaf8a4c5d08ca3a9bd764459a918b2e1fc6c3c2f04127cc2dcdf921cbc44', '[\"*\"]', '2025-07-04 19:30:30', NULL, '2025-07-04 19:28:19', '2025-07-04 19:30:30'),
(21, 'App\\Models\\User', 2, 'auth_token', '49f8e0de6879ed3d196f4e58cace049788f3b33184b23abba35dfd65641d4580', '[\"*\"]', '2025-07-04 21:57:45', NULL, '2025-07-04 19:32:37', '2025-07-04 21:57:45'),
(22, 'App\\Models\\User', 1, 'auth_token', 'd676282d58e0d36d0740c467c3a21c539c74eac0ab33fa2553e04bdb0756c938', '[\"*\"]', '2025-07-04 22:07:26', NULL, '2025-07-04 21:58:00', '2025-07-04 22:07:26'),
(23, 'App\\Models\\User', 1, 'auth_token', '5f2f51c21e40c57d9ed01a9261a6c4c4035ba6fdc9427d062628185c90d72d82', '[\"*\"]', '2025-07-04 22:31:39', NULL, '2025-07-04 22:07:36', '2025-07-04 22:31:39'),
(24, 'App\\Models\\User', 8, 'auth_token', '5a80f12fe4f85814ac352986d644ce2b1b997daad00b4d09cc9798e4e8bc55d5', '[\"*\"]', '2025-07-04 22:33:49', NULL, '2025-07-04 22:33:47', '2025-07-04 22:33:49'),
(25, 'App\\Models\\User', 2, 'auth_token', '6c781ab443100cbde10c097da29f4a9bff609c2494ae87b516953e111c2f4102', '[\"*\"]', '2025-07-04 22:34:29', NULL, '2025-07-04 22:34:23', '2025-07-04 22:34:29'),
(26, 'App\\Models\\User', 2, 'auth_token', '16d43584bb149c464ff722a5e865890063bf81c3d63f0b7a54d0ec56c11aef6b', '[\"*\"]', '2025-07-05 20:56:05', NULL, '2025-07-04 22:34:26', '2025-07-05 20:56:05'),
(27, 'App\\Models\\User', 2, 'auth_token', '0c1a1e6032c3a139043dede54ff86e4c1ff8fa410062c74edbdedd59e46217f5', '[\"*\"]', '2025-07-05 21:05:58', NULL, '2025-07-05 20:57:04', '2025-07-05 21:05:58'),
(28, 'App\\Models\\User', 2, 'auth_token', 'a1c50c21920a5f48e01485c6116de1c9b38e9e4d75b4fcae0644cc10d7b17b12', '[\"*\"]', '2025-07-06 17:56:23', NULL, '2025-07-05 21:06:47', '2025-07-06 17:56:23'),
(29, 'App\\Models\\User', 2, 'auth_token', '41e6caf19f74e1e9b69661d7b374ebd718230fa178d405320371614545f63a39', '[\"*\"]', '2025-07-06 18:46:58', NULL, '2025-07-06 17:56:40', '2025-07-06 18:46:58'),
(30, 'App\\Models\\User', 2, 'auth_token', 'adacb19615639874c4b8226ff1ccfa62d7fab554238e46e0ec9f4b697eaa65f5', '[\"*\"]', NULL, NULL, '2025-07-06 18:47:09', '2025-07-06 18:47:09'),
(31, 'App\\Models\\User', 1, 'auth_token', '6f8c84df1abc4cc69b771c9d15801da8e4e09aca0e7767f0341e3247c7ce8f73', '[\"*\"]', NULL, NULL, '2025-07-06 19:04:43', '2025-07-06 19:04:43'),
(32, 'App\\Models\\User', 2, 'auth_token', '218f66928f81532b912620d2ac81e0def8a6f88cbeb099d20fc599c6532b917e', '[\"*\"]', NULL, NULL, '2025-07-06 21:35:42', '2025-07-06 21:35:42'),
(33, 'App\\Models\\User', 2, 'auth_token', 'ef5b8671dd004f5b8c594e96f2f4f45ebb97c8cdbfdb1485bb6cd440b85df8d8', '[\"*\"]', NULL, NULL, '2025-07-06 21:35:45', '2025-07-06 21:35:45');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `question_text` text NOT NULL,
  `type` enum('multiple_choice','true_false') NOT NULL,
  `time_per_question` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `question_text`, `type`, `time_per_question`, `created_at`, `updated_at`) VALUES
(1, 1, 'Which of the following statements accurately describes the nature of `int` and `String` in Java?', 'multiple_choice', 30, NULL, '2025-07-06 19:04:18'),
(3, 3, 'what color is the sky?', 'multiple_choice', 30, '2025-07-06 19:01:58', '2025-07-06 19:01:58'),
(4, 3, '1+1=?', 'multiple_choice', 30, '2025-07-06 19:02:30', '2025-07-06 19:02:30'),
(5, 3, 'am i a good person ?', 'multiple_choice', 30, '2025-07-06 19:03:39', '2025-07-06 19:03:39');

-- --------------------------------------------------------

--
-- Structure de la table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `max_attempts` int(11) NOT NULL DEFAULT 3,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `time_per_question` int(11) NOT NULL DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `description`, `max_attempts`, `user_id`, `slug`, `created_at`, `updated_at`, `time_per_question`) VALUES
(1, 'Java Fundamentals Quiz', 'Test your knowledge of the core concepts of Java programming with this quick quiz! Whether you\'re just starting out or need a refresher, this quiz covers essential topics like variables, data types, operators, control flow, and basic object-oriented programming (OOP) principles. Challenge yourself to see how well you understand the building blocks of Java!', 3, 2, 'AZERTY', NULL, NULL, 30),
(3, 'test1', 'first test', 3, 2, 'CNi8dvj6', '2025-07-06 19:01:15', '2025-07-06 21:54:39', 30);

-- --------------------------------------------------------

--
-- Structure de la table `quiz_attempts`
--

CREATE TABLE `quiz_attempts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `participant_name` varchar(255) NOT NULL,
  `participant_email` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `time_taken` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `quiz_attempts`
--

INSERT INTO `quiz_attempts` (`id`, `quiz_id`, `user_id`, `participant_name`, `participant_email`, `ip_address`, `score`, `time_taken`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'test', NULL, '::1', 100, 5, '2025-07-01 12:17:19', '2025-07-01 12:17:19'),
(2, 1, NULL, 'Alae Majjati', NULL, '::1', 100, 6, '2025-07-01 18:45:59', '2025-07-01 18:45:59'),
(3, 1, NULL, 'Alae Majjati', NULL, '::1', 100, 6, '2025-07-01 18:48:47', '2025-07-01 18:48:47'),
(4, 3, NULL, 'Alae Majjati', NULL, '::1', 100, 20, '2025-07-06 19:05:23', '2025-07-06 19:05:23');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('BhoNEeMSqVFirPDnbPyFLF5I2Pj8woZjqr1H7K9m', 8, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiN1FOREpERVVrSzJKNUtYdFZSNHdhSzA1bkRrQU1zcVB5NGs1YXJldiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6ODt9', 1751466851),
('eLjYZ22y60ouYyjvisANzCaug7aIhjyKZ0gb4203', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiYlA2VGVwUUFKOVNhYW9KTHoyMk9aNWdjRGpMc20zVm9MTlF6Nms5UyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9', 1751469955),
('tKApP9JhEykLSlaESe4J6Kof0LngzZyqr6wBtBmU', 8, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQ0tIc0JqU3ZNTTJGaDE4ZTFyYnVNU29Ld2RpTEJmcGFzemVVa3E0RiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6ODt9', 1751456519);

-- --------------------------------------------------------

--
-- Structure de la table `statistics`
--

CREATE TABLE `statistics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `best_times` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`best_times`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'creator',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'participant', 'Alae Majjati', 'alae.majjati.estn24@ump.ac.ma', NULL, '$2y$12$XCWicTZkSaW0SyWoEaXAeuDSBY.gMYYKpt27qFEhTWbxsv3OlrPwa', NULL, '2025-06-29 19:50:16', '2025-06-29 19:50:16'),
(2, 'creator', 'Ali Alami', 'alami@gmail.com', NULL, '$2y$12$b8bRn5DGdNv3E/NoKWUkG.ffew8wh.1kTZpXa3h3CT9w.M7CI58Sy', NULL, '2025-06-29 19:50:55', '2025-06-29 19:50:55'),
(7, 'creator', 'Test User', 'test@example.com', '2025-06-29 20:03:46', '$2y$12$iUnpSojOhJ0b/1NjWXlws.6VKrWt6b00MWZYhIEVSVWG2s3HMwxZy', 'secgoutXXk', '2025-06-29 20:03:47', '2025-06-29 20:03:47'),
(8, 'creator', 'Creator', 'creator@example.com', '2025-06-29 20:03:47', '$2y$12$D2kmRjKbV1F2pBcP17eoEe.eigg5f0y2jo4XxNlc2gDdkJVT47v7m', 'Cb8cReUL0t', '2025-06-29 20:03:47', '2025-06-29 20:03:47'),
(10, 'participant', 'Alae', 'alaeeala21@gmail.com', NULL, '$2y$12$9yqAQrVPzN3Wn6BHKuwjYuyS0WPe/3SaTPAzEcuWDj1N36/zvnzsi', NULL, '2025-06-29 20:46:08', '2025-06-29 20:46:08'),
(12, 'participant', 'IJSC KJCKD', 'lololala08282007@gmail.com', NULL, '$2y$12$Em5gu.KxuNhtLMKlERJ4/ugG0fRsWd7eGz6uYgrp/3Ha/8ATm9t6S', NULL, '2025-06-29 22:22:01', '2025-06-29 22:22:01'),
(13, 'participant', 'lala', 'lala@gmail.com', NULL, '$2y$12$2K9dSC6.R8Q6kdw5Sx2hAOjegucGVpXk/j6BwCxJI7hhO1WY8hLSe', NULL, '2025-07-01 09:44:41', '2025-07-01 09:44:41'),
(14, 'participant', 'hedj', 'uhjhhi@gmail.com', NULL, '$2y$12$YBYjNQfYN97OF49JGSgzlu/Nqr9fDLzt3USaI.hn8LE/CtQr17ZYK', NULL, '2025-07-01 21:38:52', '2025-07-01 21:38:52'),
(15, 'participant', 'hedj', 'uhjhhzi@gmail.com', NULL, '$2y$12$J0YF3C4l42GHunQhksn58.OcOlwebG/iJc7ZANFQ4nJqOtmvSx4zm', NULL, '2025-07-02 13:48:35', '2025-07-02 13:48:35'),
(16, 'creator', 'hedj', 'uhjhhvzi@gmail.com', NULL, '$2y$12$7XBtNBPNjO.aH5hCOvMMPebWdZfcPA0ISsLa6.c7/trvOg0KBXhhS', NULL, '2025-07-02 20:48:11', '2025-07-02 20:48:11'),
(17, 'participant', 'hedj', 'uhjhhhvzi@gmail.com', NULL, '$2y$12$36TURqVuM7crrcCJ1t/lweDY9tigrgK2rF6FhXt56QSiHQQeRL4N6', NULL, '2025-07-02 20:51:11', '2025-07-02 20:51:11');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answers_quiz_attempt_id_foreign` (`quiz_attempt_id`),
  ADD KEY `answers_question_id_foreign` (`question_id`),
  ADD KEY `answers_choice_id_foreign` (`choice_id`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `choices_question_id_foreign` (`question_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_quiz_id_foreign` (`quiz_id`);

--
-- Index pour la table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `quizzes_slug_unique` (`slug`),
  ADD KEY `quizzes_user_id_foreign` (`user_id`);

--
-- Index pour la table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_attempts_quiz_id_foreign` (`quiz_id`),
  ADD KEY `quiz_attempts_user_id_foreign` (`user_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `statistics_quiz_id_unique` (`quiz_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `choices`
--
ALTER TABLE `choices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_choice_id_foreign` FOREIGN KEY (`choice_id`) REFERENCES `choices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_quiz_attempt_id_foreign` FOREIGN KEY (`quiz_attempt_id`) REFERENCES `quiz_attempts` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `choices`
--
ALTER TABLE `choices`
  ADD CONSTRAINT `choices_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD CONSTRAINT `quiz_attempts_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quiz_attempts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
