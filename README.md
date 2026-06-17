# Linguify

Jeu de traduction EN → FR en temps réel, pensé pour progresser vite. Interface minimaliste, feedback immédiat, IA intégrée pour l'analyse linguistique, système de record basé sur la vitesse.

---

## Fonctionnalités

### Modes de jeu

| Mode          | Description                                                                |
|---------------|-----------------------------------------------------------------------------|
| **N phrases** | Nombre fixe de phrases à traduire (1–50). Le chrono tourne librement.       |
| **Chrono**    | Traduction libre pendant X secondes/minutes. Anti-répétition : 70 % du pool vu avant qu'une question revienne. |

### Gameplay
- **5 niveaux de difficulté** — A1 (présent simple) → C2 (philosophique/académique)
- **Streak sonore** — le pitch monte progressivement jusqu'à 10 phrases consécutives correctes
- **Live hints** — les mots corrects s'illuminent pendant la frappe
- **Auto next** — passe automatiquement à la phrase suivante après validation
- **Barre de progression** — visible en mode N phrases
- **Correction souple** — tolère les coquilles légères (Levenshtein configurable)

### Feedback IA (Groq / Llama 3.1)

Une barre de feedback IA est intégrée dans l'écran de jeu, alimentée par un LLM via Netlify Function :

- **Mode live** — analyse le brouillon en cours de frappe (debounce 700 ms), retourne un micro-feedback directif en 1 phrase
- **Mode post** — après validation, confirme la bonne réponse avec un point linguistique, ou explique l'erreur en 2 phrases max
- Le backend appelle `llama-3.1-8b-instant` via l'API Groq — la clé est stockée en variable d'environnement Netlify, jamais dans le code

### Correction intelligente (5 couches)
1. **Correspondance exacte** — après normalisation (sans accents, casse, ponctuation)
2. **Similarité haute** — Levenshtein ≥ 90 % (fautes de frappe légères)
3. **Mode souple** — distance configurable selon la longueur de la réponse
4. **Pronoms + verbes** — `il/elle`, `on/nous`, conjugaisons différentes à sens identique
5. **Mots de contenu triés** — articles/pronoms/prépositions ignorés, mots restants triés

### Modale Correction — step-through
Après chaque session, ouvre la correction en appuyant sur **Correction** ou `Ctrl+M`.

- Navigation phrase par phrase (← Préc. / Suiv. →) ou par clic sur les points de couleur
- Chaque réponse analysée mot par mot :
  - **Vert** = mot trouvé dans la correction / correct
  - **Rouge** = mot absent de la réponse attendue
  - **Jaune** = mot attendu manquant dans ta réponse
- Graphiques de précision et résultats question par question

### Système de record — phrases par minute
Le record compare les performances indépendamment du mode et du nombre de phrases :

```
rate = phrases correctes / temps réel (secondes) × 60
```

**Exemple :** 10 bonnes réponses en 45 s → **13.3 phr/min**

Ce taux est identique que tu joues 10 phrases ou 50, en mode chrono ou en mode comptage — les records sont directement comparables.

### Compte & persistance
- **Google Auth** — sauvegarde du meilleur taux, historique des sessions, graphique de progression
- **Mode invité** — jeu immédiat sans compte (session uniquement, aucun score enregistré)

---

## Raccourcis clavier

| Touche | Action |
|--------|--------|
| `Entrée` | Valider / passer à la phrase suivante |
| `Espace` | Passer à la phrase suivante (après validation) |
| `R` | Rejouer (écran résultats) |
| `Ctrl+M` | Ouvrir / fermer la modale correction |
| `Ctrl+G` | Connexion Google |
| `1`–`5` | Choisir le niveau de difficulté (écran accueil) |
| `Escape` | Fermer modale active / quitter la session |

---

## Stack

