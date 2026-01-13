# Minouverse - Application Mobile Interactive

Application mobile React Native dédiée au monde félin avec interface utilisateur interactive et feedback haptique. Minouverse est une plateforme d'articles et de ressources pour les amoureux des chats, offrant une expérience utilisateur optimale.

## Description

Minouverse est une application mobile développée avec React Native et Expo qui présente une collection d'articles interactifs sur les chats. L'application met l'accent sur l'**expérience utilisateur** avec des interactions tactiles, des feedbacks visuels et haptiques pour une navigation immersive.

## Fonctionnalités

### Interface Utilisateur
- Liste scrollable d'articles sur les chats avec images HD
- Design moderne et élégant avec Material Design
- Interface responsive optimisée mobile
- Affichage d'images haute qualité pour chaque article
- Navigation fluide avec FlatList optimisée

### Interactivité Avancée
- **Éléments cliquables** : Tous les articles sont interactifs via le composant `Pressable`
- **Triple feedback utilisateur** lors du clic sur un article :
  1. **Affichage console** : Log détaillé (titre, ID, description) dans la console de débogage
  2. **Feedback visuel** : Animation de pression avec changement d'opacité et de taille
  3. **Feedback haptique** : Vibration tactile moyenne pour confirmation de l'action

### Qualité UX
- Réactivité instantanée aux interactions
- Animations fluides et naturelles
- Retour tactile pour meilleure accessibilité
- États visuels clairs (normal / pressé)

## Technologies utilisées

- **React Native** (v0.81.5) - Framework mobile multiplateforme
- **Expo** (~54.0.31) - Plateforme de développement et déploiement
- **React** (v19.1.0) - Bibliothèque JavaScript pour l'UI
- **Expo Status Bar** (~3.0.9) - Gestion de la barre d'état
- **Expo Haptics** (~15.0.8) - Gestion du feedback haptique/vibrations

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) sur votre smartphone (iOS ou Android)

## Installation

1. **Clonez le repository** :
```bash
git clone https://github.com/havenito/TP1_ReactNative.git
cd demo-rn
```

2. **Installez les dépendances** :
```bash
npm install
```

3. **Installez expo-haptics** (si nécessaire) :
```bash
npx expo install expo-haptics
```

## Utilisation

### Démarrer l'application

```bash
npm start
```
ou
```bash
npx expo start
```

Un QR code s'affichera dans le terminal. Scannez-le avec :
- **iOS** : Application Appareil photo
- **Android** : Application Expo Go

### Lancer sur Android

```bash
npm run android
```

### Lancer sur iOS

```bash
npm run ios
```

### Lancer sur le Web

```bash
npm run web
```

## Structure du projet

```
demo-rn/
├── App.js              # Composant principal avec logique interactive
├── index.js            # Point d'entrée de l'application
├── app.json            # Configuration Expo
├── package.json        # Dépendances et scripts npm
├── assets/             # Ressources (images, icônes, fonts)
└── README.md           # Documentation du projet
```

## Fonctionnement de l'interactivité

### Composant Pressable

Chaque article utilise le composant `Pressable` de React Native qui offre :
- Détection avancée des pressions
- États visuels personnalisables
- Gestion des événements tactiles

```javascript
<Pressable 
  style={({ pressed }) => [
    styles.article,
    pressed && styles.articlePressed
  ]}
  onPress={() => handleArticlePress(item)}
>
  {/* Contenu de l'article */}
</Pressable>
```

### Handler d'événement

La fonction `handleArticlePress` déclenche 3 actions simultanément :

```javascript
const handleArticlePress = (article) => {
  // 1. Log console pour le debugging
  console.log('Article pressé:', article.title);
  console.log('ID:', article.id);
  console.log('Description:', article.description);

  // 2. Feedback haptique (vibration tactile)
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  
  // 3. Feedback visuel géré automatiquement par Pressable
};
```

### Styles d'interaction

```javascript
articlePressed: {
  opacity: 0.7,              // Transparence à 70%
  transform: [{ scale: 0.98 }],  // Légère réduction de taille
  backgroundColor: '#f8f9fa'     // Changement de couleur
}
```

## Palette de couleurs

| Couleur | Code Hex | Usage |
|---------|----------|-------|
| Rouge corail | `#ff6b6b` | Header principal |
| Blanc | `#ffffff` | Fond des articles |
| Gris clair | `#f8f9fa` | Fond de l'app |
| Bleu foncé | `#2c3e50` | Titres |
| Gris moyen | `#6c757d` | Descriptions |
| Gris très clair | `#e9ecef` | Placeholder images |

