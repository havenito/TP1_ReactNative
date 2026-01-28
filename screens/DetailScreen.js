import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function DetailScreen({ route, navigation }) {
  const { cat } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: cat.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{cat.title}</Text>
        <Text style={styles.sectionTitle}>Tempérament</Text>
        <Text style={styles.description}>{cat.description}</Text>
        <Text style={styles.idText}>ID: {cat.id}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '100%',
    height: 350,
    backgroundColor: '#e9ecef',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff6b6b',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#6c757d',
    lineHeight: 28,
    marginBottom: 20,
  },
  idText: {
    fontSize: 14,
    color: '#adb5bd',
    marginTop: 10,
  },
});