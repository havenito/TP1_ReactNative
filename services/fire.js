import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
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
  onSnapshot(q, snapshot => {
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