## Contenu de l'application

L'application présente **7 articles** sur différents aspects de la vie féline :

1. **Les chats persans** - Découverte des chats persans et leur pelage soyeux
2. **L'alimentation féline** - Guide nutritionnel complet pour chats
3. **Le langage des chats** - Comprendre la communication féline
4. **Les chats et le jeu** - L'importance du jeu pour le bien-être
5. **Le ronronnement** - Les secrets du ronronnement félin
6. **Adopter un chaton** - Guide complet pour une adoption réussie
7. **Les chats d'intérieur** - Conseils pour chats vivant en appartement

## Débuggage

### Visualiser les logs console

#### Sur Expo Go (mobile)
1. Secouez votre téléphone
2. Sélectionnez "Show Dev Menu"
3. Appuyez sur "Debug Remote JS"
4. Ouvrez la console du navigateur (F12)

#### Dans le terminal
Les logs s'affichent automatiquement dans le terminal Expo lors du développement.

### Tester le feedback haptique

Le feedback haptique fonctionne uniquement sur un **appareil physique** (pas sur émulateur/simulateur).

**Test** : Appuyez sur n'importe quel article, vous devriez sentir une vibration moyenne.

## Concepts React Native utilisés

### Composants
- `View` : Conteneur de base
- `Text` : Affichage de texte
- `Image` : Affichage d'images distantes
- `FlatList` : Liste optimisée avec virtualisation
- `Pressable` : Bouton/élément pressable avec états
- `StyleSheet` : Gestion des styles

### Hooks
- `useState` : Gestion d'état (prêt pour évolutions futures)

### APIs Expo
- `expo-haptics` : Feedback tactile
- `expo-status-bar` : Personnalisation de la barre d'état

### Bonnes pratiques
- Composants fonctionnels avec hooks
- Styles optimisés avec StyleSheet
- FlatList pour performances
- keyExtractor pour optimisation du rendu
- Feedback utilisateur triple (console + visuel + haptique)
- Code lisible et maintenable

## Évolutions possibles

### Court terme
- [ ] Navigation vers une page détail d'article
- [ ] Système de favoris
- [ ] Partage d'articles
- [ ] Catégories filtrables

### Moyen terme
- [ ] Recherche d'articles
- [ ] Mode sombre
- [ ] Animations avancées (Reanimated)
- [ ] Cache des images

### Long terme
- [ ] Backend API
- [ ] Authentification utilisateur
- [ ] Commentaires et notations
- [ ] Notifications push

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez** le projet
2. Créez une **branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/NouvelleFonctionnalite
   ```
3. **Committez** vos changements
   ```bash
   git commit -m 'Ajout d'une nouvelle fonctionnalité'
   ```
4. **Poussez** vers la branche
   ```bash
   git push origin feature/NouvelleFonctionnalite
   ```
5. Ouvrez une **Pull Request**

## Standards de code

- Utilisez des composants fonctionnels
- Commentez le code complexe
- Suivez les conventions de nommage React
- Testez sur iOS et Android
- Vérifiez les performances avec React DevTools

## Résolution de problèmes

### L'application ne démarre pas
```bash
# Nettoyez le cache
npx expo start -c
```

### Le feedback haptique ne fonctionne pas
- Vérifiez que vous êtes sur un **appareil physique** (pas un émulateur)
- Sur iOS, assurez-vous que les vibrations ne sont pas désactivées dans les réglages

### Les images ne s'affichent pas
- Vérifiez votre connexion internet
- Les images sont chargées depuis des URLs externes

### Erreur lors de l'installation
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
```

## Compatibilité

- **iOS** : 11.0+
- **Android** : 5.0+ (API 21+)
- **Web** : Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## Licence

Ce projet est un projet éducatif développé dans le cadre d'un TP React Native.

## Auteur

**TP1 React Native** - Formation développement mobile

## Remerciements

- Expo team pour les outils de développement
- React Native community
- Images fournies par diverses sources libres de droits

## Support

Pour toute question ou problème :
- Ouvrez une [Issue](https://github.com/havenito/TP1_ReactNative/issues)
- Consultez la [documentation Expo](https://docs.expo.dev/)
- Consultez la [documentation React Native](https://reactnative.dev/)

---
*Dernière mise à jour : Janvier 2026*
