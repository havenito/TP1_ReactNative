import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

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
    <View style={styles.container}> 
      <Text style={styles.header}>Minouverse</Text>
      
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
});
