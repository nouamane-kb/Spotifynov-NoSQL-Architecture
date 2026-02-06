// ==========================================
// Fichier : mongodb_schema.js
// Description : Création des collections avec validation
// ==========================================

// 1. On nettoie (si on relance le script, on repart de zéro)
db.artists.drop();
db.albums.drop();
db.playlists.drop();

// 2. Création de la collection ARTISTS
db.createCollection("artists", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "country", "genres"], // Champs obligatoires
         properties: {
            name: { bsonType: "string" },
            country: { bsonType: "string" },
            genres: { bsonType: "array", items: { bsonType: "string" } },
            bio: { bsonType: "string" },
            formation_year: { bsonType: "int" },
            members: { bsonType: "array", items: { bsonType: "string" } },
            // Objet imbriqué pour les réseaux sociaux
            social_networks: { bsonType: "object" },
            // Objet imbriqué pour les stats
            streaming_stats: { 
               bsonType: "object",
               required: ["monthly_listeners"],
               properties: {
                  monthly_listeners: { bsonType: "int" }
               }
            }
         }
      }
   }
});

// 3. Création de la collection ALBUMS
db.createCollection("albums", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["title", "artist", "release_date", "tracks"],
         properties: {
            title: { bsonType: "string" },
            artist: { bsonType: "string" },
            release_date: { bsonType: "date" }, // Format date obligatoire
            duration_total: { bsonType: "int" },
            // Liste de chansons (objets imbriqués)
            tracks: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["name", "duration"],
                  properties: {
                     name: { bsonType: "string" },
                     duration: { bsonType: "int" }
                  }
               }
            }
         }
      }
   }
});

// 4. Création de la collection PLAYLISTS
db.createCollection("playlists", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "creator"],
         properties: {
            name: { bsonType: "string" },
            creator: { bsonType: "string" },
            visibility: { enum: ["public", "private"] }, // Choix limité
            tracks: { bsonType: "array", items: { bsonType: "string" } },
            followers: { bsonType: "int" }
         }
      }
   }
});

print(" Succès : Schémas créés pour SpotifYnov !");