#  Spotifynov - Architecture NoSQL Distribuée

##  Présentation du Projet
Réalisation d'une infrastructure de données pour une plateforme de streaming musical (Projet d'examen NoSQL & Big Data - Ynov Maroc). L'objectif est de démontrer la **Persistance Polyglotte** en utilisant chaque base de données pour ses points forts.

##  Stack Technique & Cas d'usage
* **MongoDB** : Gestion du catalogue (Artistes, Albums, Titres). Modèle orienté documents.
* **Cassandra** : Stockage massif des logs d'écoute (High Availability & Scalability).
* **Redis** : Gestion des sessions utilisateurs et mise en cache des compteurs de lecture.
* **Neo4j** : Moteur de recommandation basé sur les relations sociales et préférences musicales.

##  Structure du Dépôt
- `/mongodb` : Scripts de création de schémas et agrégations.
- `/cassandra` : Modélisation des tables et requêtes de colonnes.
- `/redis` : Scripts Python pour la gestion du cache.
- `/neo4j` : Requêtes Cypher pour les graphes de recommandation.

---
**Auteur :** Nouamane Kharroub  
**Formation :** B3 Data & Artificial Intelligence  
**Date :** Février 2026
