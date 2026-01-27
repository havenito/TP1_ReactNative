import { View, Text } from 'react-native'
import React from 'react'

export default function ArticleScreen({ route }) {
  const { article } = route.params;
  return (
    <View>
      <Text>{article.title}</Text>
      <Text>{article.description}</Text>
    </View>
  )
}