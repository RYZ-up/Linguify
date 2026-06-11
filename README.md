# Linguify

Jeu de traduction EN -> FR en temps reel, avec chronometre, classement live et effets sonores dynamiques.

## Fonctionnalites

- **Mode Chrono** - traduis le plus de phrases possible avant la fin du temps (defaut : 60s)
- **Mode N phrases** - choisis un nombre fixe de phrases a traduire (defaut : 10)
- **Streak sonore** - le son de bonne reponse monte en pitch de 0 a 10 phrases consecutives
- **Classement live** - leaderboard temps reel via Firebase, visible en sidebar (desktop)
- **Correction souple** - tolere les petites fautes de frappe (distance de Levenshtein)
- **Live hints** - les mots corrects s'illuminent en vert pendant la saisie
- **Compte Google** - sauvegarde du meilleur score et historique
- **Mode invite** - jouer sans compte (aucun score enregistre, session non persistante)

## Stack

- HTML / CSS / JS vanilla -- aucune dependance frontend
- Firebase Auth + Realtime Database
- Chart.js pour les graphiques de resultats
- Lottie pour l'animation de la sidebar

## Lancer localement

Ouvrir `index.html` dans un navigateur. Aucun build necessaire.

> Les fichiers audio (`correct.mp3`, `incorrect.mp3`, `achievement.mp3`) doivent etre presents a la racine du projet.

