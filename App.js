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
    <View style={styles.container}>
      <Text style={styles.header}>Minouverse</Text>
      
      <View style={styles.article}>
        <Text style={styles.title}>{articles[0].title}</Text>
        <Text style={styles.description}>{articles[0].description}</Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.title}>{articles[1].title}</Text>
        <Text style={styles.description}>{articles[1].description}</Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.title}>{articles[2].title}</Text>
        <Text style={styles.description}>{articles[2].description}</Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.title}>{articles[3].title}</Text>
        <Text style={styles.description}>{articles[3].description}</Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.title}>{articles[4].title}</Text>
        <Text style={styles.description}>{articles[4].description}</Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.title}>{articles[5].title}</Text>
        <Text style={styles.description}>{articles[5].description}</Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.title}>{articles[6].title}</Text>
        <Text style={styles.description}>{articles[6].description}</Text>
      </View>
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
