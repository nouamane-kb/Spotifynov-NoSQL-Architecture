// ==========================================
// Fichier : mongodb_insert.js
// Description : Insertion des données de test
// ==========================================

// --- INSERTION ARTISTES (15) ---
db.artists.insertMany([
  { "name": "ElGrandeToto", "country": "Morocco", "genres": ["Trap", "Rap"], "bio": "Star du rap.", "formation_year": 2016, "members": ["Taha Fahssi"], "social_networks": { "instagram": "@elgrandetoto" }, "streaming_stats": { "monthly_listeners": 4500000 } },
  { "name": "Daft Punk", "country": "France", "genres": ["Electro"], "bio": "Robots.", "formation_year": 1993, "members": ["Thomas", "Guy-Man"], "social_networks": { "twitter": "@daftpunk" }, "streaming_stats": { "monthly_listeners": 20000000 } },
  { "name": "The Weeknd", "country": "Canada", "genres": ["Pop", "R&B"], "bio": "Star.", "formation_year": 2010, "members": ["Abel Tesfaye"], "social_networks": { "instagram": "@theweeknd" }, "streaming_stats": { "monthly_listeners": 105000000 } },
  { "name": "Manal", "country": "Morocco", "genres": ["Pop"], "bio": "Chanteuse.", "formation_year": 2015, "members": ["Manal Benchakha"], "social_networks": { "instagram": "@manal" }, "streaming_stats": { "monthly_listeners": 1500000 } },
  { "name": "Arctic Monkeys", "country": "UK", "genres": ["Rock"], "bio": "Band.", "formation_year": 2002, "members": ["Alex Turner"], "social_networks": { "instagram": "@arcticmonkeys" }, "streaming_stats": { "monthly_listeners": 45000000 } },
  { "name": "Rosalía", "country": "Spain", "genres": ["Flamenco"], "bio": "Motomami.", "formation_year": 2013, "members": ["Rosalía"], "social_networks": { "instagram": "@rosalia" }, "streaming_stats": { "monthly_listeners": 38000000 } },
  { "name": "Burna Boy", "country": "Nigeria", "genres": ["Afrobeats"], "bio": "Giant.", "formation_year": 2010, "members": ["Damini"], "social_networks": { "instagram": "@burnaboy" }, "streaming_stats": { "monthly_listeners": 18000000 } },
  { "name": "BTS", "country": "South Korea", "genres": ["K-pop"], "bio": "Kpop Kings.", "formation_year": 2013, "members": ["RM", "Jin", "Suga"], "social_networks": { "instagram": "@bts" }, "streaming_stats": { "monthly_listeners": 30000000 } },
  { "name": "Stromae", "country": "Belgium", "genres": ["Pop"], "bio": "Maestro.", "formation_year": 2000, "members": ["Paul"], "social_networks": { "instagram": "@stromae" }, "streaming_stats": { "monthly_listeners": 12000000 } },
  { "name": "Tame Impala", "country": "Australia", "genres": ["Psychedelic"], "bio": "Kevin Parker.", "formation_year": 2007, "members": ["Kevin Parker"], "social_networks": { "instagram": "@tameimpala" }, "streaming_stats": { "monthly_listeners": 25000000 } },
  { "name": "Bad Bunny", "country": "Puerto Rico", "genres": ["Reggaeton"], "bio": "Benito.", "formation_year": 2016, "members": ["Benito"], "social_networks": { "instagram": "@badbunny" }, "streaming_stats": { "monthly_listeners": 70000000 } },
  { "name": "Billie Eilish", "country": "USA", "genres": ["Alt-Pop"], "bio": "Billie.", "formation_year": 2015, "members": ["Billie"], "social_networks": { "instagram": "@billie" }, "streaming_stats": { "monthly_listeners": 65000000 } },
  { "name": "Måneskin", "country": "Italy", "genres": ["Rock"], "bio": "Italian Rock.", "formation_year": 2016, "members": ["Damiano"], "social_networks": { "instagram": "@maneskin" }, "streaming_stats": { "monthly_listeners": 22000000 } },
  { "name": "Lartiste", "country": "Morocco", "genres": ["Raï"], "bio": "Chocolat.", "formation_year": 2008, "members": ["Youssef"], "social_networks": { "instagram": "@lartiste" }, "streaming_stats": { "monthly_listeners": 3500000 } },
  { "name": "Imagine Dragons", "country": "USA", "genres": ["Rock"], "bio": "Dragons.", "formation_year": 2008, "members": ["Dan"], "social_networks": { "instagram": "@imaginedragons" }, "streaming_stats": { "monthly_listeners": 55000000 } }
]);

