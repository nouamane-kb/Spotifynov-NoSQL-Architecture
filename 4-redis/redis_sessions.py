import redis
import time

# Connexion au serveur Redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

print("--- 3.2 GESTION DES SESSIONS UTILISATEUR ---")

# =========================================================
# FONCTIONNALITES REQUISES
# 1. Creation de session
# 2. Recuperation et prolongation du TTL
# 3. Mise a jour (lecture en cours)
# 4. Deconnexion
# =========================================================

def login_user(user_id, username, is_premium):
    """
    Cree une nouvelle session utilisateur.
    Stocke les donnees demandees : ID, Statut Premium, Piste, Activite.
    """
    session_key = f"session:{user_id}"
    
    # Donnees de session (Hash Map)
    session_data = {
        "user_id": user_id,
        "username": username,
        "is_premium": str(is_premium), # Redis stocke des chaines
        "current_track": "None",
        "last_activity": time.ctime(),
        "preferences": "Pop, Rock"
    }
    
    # Stockage dans Redis (HSET)
    r.hset(session_key, mapping=session_data)
    
    # Definition du TTL initial (30 secondes pour le test)
    r.expire(session_key, 30)
    
    print(f"[LOGIN] Session creee pour {username} (TTL: 30s)")

def get_session(user_id):
    """
    Recupere les infos de session et PROLONGE la duree de vie (TTL).
    """
    session_key = f"session:{user_id}"
    
    if r.exists(session_key):
        # Recuperation des donnees
        data = r.hgetall(session_key)
        
        # PROLONGATION AUTOMATIQUE DU TTL (Reset a 30s)
        r.expire(session_key, 30)
        
        print(f"[ACCESS] Session active pour {data['username']}. TTL prolonge.")
        return data
    else:
        print(f"[ACCESS DENIED] Session expiree ou inexistante pour {user_id}")
        return None

def update_current_track(user_id, track_name):
    """
    Met a jour la piste en cours de lecture.
    """
    session_key = f"session:{user_id}"
    
    if r.exists(session_key):
        # Mise a jour du champ specific
        r.hset(session_key, "current_track", track_name)
        r.hset(session_key, "last_activity", time.ctime())
        
        # On prolonge aussi la session car c'est une activite
        r.expire(session_key, 30)
        
        print(f"[UPDATE] Piste en cours : {track_name}")
    else:
        print("[ERROR] Impossible de mettre a jour : Session introuvable.")

def logout_user(user_id):
    """
    Deconnecte l'utilisateur en supprimant la cle.
    """
    session_key = f"session:{user_id}"
    r.delete(session_key)
    print(f"[LOGOUT] Utilisateur {user_id} deconnecte proprement.")

# --- SCENARIO DE TEST (Demonstration pour l'examen) ---

print("\n--- 1. Connexion ---")
login_user("u_1001", "Nouamane", 1)

print("\n--- 2. Lecture d'une musique ---")
update_current_track("u_1001", "After Hours - The Weeknd")

print("\n--- 3. Verification et Prolongation ---")
# On verifie que la session existe
info = get_session("u_1001")
if info:
    print(f"INFO SESSION : User={info['username']}, Track={info['current_track']}")

print("\n--- 4. Deconnexion ---")
logout_user("u_1001")

print("\n--- 5. Verification post-deconnexion ---")
get_session("u_1001")