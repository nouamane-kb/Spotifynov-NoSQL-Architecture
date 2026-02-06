import redis
import json
import time

# Connexion au serveur Redis
# Assurez-vous que le serveur Redis est lance dans une autre fenetre
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

print("--- 3.1 ARCHITECTURE DU CACHE ---")

# =========================================================
# CACHE 1 : DONNEES CATALOGUE
# Consignes respectees :
# - Pattern Cache-Aside
# - Gestion TTL appropriee
# - Strategie d'invalidation
# =========================================================

print("\n--- TEST DU CACHE 1 : CATALOGUE ---")

# Simulation d'une Base de Données (ex: MongoDB)
fake_db = {
    "artist_101": {"name": "The Weeknd", "genre": "R&B", "followers": 500000},
    "artist_102": {"name": "Daft Punk", "genre": "Electronic", "followers": 1000000}
}

def get_artist_info(artist_id):
    """
    Recupere les infos d'un artiste en utilisant le pattern Cache-Aside.
    """
    cache_key = f"catalogue:artist:{artist_id}"
    
    # ETAPE A : Verification du Cache (Lecture)
    cached_data = r.get(cache_key)
    
    if cached_data:
        print(f"[CACHE HIT] Donnees trouvees dans Redis pour {artist_id}")
        return json.loads(cached_data)
    
    else:
        print(f"[CACHE MISS] Pas dans Redis. Recherche en BDD pour {artist_id}...")
        
        # ETAPE B : Recherche en BDD (Simulation)
        db_data = fake_db.get(artist_id)
        
        if db_data:
            # ETAPE C : Mise en Cache avec TTL (Time To Live)
            # On definit un TTL de 3600 secondes (1 heure) car les infos artistes changent peu.
            # C'est une gestion 'appropriee' pour des donnees semi-statiques.
            r.setex(cache_key, 3600, json.dumps(db_data))
            print(f"[DB READ] Donnees stockees dans Redis avec TTL de 3600s.")
            return db_data
        else:
            print("[ERROR] Artiste introuvable en BDD.")
            return None

def update_artist_followers(artist_id, new_count):
    """
    Met a jour la BDD et applique la Strategie d'Invalidation.
    """
    print(f"\n[UPDATE] Mise a jour des followers pour {artist_id} vers {new_count}")
    
    # 1. Mise a jour de la source de verite (BDD)
    if artist_id in fake_db:
        fake_db[artist_id]['followers'] = new_count
        
        # 2. STRATEGIE D'INVALIDATION
        # Nous supprimons explicitement la cle du cache.
        # Au prochain appel, le systeme sera force de recharger la donnee fraiche depuis la BDD.
        cache_key = f"catalogue:artist:{artist_id}"
        r.delete(cache_key)
        print(f"[INVALIDATION] Cle '{cache_key}' supprimee du cache.")
    else:
        print("Erreur : Artiste inconnu.")

# --- Execution du Scenario Cache Catalogue ---

# 1. Premier appel : Le cache est vide -> Miss + Ecriture
get_artist_info("artist_101")

# 2. Deuxieme appel : La donnee est en cache -> Hit
get_artist_info("artist_101")

# 3. Modification de la donnee (Invalidation)
update_artist_followers("artist_101", 550000)

# 4. Appel apres modification : Le cache a ete vide -> Miss + Recharge nouvelle valeur
data = get_artist_info("artist_101")
if data:
    print(f"Verification : Nouveaux followers = {data['followers']}")


# =========================================================
# CACHE 2 : CLASSEMENTS (TOP 100)
# Consignes respectees :
# - Top 100 des pistes les plus ecoutees
# - Structure optimale (ZSET)
# - Mise a jour incrementale
# =========================================================

print("\n--- TEST DU CACHE 2 : CLASSEMENTS ---")

def record_track_play(track_name):
    """
    Enregistre une ecoute pour le classement.
    Utilisation de ZSET (Sorted Set) qui est la structure optimale pour les classements.
    """
    key = "leaderboard:top_tracks"
    
    # ZINCRBY incremente le score de 1. Si la piste n'existe pas, elle est ajoutee.
    r.zincrby(key, 1, track_name)
    print(f"[PLAY] Lecture enregistree pour : {track_name}")

def get_top_100():
    """
    Recupere le Top 100 trie par score decroissant.
    """
    key = "leaderboard:top_tracks"
    
    # ZREVRANGE recupere les elements du plus grand score au plus petit.
    # 0 a 99 correspond au Top 100.
    top_tracks = r.zrevrange(key, 0, 99, withscores=True)
    
    print("\n--- CLASSEMENT ACTUEL (TOP 100) ---")
    rank = 1
    for track, score in top_tracks:
        print(f"#{rank} {track} : {int(score)} ecoutes")
        rank += 1

# --- Execution du Scenario Classement ---

# Simulation de lectures
record_track_play("Blinding Lights")
record_track_play("Starboy")
record_track_play("Blinding Lights") # 2eme ecoute
record_track_play("Die For You")
record_track_play("Blinding Lights") # 3eme ecoute
record_track_play("Starboy")         # 2eme ecoute

# Affichage du resultat
get_top_100()

# Expiration du classement (Optionnel : Reset chaque semaine)
r.expire("leaderboard:top_tracks", 604800)
print("[TTL] Le classement expirera dans 1 semaine.")