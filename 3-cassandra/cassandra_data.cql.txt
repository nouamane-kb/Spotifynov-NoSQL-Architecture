-- ==========================================
-- Fichier : cassandra_data.cql
-- Description : Insertion de données de test (Data Seeding)
-- ==========================================

USE spotifynov;

-- Insertion d'écoutes pour l'utilisateur 'User_1'
-- Note : On insère des timestamps différents pour simuler une historique

INSERT INTO listening_history (user_id, session_id, track_id, track_title, artist_name, genre, timestamp, duration_played, device_type)
VALUES ('User_1', uuid(), 't1', 'Blinding Lights', 'The Weeknd', 'Pop', '2024-02-01 10:00:00', 200, 'Mobile');

INSERT INTO listening_history (user_id, session_id, track_id, track_title, artist_name, genre, timestamp, duration_played, device_type)
VALUES ('User_1', uuid(), 't2', 'Starboy', 'The Weeknd', 'Pop', '2024-02-01 10:05:00', 230, 'Mobile');

INSERT INTO listening_history (user_id, session_id, track_id, track_title, artist_name, genre, timestamp, duration_played, device_type)
VALUES ('User_1', uuid(), 't3', 'Get Lucky', 'Daft Punk', 'Electro', '2024-02-01 10:10:00', 240, 'Desktop');

-- Insertion d'écoutes pour 'User_2'
INSERT INTO listening_history (user_id, session_id, track_id, track_title, artist_name, genre, timestamp, duration_played, device_type)
VALUES ('User_2', uuid(), 't5', 'Shape of You', 'Ed Sheeran', 'Pop', '2024-02-02 14:00:00', 233, 'Web');

INSERT INTO listening_history (user_id, session_id, track_id, track_title, artist_name, genre, timestamp, duration_played, device_type)
VALUES ('User_2', uuid(), 't6', 'Bad Guy', 'Billie Eilish', 'Pop', '2024-02-02 14:05:00', 194, 'Web');

-- Mise à jour des compteurs (Table Counters)
-- Note : En Cassandra, on ne fait pas INSERT mais UPDATE pour les compteurs
UPDATE artist_counters SET total_plays = total_plays + 1 WHERE artist_name = 'The Weeknd';
UPDATE artist_counters SET total_plays = total_plays + 1 WHERE artist_name = 'The Weeknd'; -- 2 écoutes
UPDATE artist_counters SET total_plays = total_plays + 1 WHERE artist_name = 'Daft Punk';
