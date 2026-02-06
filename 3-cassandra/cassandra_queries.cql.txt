-- ==========================================
-- Fichier : cassandra_queries.cql
-- Description : Requêtes analytiques pour l'examen
-- ==========================================

USE spotifynov;

-- 1. RECUPERER L'HISTORIQUE D'UN UTILISATEUR
-- C'est la requête la plus fréquente (Page "Récemment écouté")
-- Grâce au CLUSTERING ORDER BY DESC, c'est déjà trié du plus récent au plus vieux.
SELECT * FROM listening_history 
WHERE user_id = 'User_1' 
LIMIT 10;

-- 2. FILTRER PAR PLAGE DE DATE (Time-Series)
-- Trouver ce que User_1 a écouté après 10h05
SELECT track_title, artist_name, timestamp 
FROM listening_history 
WHERE user_id = 'User_1' 
AND timestamp > '2024-02-01 10:05:00';

-- 3. STATISTIQUES PAR GENRE (Avec Index)
-- Attention : Requête moins performante, mais possible grâce à l'index secondaire créé.
SELECT * FROM listening_history 
WHERE genre = 'Electro' 
ALLOW FILTERING;

-- 4. CONSULTER LES COMPTEURS D'ARTISTES
-- Récupérer le nombre total d'écoutes
SELECT * FROM artist_counters;
