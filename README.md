# Shoped

Jeu de traduction EN -> FR en temps reel, avec chronometre et effets sonores dynamiques.

## Fonctionnalites

- **Mode Chrono** - traduis le plus de phrases possible avant la fin du temps (defaut : 60s)
- **Mode N phrases** - choisis un nombre fixe de phrases a traduire (defaut : 10)
- **Streak sonore** - le son de bonne reponse monte en pitch de 0 a 10 phrases consecutives
- **Validation souple** - tolere les petites fautes de frappe (similarite >= 90%)
- **Live hints** - les mots corrects s'illuminent en vert pendant la saisie
- **Compte Google** - sauvegarde du meilleur score, historique et stats au clic sur le compte
- **Mode invite** - jouer sans compte (aucun score enregistre, session non persistante)

## Stack

- HTML / CSS / JS vanilla -- aucune dependance frontend
- Firebase Auth + Realtime Database + Firestore
- Chart.js pour les graphiques de resultats et de progression
- Lottie pour la mascotte animée

## Lancer localement

Ouvrir `index.html` dans un navigateur. Aucun build necessaire.

> Les fichiers audio (`correct.mp3`, `incorrect.mp3`, `achievement.mp3`) doivent etre presents dans le dossier `assets/`.