| Composant | Technologie |
|-----------|-------------|
| Frontend | HTML / CSS / JS vanilla — zéro dépendance |
| Auth | Firebase Authentication (Google + Anonymous) |
| Base de données | Firebase Realtime Database + Firestore |
| Graphiques | ApexCharts |
| Mascotte | Lottie via `@lottiefiles/lottie-player` |
| Fond | Canvas 2D — effet antigravité interactif |
| PWA | Service Worker + Web Manifest |
| IA | Groq API (llama-3.1-8b-instant) via Netlify Function |
| Déploiement | Netlify (CD automatique depuis `main`) |

---

## Déploiement

Le projet est déployé sur **Netlify**. Le déploiement est automatique à chaque push sur `main`.

### Variable d'environnement requise

| Variable       | Description                                                              |
|----------------|--------------------------------------------------------------------------|
| `GROQ_API_KEY` | Clé API Groq pour le feedback IA — configurer dans les env vars Netlify  |

La clé n'est jamais dans le code source. Elle est injectée au runtime par la Netlify Function `netlify/functions/ai-correct.js`.

### Lancer localement

```bash
# Pour le jeu seul (sans IA) :
open index.html

# Pour le jeu + IA (Netlify Function) :
npm install -g netlify-cli
netlify dev
```

> En `netlify dev`, crée un fichier `.env` local avec `GROQ_API_KEY=ta_cle` — ce fichier est ignoré par git.

---

## Architecture

```
Linguify/
├── index.html                    # App complète (HTML + CSS + JS inlined)
├── sw.js                         # Service Worker (cache offline)
├── manifest.json                 # PWA manifest
├── netlify/
│   └── functions/
│       └── ai-correct.js         # Serverless function — proxy Groq (llama-3.1-8b-instant)
├── assets/
│   ├── logo.png
│   ├── correct.mp3
│   ├── incorrect.mp3
│   └── achievement.mp3
├── firebase-config.example.js    # Template de config Firebase (non utilisé en prod)
├── firebase-rules/               # Règles Firestore et RTDB
├── phrases/                      # Exports locaux des phrases (référence)
└── questions/                    # Exports locaux des questions (référence)
```

Les questions sont chargées depuis Firestore au démarrage et mises en cache dans `localStorage` (`lq_questions_v3`). Les scores et paramètres sont synchronisés dans Firebase Realtime Database par UID.

---

## Paramètres disponibles

| Paramètre | Description |
|-----------|-------------|
| Nombre de phrases | 1–50 (désactivé en mode Chrono) |
| Mode Chrono | Durée en secondes ou minutes |
| Niveau | 1 (A1/A2) → 5 (C1/C2) |
| Flouter le timer | Cache le chrono, révèle au survol |
| Son + Volume | Effets sonores avec pitch adaptatif |
| Indices de traduction | Mots corrects en surbrillance pendant la frappe |
| Correction souple | Tolère les petites erreurs de frappe |
| Barre de progression | Affiche l'avancement en mode N phrases |
| Auto next | Passage automatique à la phrase suivante |
| Animations (Mascotte) | Lottie réactif aux réponses |
| Figer le fond | Pause l'animation canvas |
| Thème | 6 couleurs d'accent (jaune, blanc, violet, rouge, vert, bleu) |

---

## Debug console

### Ping IA (statut + quota Groq)

Colle dans la console du navigateur :

```js
fetch('/api/ai-correct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'ping'})}).then(r=>r.json()).then(d=>{console.log(`🟢 IA up: ${d.ok} | clé: ${d.keyPresent} | requêtes restantes: ${d.remaining}/${d.limit} | reset dans: ${d.reset}`)})
```

Résultat attendu :

```text
🟢 IA up: true | clé: true | requêtes restantes: 14992/15000 | reset dans: 53s
```

- `ok: false` → clé absente ou invalide (vérifier `.env` local ou env vars Netlify)
- `remaining/limit` → quota journalier Groq (`llama-3.1-8b-instant` : 14 400 req/jour en free tier)
- `reset` → temps avant réinitialisation du compteur

### Test IA complet (correction d'une phrase)

```js
fetch('/api/ai-correct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({en:'I love learning languages',correct:"J'aime apprendre les langues",userAnswer:"j'aime apprendre des languages",wasCorrect:false})}).then(r=>r.json()).then(d=>console.log(d.text))
```
