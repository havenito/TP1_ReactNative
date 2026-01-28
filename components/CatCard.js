import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function CatCard({ cat, onPress }) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={() => onPress(cat)}
    >
      <Image source={{ uri: cat.image }} style={styles.image} />
      <Text style={styles.title}>{cat.title}</Text>
      <Text style={styles.description}>{cat.description}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#f8f9fa'
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#e9ecef'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#2c3e50'
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    marginHorizontal: 20,
    marginBottom: 20,
    lineHeight: 24
  },
});
