// ==========================================
// Fichier : mongodb_indexes.js
// Projet : SpotifYnov - Partie 1.2
// Description : Création des index pour optimiser les performances
// ==========================================

// --- 1. INDEX SUR LES GENRES (Artists) ---
// Justification : Optimise la recherche d'artistes par style musical (ex: trouver tous les artistes 'Rock').
// C'est une requête très fréquente sur une plateforme de streaming.
db.artists.createIndex({ "genres": 1 });
print(" Index créé : Recherche par genre (Artistes)");

// --- 2. INDEX SUR LA DATE DE SORTIE (Albums) ---
// Justification : Optimise le tri chronologique des albums.
// Nécessaire pour la requête 1.3.1 : "Trouver les albums sortis après une date, triés par date décroissante".
db.albums.createIndex({ "release_date": -1 }); 
// Note : -1 signifie tri décroissant (du plus récent au plus ancien)
print(" Index créé : Tri par date de sortie (Albums)");

// --- 3. INDEX TEXTUEL (Recherche Full-Text) ---
// Justification : Permet une recherche par mots-clés (ex: taper "Daft" pour trouver "Daft Punk").
// Beaucoup plus puissant qu'une simple égalité.
db.artists.createIndex({ "name": "text" });
db.albums.createIndex({ "title": "text" });
print(" Index créés : Recherche textuelle sur les noms et titres");

// --- 4. CONTRAINTE D'UNICITÉ (Intégrité des données) ---
// Justification : Empêche la création de doublons. 
// On ne veut pas avoir deux artistes avec exactement le même nom dans la base.
db.artists.createIndex({ "name": 1 }, { unique: true });
print(" Index créé : Unicité des noms d'artistes");

// --- 5. INDEX COMPOSÉ (Optimisation avancée) ---
// Justification : Optimise la recherche d'albums d'un artiste spécifique triés par date.
// Si on affiche la page d'un artiste, on veut voir ses albums récents en premier.
db.albums.createIndex({ "artist": 1, "release_date": -1 });
print(" Index créé : Albums par artiste triés par date");