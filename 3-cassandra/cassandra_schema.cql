-- ==========================================
-- Fichier : cassandra_schema.cql
-- Description : Création du Keyspace et des Tables optimisées
-- ==========================================

-- 1. Création du Keyspace (L'équivalent de la BDD)
-- On utilise SimpleStrategy pour le dev (1 seul noeud)
CREATE KEYSPACE IF NOT EXISTS spotifynov 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE spotifynov;

-- 2. Table : Historique d'écoute (Time-Series)
-- OBJECTIF : Récupérer très vite les dernières écoutes d'un utilisateur.
-- MODELISATION :
-- - Partition Key : user_id (Pour regrouper les données par utilisateur)
-- - Clustering Key : timestamp (Pour trier chronologiquement)
CREATE TABLE IF NOT EXISTS listening_history (
    user_id text,
    session_id uuid,
    track_id text,
    track_title text,
    artist_name text,
    genre text,
    timestamp timestamp,
    duration_played int, -- Combien de temps il a écouté (en secondes)
    device_type text,    -- Mobile, Desktop, Web
    PRIMARY KEY ((user_id), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
-- NOTE : 'DESC' permet d'avoir les écoutes les plus récentes en premier (comme sur Spotify)

-- 3. Table : Compteurs d'écoutes par Artiste
-- OBJECTIF : Incrémenter des compteurs sans lire la donnée (Write-Heavy)
CREATE TABLE IF NOT EXISTS artist_counters (
    artist_name text,
    total_plays counter,
    PRIMARY KEY (artist_name)
);

-- 4. Index Secondaires (Pour des filtres simples)
-- Permet de faire : SELECT * FROM listening_history WHERE genre = 'Rock';
CREATE INDEX IF NOT EXISTS idx_genre ON listening_history(genre);
