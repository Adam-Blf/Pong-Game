![version](https://img.shields.io/badge/version-1.0.1-DC0A2D?style=flat-square) ![canvas](https://img.shields.io/badge/canvas-html5-141418?style=flat-square) ![license](https://img.shields.io/badge/license-MIT-424242?style=flat-square) ![type](https://img.shields.io/badge/type-game-4CAF50?style=flat-square)

# 🏓 Pong Game

<!-- adam-badges:start -->
[![commits](https://img.shields.io/github/commit-activity/t/Adam-Blf/Pong-Game?color=001329&label=commits&style=flat-square)](https://github.com/Adam-Blf/Pong-Game/commits) [![visites](https://hits.sh/github.com/Adam-Blf/Pong-Game.svg?style=flat-square&label=visites&color=001329)](https://hits.sh/github.com/Adam-Blf/Pong-Game/) [![last commit](https://img.shields.io/github/last-commit/Adam-Blf/Pong-Game?color=D4A437&style=flat-square&label=dernier%20push)](https://github.com/Adam-Blf/Pong-Game/commits) [![top language](https://img.shields.io/github/languages/top/Adam-Blf/Pong-Game?style=flat-square)](https://github.com/Adam-Blf/Pong-Game) [![license](https://img.shields.io/github/license/Adam-Blf/Pong-Game?style=flat-square&color=D4A437)](LICENSE)
<!-- adam-badges:end -->


![Status](https://img.shields.io/badge/status-complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas-000?logo=html5&logoColor=white)
![GH Pages](https://img.shields.io/badge/play-GH_Pages-222?logo=github&logoColor=white)

Jeu Pong classique revisité avec interface moderne, intelligence artificielle adaptative et mode multijoueur local.

## 🌟 Fonctionnalités

### Modes de Jeu
- 🤖 **Solo vs IA** : Affrontez une intelligence artificielle avec 4 niveaux de difficulté
- 👥 **Multijoueur Local** : Jouez à deux sur le même clavier

### Intelligence Artificielle
- **Facile** : IA lente avec réaction basique
- **Moyen** : IA équilibrée avec prédiction moyenne
- **Difficile** : IA rapide avec bonne anticipation
- **Impossible** : IA parfaite avec prédiction totale

### Paramètres Personnalisables
- ⚙️ **Difficulté IA** : 4 niveaux ajustables
- 🎯 **Vitesse de la balle** : 3 à 10 (ajustable)
- 🏃 **Vitesse des raquettes** : 3 à 12 (ajustable)
- 🏆 **Score pour gagner** : 3 à 21 points

### Fonctionnalités Avancées
- 🎮 **Contrôles fluides** : Détection clavier optimisée
- 📊 **Système de score** : Affichage en temps réel
- ⏸️ **Pause** : Menu de pause avec options
- 🏆 **Écran de victoire** : Modal avec score final
- 🎨 **Effets visuels** : Traînée de balle, animations
- 📱 **Responsive** : Adaptation mobile et desktop

## 🚀 Technologies

- **HTML5 Canvas** : Rendu graphique haute performance
- **JavaScript ES6** : Logique de jeu et IA
- **CSS3** : Interface moderne avec animations
- **RequestAnimationFrame** : Boucle de jeu optimisée

## 💻 Installation

### Cloner le Projet

```bash
git clone https://github.com/Adam-Blf/Pong-Game.git
cd Pong-Game
```

### Lancer le Jeu

Ouvrez simplement `index.html` dans votre navigateur :

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Ou avec un serveur local :

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Puis ouvrez [http://localhost:8000](http://localhost:8000)

## 🎮 Contrôles

### Joueur 1 (Gauche)
- **W** : Monter
- **S** : Descendre

### Joueur 2 (Droite) - Mode Multijoueur
- **↑** : Monter
- **↓** : Descendre

### Contrôles Globaux
- **Esc** : Pause / Reprendre
- **Bouton Pause** : Ouvrir le menu pause
- **Bouton Quitter** : Retour au menu principal

## 📂 Structure du Projet

```
Pong-Game/
│
├── index.html          # Structure HTML du jeu
├── style.css           # Styles et animations
├── script.js           # Logique du jeu et IA
├── README.md           # Documentation
└── .gitignore          # Fichiers à ignorer
```

## 🎨 Aperçu des Fonctionnalités

### Menu Principal
- Interface élégante avec 3 options
- Affichage des contrôles
- Bouton Paramètres

### Écran de Jeu
- Canvas 800x600px
- Affichage des scores en temps réel
- Ligne centrale pointillée
- Raquettes colorées (bleu/vert)
- Balle blanche avec effet de traînée

### Intelligence Artificielle

L'IA utilise un algorithme de prédiction adaptatif :

```javascript
const aiConfig = {
    easy: { speed: 0.4, prediction: 0.3, reaction: 0.6 },
    medium: { speed: 0.6, prediction: 0.5, reaction: 0.4 },
    hard: { speed: 0.8, prediction: 0.7, reaction: 0.2 },
    impossible: { speed: 1, prediction: 1, reaction: 0 }
};
```

- **Speed** : Vitesse de déplacement de la raquette IA
- **Prediction** : Précision de l'anticipation de la trajectoire
- **Reaction** : Délai de réaction (plus bas = plus rapide)

### Physique de la Balle

- **Collision avec raquettes** : Angle de rebond basé sur le point d'impact
- **Accélération progressive** : La balle accélère à chaque toucher (max 15)
- **Rebonds muraux** : Inversion de la direction verticale
- **Reset après point** : Direction aléatoire pour chaque nouveau point

## 🎯 Règles du Jeu

1. **Objectif** : Marquer des points en faisant passer la balle derrière la raquette adverse
2. **Score** : Premier à atteindre le score défini (par défaut 11) gagne
3. **Vitesse** : La balle accélère progressivement au fil du jeu
4. **Rebonds** : L'angle de rebond dépend de l'endroit où la balle touche la raquette

## 🔧 Fonctionnement Interne

### Boucle de Jeu (Game Loop)

```javascript
function gameLoop() {
    update();   // Mise à jour physique et logique
    render();   // Rendu graphique
    requestAnimationFrame(gameLoop);
}
```

### Détection de Collision

Collision précise entre la balle et les raquettes :

```javascript
function collision(ball, player) {
    return ball.x - ball.radius < paddleX + paddle.width &&
           ball.x + ball.radius > paddleX &&
           ball.y - ball.radius < player.y + paddle.height &&
           ball.y + ball.radius > player.y;
}
```

### Logique IA

L'IA prédit la position future de la balle :

```javascript
const timeToReach = (paddle.player2.x - ball.x) / ball.velocityX;
const targetY = ball.y + ball.velocityY * timeToReach * config.prediction;
```

## 🌐 Compatibilité

| Navigateur | Version Minimale |
|-----------|------------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |

## 🚀 Améliorations Futures

- [ ] **Power-ups** : Bonus modifiant la taille, vitesse, etc.
- [ ] **Modes de jeu** : Survival, Time Attack
- [ ] **Effets sonores** : Bruitages de collision et score
- [ ] **Multijoueur en ligne** : Via WebRTC ou WebSockets
- [ ] **Classement** : Sauvegarde des meilleurs scores
- [ ] **Replay** : Revoir les parties
- [ ] **Thèmes visuels** : Personnalisation des couleurs
- [ ] **Obstacles** : Murs mobiles dans l'arène

## 📊 Optimisations Techniques

### Performance
- Utilisation de `requestAnimationFrame` pour 60 FPS fluides
- Canvas rendering optimisé
- Calculs mathématiques pré-calculés

### Responsive
- Canvas adaptatif pour mobile
- Menu overlay pour petits écrans
- Contrôles tactiles (à venir)

## 🎓 Concepts Utilisés

### JavaScript
- Canvas API et contexte 2D
- RequestAnimationFrame pour animation fluide
- Event Listeners (clavier, boutons)
- Algorithmes de collision
- Intelligence artificielle prédictive

### Physique
- Vecteurs de vitesse (velocityX, velocityY)
- Rebonds élastiques
- Accélération progressive
- Angle de collision dynamique

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/NewFeature`)
3. Committez (`git commit -m 'Add NewFeature'`)
4. Push (`git push origin feature/NewFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Projet open source - libre d'utilisation pour projets personnels ou éducatifs.

## 👤 Auteur

**Adam Beloucif**
- GitHub: [@Adam-Blf](https://github.com/Adam-Blf)
- Portfolio: [Voir mes projets](https://github.com/Adam-Blf?tab=repositories)

## 🙏 Remerciements

- Inspiré du jeu Pong original (1972) d'Atari
- Physique de collision basée sur les principes classiques
- Design moderne inspiré des interfaces actuelles

---

⭐ **N'oubliez pas de mettre une étoile si vous aimez ce projet !** ⭐

---

<p align="center">
  <sub>Par <a href="https://adam.beloucif.com">Adam Beloucif</a> · Data Engineer & Fullstack Developer · <a href="https://github.com/Adam-Blf">GitHub</a> · <a href="https://www.linkedin.com/in/adambeloucif/">LinkedIn</a></sub>
</p>
