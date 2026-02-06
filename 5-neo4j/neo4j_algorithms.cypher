// =========================================================
// PARTIE 4.3 : ANALYSES AVANCEES (7 points)
// =========================================================

// --- ANALYSE 1 : CALCUL D'INFLUENCE ---
// Consigne : Métrique basée sur le réseau (followers directs et indirects).
// Logique : On donne 1 point par follower direct et 0.5 point par follower indirect (ami d'ami).
MATCH (u:User)<-[:FOLLOWS]-(f1:User)
OPTIONAL MATCH (f1)<-[:FOLLOWS]-(f2:User)
WITH u, count(DISTINCT f1) AS Followers_Directs, count(DISTINCT f2) AS Followers_Indirects
RETURN u.username AS Utilisateur, 
       Followers_Directs, 
       Followers_Indirects, 
       (Followers_Directs * 1.0 + Followers_Indirects * 0.5) AS Score_Influence
ORDER BY Score_Influence DESC
LIMIT 10;

// --- ANALYSE 2 : RECOMMANDATION PAR SIMILARITE ---
// Consigne : Trouver les utilisateurs similaires (Genres + Pistes en commun) avec pondération.
// Logique : 
// - 1 Genre en commun = 1 point
// - 1 Piste en commun = 3 points (car c'est une similarité plus forte)
MATCH (u1:User)-[:LIKES]->(g:Genre)<-[:LIKES]-(u2:User)
WHERE u1.id < u2.id // Pour éviter d'avoir A-B et B-A en double
WITH u1, u2, count(g) as Genres_Communs

OPTIONAL MATCH (u1)-[:LISTENED_TO]->(t:Track)<-[:LISTENED_TO]-(u2)
WITH u1, u2, Genres_Communs, count(t) as Pistes_Communes

// Calcul du score pondéré
WITH u1, u2, Genres_Communs, Pistes_Communes, 
     (Genres_Communs * 1.0 + Pistes_Communes * 3.0) as Score_Similarite
WHERE Score_Similarite > 0
RETURN u1.username AS User_A, 
       u2.username AS User_B, 
       Genres_Communs, 
       Pistes_Communes, 
       Score_Similarite
ORDER BY Score_Similarite DESC
LIMIT 10;

// --- ANALYSE 3 : DECOUVERTE DE NOUVEAUX GENRES ---
// Consigne : Recommander des genres inexplorés basés sur le réseau social.
// Logique : Pour 'User_1', on regarde les genres que ses amis aiment, 
// mais que lui n'aime pas encore.
MATCH (u:User {username: 'User_1'})-[:FOLLOWS]->(friend:User)
MATCH (friend)-[:LIKES]->(g:Genre)
WHERE NOT (u)-[:LIKES]->(g)
RETURN u.username AS Utilisateur, 
       g.name AS Genre_A_Decouvrir, 
       count(distinct friend) AS Popularite_Chez_Amis
ORDER BY Popularite_Chez_Amis DESC;