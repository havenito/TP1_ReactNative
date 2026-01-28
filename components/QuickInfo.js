import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function QuickInfo({ icon, text }) {
  return (
    <Text style={styles.quickInfoText}>
      {icon} {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  quickInfoText: {
    fontSize: 15,
    color: '#6c757d',
  },
});
