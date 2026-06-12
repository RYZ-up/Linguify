# Linguify

Jeu de traduction EN → FR en temps réel, avec chronomètre et effets sonores dynamiques.

## Fonctionnalités

- **Mode Chrono** — traduis le plus de phrases possible avant la fin du temps (défaut : 60s)
- **Mode N phrases** — choisis un nombre fixe de phrases à traduire (défaut : 10)
- **5 niveaux de difficulté** — de A1/A2 (présent simple) jusqu'à C2 (philosophique/académique), 400 phrases par niveau
- **Streak sonore** — le son de bonne réponse monte en pitch de 0 à 10 phrases consécutives
- **Live hints** — les mots corrects s'illuminent pendant la saisie
- **Compte Google** — sauvegarde du meilleur score, historique et stats
- **Mode invité** — jouer sans compte (aucun score enregistré)

## Correction intelligente (5 couches)

1. **Correspondance exacte** — après normalisation (sans accents, casse, ponctuation)
2. **Similarité haute** — Levenshtein ≥ 90 % (tolère les petites fautes de frappe)
3. **Mode souple** — distance configurable selon la longueur de la réponse
4. **Pronoms + formes verbales** — `il` ↔ `elle`, `on` ↔ `nous`, `peut` ↔ `pouvons`, `est` ↔ `sont`, etc. — conjugaisons différentes mais sens identique acceptées
5. **Mots de contenu triés** — articles, pronoms et prépositions ignorés ; les mots restants sont triés avant comparaison, ce qui accepte les inversions sans changement de sens

## Stack

- HTML / CSS / JS vanilla — aucune dépendance frontend
- Firebase Auth + Realtime Database + Firestore
- Chart.js pour les graphiques de résultats et de progression
- Lottie pour la mascotte animée

## Lancer localement

Ouvrir `index.html` dans un navigateur. Aucun build nécessaire.

> Les fichiers audio (`correct.mp3`, `incorrect.mp3`, `achievement.mp3`) doivent être présents dans le dossier `assets/`.
