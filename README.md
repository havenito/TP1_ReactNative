# Minouverse - Application Mobile Interactive

Application mobile React Native / Expo dédiée au monde félin, avec navigation, feedback haptique/sonore, et persistance des interactions via Firebase (Firestore).

## Description

Minouverse affiche une liste de chats (images + race) issue de TheCatAPI, permet de consulter une page de détail, et propose 2 fonctionnalités backend “comme dans le cours” via Firestore :

- CRUD Favoris (ajout/suppression + page dédiée)
- CRUD Likes/Dislikes (réaction like/dislike + page dédiée)

## Fonctionnalités

### Navigation

- Splash screen (Home)
- Liste principale (Article) avec FlatList
- Page détail (Detail)
- Page Favoris (Favoris)
- Page Likes/Dislikes (Likes)

### Interactivité (UX)

- Appui sur une carte :
  - logs console (debug)
  - feedback haptique
  - lecture d'un son (meow)

### Firebase / Firestore (CRUD)

Le backend utilise Firestore avec exactement le pattern vu en cours :

- Read temps réel : `query(...)` + `onSnapshot(...)`
- Create : `addDoc(...)`
- Update : `updateDoc(...)`
- Delete : `deleteDoc(...)`

Collections utilisées :

- `favorites` : favoris par chat (champ `catId`, et métadonnées comme `title`, `image`, `createdAt`/`updatedAt`)
- `reactions` : like/dislike par chat (champ `catId`, `value` = `1` ou `-1`, et `updatedAt`)

## Technologies utilisées

- React Native (0.81.5)
- Expo (~54.0.31)
- React (19.1.0)
- React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`)
- Firebase (Firestore)
- expo-haptics (feedback)
- expo-av (audio)

## Prérequis

- Node.js + npm (ou yarn)
- Expo CLI / Expo Go
- Un projet Firebase avec Firestore activé (configuration déjà présente dans le projet)

## Installation

1) Cloner

```bash
git clone https://github.com/havenito/TP1_ReactNative.git
cd demo-rn
```

2) Installer

```bash
npm install
```

3) Lancer

```bash
npm start
```

## Structure du projet

```
demo-rn/
├── App.js
├── index.js
├── app.json
├── package.json
├── assets/
├── components/
├── screens/
│   ├── HomeScreen.js
│   ├── ListScreen.js
│   ├── DetailScreen.js
│   ├── FavoritesScreen.js
│   └── ReactionsScreen.js
└── services/
    ├── catApi.js
    └── fire.js
```

## Vérifier que l'Update Firestore marche

La preuve la plus simple se voit dans la Firebase Console :

1) Firebase Console → Firestore Database
2) Ouvrir la collection `favorites`
3) Cliquer un document
4) Dans l'app, appuyer sur **Update**
5) Le champ `updatedAt` du document doit changer

## Résolution de problèmes

### Nettoyer le cache Expo

```bash
npx expo start -c
```

### Le feedback haptique ne fonctionne pas

- Tester sur un appareil physique (pas sur émulateur/simulateur)

## Licence

Projet éducatif (TP React Native).

---

Dernière mise à jour : Février 2026
