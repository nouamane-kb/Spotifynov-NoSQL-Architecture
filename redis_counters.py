import redis
import datetime
import time

# Connexion au serveur Redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

print("--- 3.3 COMPTEURS TEMPS REEL ---")

# =========================================================
# 1. COMPTEUR D'UTILISATEURS ACTIFS
# Objectif : Incrementer a la connexion, decrementer a la deconnexion.
# =========================================================
print("\n--- TEST 1 : Utilisateurs Actifs ---")

def user_connected():
    # INCR : Incremente le compteur atomique
    total = r.incr("stats:users_online")
    print(f"[CONNEXION] Nouvel utilisateur ! Total en ligne : {total}")

def user_disconnected():
    # DECR : Decremente le compteur
    total = r.decr("stats:users_online")
    print(f"[DECONNEXION] Utilisateur parti. Total en ligne : {total}")

# Reset pour le test
r.set("stats:users_online", 0)

# Scenario
user_connected()
user_connected()
user_connected()
user_disconnected()


# =========================================================
# 2. STATISTIQUES QUOTIDIENNES
# Objectif : Compter les lectures par jour avec expiration automatique.
# =========================================================
print("\n--- TEST 2 : Stats Quotidiennes ---")

def record_daily_play(track_name):
    # On recupere la date du jour (ex: 2024-02-01)
    today = datetime.date.today()
    
    # Cle composite : stats:DATE:track:NOM
    key = f"stats:{today}:track:{track_name}"
    
    # Incrementation du compteur pour cette chanson AUJOURD'HUI
    count = r.incr(key)
    
    # Expiration automatique apres 24h (86400 secondes)
    # Comme ca, Redis se nettoie tout seul
    r.expire(key, 86400)
    
    print(f"[STAT] {track_name} ecoutee {count} fois le {today}")

# Scenario
record_daily_play("Blinding Lights")
record_daily_play("Blinding Lights")
record_daily_play("Starboy")


# =========================================================
# 3. FILE D'EVENEMENTS (QUEUE)
# Objectif : Traitement asynchrone (FIFO - First In First Out)
# =========================================================
print("\n--- TEST 3 : File d'Evenements (Queue) ---")

def push_event_to_queue(event_type, user):
    event_message = f"{event_type}|{user}"
    # LPUSH : Ajoute a gauche de la liste
    r.lpush("queue:events", event_message)
    print(f"[PUSH] Evenement ajoute : {event_message}")

def process_events():
    print("Traitement des evenements en attente...")
    while True:
        # RPOP : Recupere et supprime le dernier element (droite)
        event = r.rpop("queue:events")
        
        if event:
            print(f" -> [PROCESS] Traitement de : {event}")
        else:
            print(" -> File vide, tout est traite.")
            break

# Scenario
push_event_to_queue("LOGIN", "Nouamane")
push_event_to_queue("PLAY", "Nouamane")
push_event_to_queue("LOGOUT", "Nouamane")

# On traite la file
process_events()