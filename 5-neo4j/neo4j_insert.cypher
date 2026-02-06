// =========================================================
// PARTIE 4.1 : INSERTION MASSIVE (VERSION CORRIGEE)
// Objectif : Garantir > 60 Follows et > 200 Listens
// =========================================================

// 1. CREATION DES 8 GENRES (Fixe)
CREATE 
  (g1:Genre {name: 'Pop'}), (g2:Genre {name: 'Rock'}), (g3:Genre {name: 'Hip-Hop'}),
  (g4:Genre {name: 'R&B'}), (g5:Genre {name: 'Electronic'}), (g6:Genre {name: 'Jazz'}),
  (g7:Genre {name: 'Classical'}), (g8:Genre {name: 'Metal'});

// 2. GENERATION DE 20 UTILISATEURS (Boucle)
UNWIND range(1, 20) AS i
CREATE (u:User {
  id: 'u' + i,
  username: 'User_' + i,
  // Distribution des pays
  country: CASE i % 4 WHEN 0 THEN 'Morocco' WHEN 1 THEN 'France' WHEN 2 THEN 'USA' ELSE 'UK' END,
  premium: i % 2 = 0, 
  created_at: date('2024-01-01')
});

// 3. GENERATION DE 50 PISTES (Boucle)
UNWIND range(1, 50) AS i
CREATE (t:Track {
  isrc: 'ISRC_' + i,
  title: 'Track_Title_' + i,
  artist: 'Artist_' + (i % 10), 
  duration: 180 + (i * 2)
});

// 4. LIAISON PISTES -> GENRES
MATCH (t:Track)
MATCH (g:Genre)
WHERE rand() < 0.3 
MERGE (t)-[:BELONGS_TO]->(g);

// 5. GENERATION DE RELATIONS SOCIALES (FOLLOWS) -> BOOSTÉE !
// Probabilité passée à 0.5 (1 chance sur 2) pour exploser le quota de 60
MATCH (u1:User)
MATCH (u2:User)
WHERE u1 <> u2 AND rand() < 0.5 
MERGE (u1)-[:FOLLOWS]->(u2);

// 6. GENERATION DE RELATIONS D'ECOUTE (LISTENED_TO)
// Probabilité 0.4 pour garantir > 200 écoutes
MATCH (u:User)
MATCH (t:Track)
WHERE rand() < 0.4 
MERGE (u)-[:LISTENED_TO {
  count: toInteger(rand() * 50) + 1, 
  last_listening: date('2025-01-01')
}]->(t);

// 7. GENERATION DE PREFERENCES (LIKES)
MATCH (u:User)
MATCH (g:Genre)
WHERE rand() < 0.3
MERGE (u)-[:LIKES]->(g);