// --- INSERTION ALBUMS (30 - Extrait) ---
db.albums.insertMany([
  { "title": "Cameleon", "artist": "ElGrandeToto", "release_date": ISODate("2021-03-05"), "duration_total": 52, "tracks": [{ "name": "Mghayer", "duration": 210 }] },
  { "title": "27", "artist": "ElGrandeToto", "release_date": ISODate("2023-11-24"), "duration_total": 48, "tracks": [{ "name": "Dellali", "duration": 205 }] },
  { "title": "Discovery", "artist": "Daft Punk", "release_date": ISODate("2001-03-12"), "duration_total": 60, "tracks": [{ "name": "One More Time", "duration": 320 }] },
  { "title": "RAM", "artist": "Daft Punk", "release_date": ISODate("2013-05-17"), "duration_total": 74, "tracks": [{ "name": "Giorgio", "duration": 544 }] }, // Piste longue pour requête 1.3.5
  { "title": "After Hours", "artist": "The Weeknd", "release_date": ISODate("2020-03-20"), "duration_total": 56, "tracks": [{ "name": "Blinding Lights", "duration": 200 }] },
  { "title": "Dawn FM", "artist": "The Weeknd", "release_date": ISODate("2022-01-07"), "duration_total": 52, "tracks": [{ "name": "Sacrifice", "duration": 189 }] },
  { "title": "360", "artist": "Manal", "release_date": ISODate("2021-05-21"), "duration_total": 40, "tracks": [{ "name": "Niya", "duration": 180 }] },
  { "title": "Arabian Lioness", "artist": "Manal", "release_date": ISODate("2024-10-02"), "duration_total": 35, "tracks": [{ "name": "Maak", "duration": 190 }] },
  { "title": "AM", "artist": "Arctic Monkeys", "release_date": ISODate("2013-09-09"), "duration_total": 41, "tracks": [{ "name": "Do I Wanna Know?", "duration": 272 }] },
  { "title": "The Car", "artist": "Arctic Monkeys", "release_date": ISODate("2022-10-21"), "duration_total": 37, "tracks": [{ "name": "Body Paint", "duration": 290 }] },
  { "title": "El Mal Querer", "artist": "Rosalía", "release_date": ISODate("2018-11-02"), "duration_total": 30, "tracks": [{ "name": "Malamente", "duration": 150 }] },
  { "title": "Motomami", "artist": "Rosalía", "release_date": ISODate("2022-03-18"), "duration_total": 42, "tracks": [{ "name": "Saoko", "duration": 137 }] },
  { "title": "African Giant", "artist": "Burna Boy", "release_date": ISODate("2019-07-26"), "duration_total": 53, "tracks": [{ "name": "On the Low", "duration": 185 }] },
  { "title": "Love, Damini", "artist": "Burna Boy", "release_date": ISODate("2022-07-08"), "duration_total": 60, "tracks": [{ "name": "Last Last", "duration": 170 }] },
  { "title": "Map of the Soul: 7", "artist": "BTS", "release_date": ISODate("2020-02-21"), "duration_total": 74, "tracks": [{ "name": "ON", "duration": 246 }] },
  { "title": "Proof", "artist": "BTS", "release_date": ISODate("2022-06-10"), "duration_total": 120, "tracks": [{ "name": "Yet To Come", "duration": 193 }] },
  { "title": "Racine Carrée", "artist": "Stromae", "release_date": ISODate("2013-08-16"), "duration_total": 42, "tracks": [{ "name": "Papaoutai", "duration": 232 }] },
  { "title": "Multitude", "artist": "Stromae", "release_date": ISODate("2022-03-04"), "duration_total": 35, "tracks": [{ "name": "L'enfer", "duration": 189 }] },
  { "title": "Currents", "artist": "Tame Impala", "release_date": ISODate("2015-07-17"), "duration_total": 51, "tracks": [{ "name": "Let It Happen", "duration": 467 }] },
  { "title": "The Slow Rush", "artist": "Tame Impala", "release_date": ISODate("2020-02-14"), "duration_total": 57, "tracks": [{ "name": "Borderline", "duration": 237 }] },
  { "title": "Un Verano Sin Ti", "artist": "Bad Bunny", "release_date": ISODate("2022-05-06"), "duration_total": 81, "tracks": [{ "name": "Tití Me Preguntó", "duration": 243 }] },
  { "title": "Nadie Sabe", "artist": "Bad Bunny", "release_date": ISODate("2023-10-13"), "duration_total": 81, "tracks": [{ "name": "Monaco", "duration": 267 }] },
  { "title": "When We All Fall Asleep", "artist": "Billie Eilish", "release_date": ISODate("2019-03-29"), "duration_total": 42, "tracks": [{ "name": "Bad Guy", "duration": 194 }] },
  { "title": "Hit Me Hard and Soft", "artist": "Billie Eilish", "release_date": ISODate("2024-05-17"), "duration_total": 43, "tracks": [{ "name": "Lunch", "duration": 180 }] },
  { "title": "Teatro d'ira", "artist": "Måneskin", "release_date": ISODate("2021-03-19"), "duration_total": 30, "tracks": [{ "name": "Zitti e buoni", "duration": 192 }] },
  { "title": "Rush!", "artist": "Måneskin", "release_date": ISODate("2023-01-20"), "duration_total": 52, "tracks": [{ "name": "The Loneliest", "duration": 247 }] },
  { "title": "Fenomeno", "artist": "Lartiste", "release_date": ISODate("2018-02-01"), "duration_total": 45, "tracks": [{ "name": "Mafiosa", "duration": 190 }] },
  { "title": "Comme avant", "artist": "Lartiste", "release_date": ISODate("2024-05-15"), "duration_total": 50, "tracks": [{ "name": "Nouveau hit", "duration": 200 }] },
  { "title": "Evolve", "artist": "Imagine Dragons", "release_date": ISODate("2017-06-23"), "duration_total": 39, "tracks": [{ "name": "Believer", "duration": 204 }] },
  { "title": "Loom", "artist": "Imagine Dragons", "release_date": ISODate("2024-06-28"), "duration_total": 30, "tracks": [{ "name": "Eyes Closed", "duration": 182 }] }
]);

