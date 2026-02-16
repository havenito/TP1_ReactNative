import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.replace('Article');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.catEmoji}>🐱</Text>
        <Text style={styles.title}>Minouverse</Text>
        <Text style={styles.subtitle}>Chargement...</Text>
        <ActivityIndicator size="small" color="#ff6b6b" style={styles.loader} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 28,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  catEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ff6b6b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  loader: {
    marginTop: 14,
  },
});