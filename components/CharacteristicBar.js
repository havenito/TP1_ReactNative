import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CharacteristicBar({ label, level }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.levelBarContainer}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <View
            key={dot}
            style={[
              styles.levelDot,
              dot <= level ? styles.levelDotActive : styles.levelDotInactive
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: '#495057',
  },
  levelBarContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  levelDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  levelDotActive: {
    backgroundColor: '#ff6b6b',
  },
  levelDotInactive: {
    backgroundColor: '#dee2e6',
  },
});
