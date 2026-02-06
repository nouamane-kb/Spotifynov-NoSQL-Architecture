// ==========================================
// Fichier : mongodb_queries.js
// Projet : SpotifYnov - Partie 1.3
// Description : Implémentation des opérations CRUD demandées
// ==========================================

// 1. TROUVER DES ALBUMS RÉCENTS (Read)
// Consigne : Trouver tous les albums sortis après une date donnée, triés par date décroissante.
// On cherche les albums sortis après le 1er Janvier 2020.
print("--- 1. Albums sortis après 2020 (Triés par date) ---");
var cursor = db.albums.find(
    { "release_date": { $gt: ISODate("2020-01-01") } } 
).sort({ "release_date": -1 });

// On affiche les résultats proprement
cursor.forEach(album => {
    print("Album : " + album.title + " | Date : " + album.release_date.toISOString().split('T')[0]);
});


// 2. METTRE À JOUR LES STATS D'UN ARTISTE (Update)
// Consigne : Mettre à jour les statistiques d'écoute d'un artiste.
// On augmente le nombre d'auditeurs mensuels de "The Weeknd".
print("\n--- 2. Mise à jour des stats de The Weeknd ---");
db.artists.updateOne(
    { "name": "The Weeknd" }, // Filtre : Qui modifie-t-on ?
    { $set: { "streaming_stats.monthly_listeners": 110000000 } } // Action : Nouvelle valeur
);
print("✅ Stats mises à jour pour The Weeknd.");


// 3. AJOUTER UN MEMBRE À UN GROUPE (Update - Array)
// Consigne : Ajouter un nouveau membre à un groupe musical.
// On ajoute un musicien fictif au groupe "Måneskin".
print("\n--- 3. Ajout d'un membre au groupe Måneskin ---");
db.artists.updateOne(
    { "name": "Måneskin" },
    { $push: { "members": "Nouveau Membre" } } // $push ajoute un élément à la liste (Array)
);
print("✅ Nouveau membre ajouté chez Måneskin.");


// 4. SUPPRIMER LES PLAYLISTS INACTIVES (Delete)
// Consigne : Supprimer les playlists inactives (critère : 0 followers).
print("\n--- 4. Suppression des playlists vides ---");
var result = db.playlists.deleteMany(
    { "followers": 0 } // Critère de suppression
);
print("✅ Playlists supprimées : " + result.deletedCount);


// 5. REQUÊTE COMPLEXE SUR LES PISTES (Read - Filter Array)
// Consigne : Trouver tous les albums contenant des pistes dépassant une durée spécifique.
// On cherche les albums qui ont au moins une chanson de plus de 500 secondes (8 min 20).
print("\n--- 5. Albums avec des chansons très longues (> 500s) ---");
var longAlbums = db.albums.find(
    { "tracks.duration": { $gt: 500 } } // MongoDB cherche intelligemment DANS la liste des pistes
);

longAlbums.forEach(album => {
    print("Album trouvé : " + album.title + " (Artiste : " + album.artist + ")");
});