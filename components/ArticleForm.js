import { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { addArticle, updateArticle } from '../fire'

export default function ArticleForm ({ setVisible, selectedArticle }) {
  const [title, onChangeTitle] = useState(selectedArticle?.title)
  const [content, onChangeContent] = useState(selectedArticle?.content)

  // Lorsque le formulaire est soumis
  const handleSubmit = () => {
    // On créé un objet représentant l'article à créer ou modifier
    let article = {
      title: title,
      content: content,
      date: new Date(),
      comments: []
    }
    // Si le composant reçoit la props d'un article sélectionné, c'est qu'il doit être modifié
    if (selectedArticle) {
      // On hydrate les valeurs initiales de l'article à modifier
      article.id = selectedArticle.id
      article.comments = selectedArticle.comments
      updateArticle(article)
    } else { // Sinon, il doit être créé
      addArticle(article)
    }
    // Ferme la modale éventuelle
    setVisible(false)
  }

  // Affiche un formulaire
  return (
    <View>
      <Text>Titre de l'article</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />

      <Text>Contenu de l'article</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        onChangeText={onChangeContent}
        value={content}
      />
        
      <Button onPress={handleSubmit} title='Publier' />
    </View>
  )
}