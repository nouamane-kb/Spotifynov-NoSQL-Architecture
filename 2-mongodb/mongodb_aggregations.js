// ==========================================
// Fichier : mongodb_aggregations.js
// Projet : SpotifYnov - Partie 1.4
// Description : Pipelines d'agrégation pour l'analyse de données
// ==========================================

print("--- DÉBUT DES AGRÉGATIONS ---");

// 1. TOP ARTISTES (Classement par nombre d'albums)
// On compte combien d'albums possède chaque artiste et on trie.
print("\n--- 1. Top Artistes (par nombre d'albums) ---");
var topArtists = db.albums.aggregate([
    {
        $group: {
            _id: "$artist", // On regroupe par nom d'artiste
            nombre_albums: { $sum: 1 } // On compte 1 pour chaque album trouvé
        }
    },
    { $sort: { nombre_albums: -1 } } // On trie du plus grand au plus petit
]);
// Affichage des résultats
topArtists.forEach(doc => print(doc._id + " : " + doc.nombre_albums + " albums"));


// 2. STATISTIQUES PAR GENRE (Durée totale)
// On veut savoir quel genre musical a le plus de minutes de musique au total.
print("\n--- 2. Durée totale par genre musical (en minutes) ---");
var statsGenre = db.albums.aggregate([
    { $unwind: "$genres" }, // Si un album a 2 genres, on le sépare en 2 lignes
    {
        $group: {
            _id: "$genres",
            duree_totale: { $sum: "$duration_total" } // On additionne les durées
        }
    },
    { $sort: { duree_totale: -1 } }
]);
statsGenre.forEach(doc => print("Genre " + doc._id + " : " + doc.duree_totale + " min"));


// 3. ANALYSE GÉOGRAPHIQUE (Artistes par pays)
// Combien d'artistes y a-t-il par pays ?
print("\n--- 3. Répartition des artistes par pays ---");
var geoStats = db.artists.aggregate([
    {
        $group: {
            _id: "$country",
            nombre_artistes: { $sum: 1 }
        }
    },
    { $sort: { nombre_artistes: -1 } }
]);
geoStats.forEach(doc => print(doc._id + " : " + doc.nombre_artistes + " artistes"));


// 4. PIPELINE COMPLEXE (LOOKUP - Jointure)
// Le défi : Relier les albums aux artistes pour voir les détails de l'artiste à côté de son album.
// C'est l'équivalent d'une JOINTURE (JOIN) en SQL.
print("\n--- 4. Albums enrichis avec infos Artiste (Lookup) ---");
var jointure = db.albums.aggregate([
    { $match: { artist: "The Weeknd" } }, // On filtre juste pour l'exemple (sinon c'est trop long)
    {
        $lookup: {
            from: "artists",       // La collection à rejoindre
            localField: "artist",  // Le champ dans ALBUMS (nom de l'artiste)
            foreignField: "name",  // Le champ dans ARTISTS (nom)
            as: "infos_artiste"    // Où stocker le résultat
        }
    },
    {
        $project: { // On choisit quoi afficher pour que ce soit propre
            title: 1,
            "infos_artiste.country": 1,
            "infos_artiste.streaming_stats": 1
        }
    }
]);

jointure.forEach(doc => {
    // Petit nettoyage pour l'affichage car le lookup renvoie un tableau
    var pays = doc.infos_artiste[0] ? doc.infos_artiste[0].country : "Inconnu";
    print("Album : " + doc.title + " | Pays de l'artiste : " + pays);
});

print("\n--- FIN DES AGRÉGATIONS ---");