import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { getCatImages } from '../services/catApi';

export default function HomeScreen ({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCatImages()
      .then(images => {
        const articlesWithCats = images.map((image) => ({
          id: image.id,
          title: image.breeds[0].name,
          description: image.breeds[0].temperament,
          image: image.url
        }));
        setArticles(articlesWithCats);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleArticlePress = async (article) => {
    console.log('Article pressé:', article.title);
    console.log('ID:', article.id);
    console.log('Description:', article.description);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('C:\\Users\\enzom\\OneDrive\\Bureau\\React Native\\demo-rn\\assets\\MEOW.wav')
      );
      await sound.playAsync();
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Erreur lors de la lecture du son:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minouverse</Text>
      </View>
      
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [
              styles.article,
              pressed && styles.articlePressed
            ]}
            onPress={() => handleArticlePress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 15 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    backgroundColor: '#ff6b6b',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  article: {
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
  articlePressed: {
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