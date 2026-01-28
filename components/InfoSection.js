import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function InfoSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff6b6b',
    marginBottom: 10,
  },
});
