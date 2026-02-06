import redis
import time
import json

# Connexion au serveur Redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

print("==========================================")
print("   SCENARIO DE TEST GLOBAL - SPOTIFYNOV   ")
print("==========================================")

# Nettoyage prealable pour le test (Optionnel)
r.flushdb()
print("[INIT] Base de donnees nettoyee pour le test.\n")


# --- ETAPE 1 : CREATION DE SESSION ---
print("--- ETAPE 1 : Connexion Utilisateur (Session) ---")
user_id = "user_999"
username = "TestUser"

# Simulation de connexion
session_data = {
    "username": username,
    "premium": "True",
    "last_login": time.ctime()
}
r.hset(f"session:{user_id}", mapping=session_data)
r.expire(f"session:{user_id}", 300) # 5 minutes TTL

# Verification
saved_session = r.hgetall(f"session:{user_id}")
print(f" >> Session active : {saved_session['username']} (Premium: {saved_session['premium']})")


# --- ETAPE 2 : UTILISATION DU CACHE ---
print("\n--- ETAPE 2 : Consultation Catalogue (Cache) ---")
artist_id = "art_55"

# 1. Verification Cache (Doit etre vide au debut)
cached = r.get(f"artist:{artist_id}")
if not cached:
    print(" >> [MISS] Pas en cache. Simulation requete BDD...")
    # Simulation donnee BDD
    artist_data = {"name": "Daft Punk", "genre": "Electro"}
    # Mise en cache
    r.setex(f"artist:{artist_id}", 60, json.dumps(artist_data))
    print(" >> [CACHE] Donnee stockee dans Redis.")

# 2. Re-verification (Doit etre la maintenant)
cached_again = r.get(f"artist:{artist_id}")
if cached_again:
    print(f" >> [HIT] Lecture depuis Redis : {cached_again}")


# --- ETAPE 3 : INCREMENTATION COMPTEURS ---
print("\n--- ETAPE 3 : Ecoute et Statistiques (Compteurs) ---")
track = "Get Lucky"

# 1. Compteur temps reel (Utilisateurs actifs)
r.incr("stats:users_active")
print(f" >> Utilisateurs actifs : {r.get('stats:users_active')}")

# 2. Stats de la chanson
r.incr(f"stats:track:{track}")
print(f" >> Nombre d'ecoutes pour '{track}' : {r.get(f'stats:track:{track}')}")

# 3. Ajout a l'historique recent (Liste)
r.lpush(f"history:{user_id}", track)
print(f" >> Historique mis a jour pour {username}")


# --- ETAPE 4 : AFFICHAGE RESULTATS FINAUX ---
print("\n==========================================")
print("        RAPPORT FINAL DU TEST             ")
print("==========================================")

print(f"1. Session Utilisateur : {r.exists(f'session:{user_id}')} (1=OK, 0=KO)")
print(f"2. Cache Artiste       : {r.exists(f'artist:{artist_id}')} (1=OK, 0=KO)")
print(f"3. Ecoutes 'Get Lucky' : {r.get(f'stats:track:{track}')}")
print("==========================================")
print("TEST REUSSI.")