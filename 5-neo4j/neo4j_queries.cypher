// =========================================================
// PARTIE 4.2 : REQUETES CYPHER (10 points)
// =========================================================

// --- 1. FILTRAGE UTILISATEURS ---
// Objectif : Trouver les utilisateurs Premium du Maroc qui suivent au moins 2 personnes.
// Logique : On filtre sur les propriétés (Pays, Premium) puis on compte les relations sortantes (size).
MATCH (u:User)-[:FOLLOWS]->(friend)
WHERE u.country = 'Morocco' AND u.premium = true
WITH u, count(friend) AS nb_following
WHERE nb_following >= 2
RETURN u.username, u.country, nb_following;

// --- 2. RECOMMANDATIONS (Collaborative Filtering) ---
// Objectif : Pour 'User_1', recommander des pistes écoutées par ses amis
// mais qu'il n'a PAS encore écoutées lui-même.
// Logique : 
// 1. Trouver les amis de User_1.
// 2. Trouver ce que ces amis écoutent.
// 3. Exclure ce que User_1 a déjà écouté (WHERE NOT).
// 4. Compter combien d'amis écoutent chaque titre pour trier par popularité.
MATCH (u1:User {username: 'User_1'})-[:FOLLOWS]->(friend:User)
MATCH (friend)-[:LISTENED_TO]->(track:Track)
WHERE NOT (u1)-[:LISTENED_TO]->(track)
RETURN track.title AS Piste_Recommandee, 
       track.artist AS Artiste, 
       count(distinct friend) AS Popularite_Amis
ORDER BY Popularite_Amis DESC
LIMIT 5;

// --- 3. PLUS COURT CHEMIN (Shortest Path) ---
// Objectif : Trouver le chemin social le plus rapide entre 'User_1' et 'User_10'.
// Logique : Utilise la fonction shortestPath() de Neo4j sur les relations FOLLOWS.
// Cela montre les "degrés de séparation".
MATCH (start:User {username: 'User_1'}), (end:User {username: 'User_10'})
MATCH path = shortestPath((start)-[:FOLLOWS*]-(end))
RETURN path;

// --- 4. STATISTIQUES PAR GENRE ---
// Objectif : Popularité de chaque genre.
// Logique : Compter le nombre de nœuds User reliés à chaque Genre par la relation LIKES.
MATCH (u:User)-[:LIKES]->(g:Genre)
RETURN g.name AS Genre, count(u) AS Nombre_Fans
ORDER BY Nombre_Fans DESC;

// --- 5. INFLUENCEURS (Les plus suivis) ---
// Objectif : Identifier les utilisateurs avec le plus de followers entrants.
// Logique : Compter les relations entrantes (<-[:FOLLOWS]-).
MATCH (u:User)<-[:FOLLOWS]-(follower)
RETURN u.username AS Influenceur, count(follower) AS Nb_Followers
ORDER BY Nb_Followers DESC
LIMIT 3;

// --- 6. DETECTION DE COMMUNAUTES (Triangles Sociaux) ---
// Objectif : Trouver des groupes d'amis soudés (A suit B, B suit C, C suit A).
// Logique : Chercher un cycle de 3 relations FOLLOWS qui revient au point de départ.
MATCH (a:User)-[:FOLLOWS]->(b:User)-[:FOLLOWS]->(c:User)-[:FOLLOWS]->(a)
// On s'assure que ce sont des utilisateurs différents
WHERE a <> b AND b <> c AND a <> c
RETURN a.username, b.username, c.username AS Triangle_Social
LIMIT 5;