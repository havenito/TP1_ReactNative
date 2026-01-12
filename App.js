import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App () {
  const articles = [
    { id: 1, title: "z", description: "a" },
    { id: 2, title: "z", description: "a" },
    { id: 3, title: "z", description: "a" },
    { id: 4, title: "z", description: "a" },
    { id: 5, title: "z", description: "a" },
    { id: 6, title: "z", description: "a" },
    { id: 7, title: "z", description: "a" }
  ];

  return (
    <View>
      <Text style={styles.title}>Titre</Text>
      <Text style={styles.description}>Description</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: '#555'
  }
})
