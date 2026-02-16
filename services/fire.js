import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCDnUJ0R1fkB5WRV7iyeeSIhkrF0t1myr8",
  authDomain: "minouverse-465c9.firebaseapp.com",
  projectId: "minouverse-465c9",
  storageBucket: "minouverse-465c9.firebasestorage.app",
  messagingSenderId: "844374601453",
  appId: "1:844374601453:web:6c6857138f7a7c87ac26e4"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getArticles = callback => {
  const q = query(collection(db, 'articles'), orderBy('date', 'desc'))
  return onSnapshot(q, snapshot => {
    let articles = []
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() })
    })
    callback(articles)
  })
}

export const addArticle = article => {
  addDoc(collection(db, 'articles'), article)
}

export const updateArticle = article => {
  updateDoc(doc(db, 'articles', article.id), article)
}

export const deleteArticle = article => {
  deleteDoc(doc(db, 'articles', article.id))
}

// Favoris (CRUD)

export const getFavorites = callback => {
  const q = query(collection(db, 'favorites'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, snapshot => {
    let favorites = []
    snapshot.forEach(doc => {
      favorites.push({ id: doc.id, ...doc.data() })
    })
    callback(favorites)
  })
}

export const addFavorite = favorite => {
  addDoc(collection(db, 'favorites'), favorite)
}

export const updateFavorite = favorite => {
  updateDoc(doc(db, 'favorites', favorite.id), favorite)
}

export const deleteFavorite = favorite => {
  deleteDoc(doc(db, 'favorites', favorite.id))
}

// Likes / Dislikes

export const getReactions = callback => {
  const q = query(collection(db, 'reactions'), orderBy('updatedAt', 'desc'))
  return onSnapshot(q, snapshot => {
    let reactions = []
    snapshot.forEach(doc => {
      reactions.push({ id: doc.id, ...doc.data() })
    })
    callback(reactions)
  })
}

export const addReaction = reaction => {
  addDoc(collection(db, 'reactions'), reaction)
}

export const updateReaction = reaction => {
  updateDoc(doc(db, 'reactions', reaction.id), reaction)
}

export const deleteReaction = reaction => {
  deleteDoc(doc(db, 'reactions', reaction.id))
}