// --- INSERTION PLAYLISTS (10) ---
db.playlists.insertMany([
  { "name": "Top Hits Morocco", "creator": "Ahmed", "visibility": "public", "dates": { "created": ISODate("2024-01-01") }, "tracks": ["Mghayer"], "followers": 5000 },
  { "name": "Rock Classics", "creator": "Sarah", "visibility": "public", "dates": { "created": ISODate("2023-05-10") }, "tracks": ["Do I Wanna Know?"], "followers": 1200 },
  { "name": "Electro", "creator": "Mehdi", "visibility": "public", "dates": { "created": ISODate("2024-02-15") }, "tracks": ["One More Time"], "followers": 850 },
  { "name": "Private Chill", "creator": "User99", "visibility": "private", "dates": { "created": ISODate("2022-11-01") }, "tracks": ["Blinding Lights"], "followers": 10 },
  { "name": "Study", "creator": "Student", "visibility": "public", "dates": { "created": ISODate("2024-06-01") }, "tracks": ["Saoko"], "followers": 300 },
  { "name": "Gym", "creator": "FitPro", "visibility": "public", "dates": { "created": ISODate("2024-09-12") }, "tracks": ["Believer"], "followers": 15000 },
  { "name": "Old Inactive", "creator": "Ghost", "visibility": "private", "dates": { "created": ISODate("2018-01-01") }, "tracks": [], "followers": 0 }, // Playlist pour test suppression 1.3.4
  { "name": "K-Pop", "creator": "Army", "visibility": "public", "dates": { "created": ISODate("2023-12-20") }, "tracks": ["ON"], "followers": 25000 },
  { "name": "Latino", "creator": "Juan", "visibility": "public", "dates": { "created": ISODate("2024-01-10") }, "tracks": ["Tití Me Preguntó"], "followers": 9000 },
  { "name": "Relax", "creator": "Mouna", "visibility": "public", "dates": { "created": ISODate("2024-11-15") }, "tracks": ["Bad Guy"], "followers": 4200 }
]);

print(" Succès : 15 Artistes, 30 Albums, 10 Playlists insérés !");