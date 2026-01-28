import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { getCatImages } from '../services/catApi';
import CatCard from '../components/CatCard';

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
          image: image.url,
          breed: image.breeds[0],
          origin: image.breeds[0].origin,
          lifeSpan: image.breeds[0].life_span,
          weight: image.breeds[0].weight?.metric || 'N/A',
          breedDescription: image.breeds[0].description,
          affectionLevel: image.breeds[0].affection_level,
          intelligence: image.breeds[0].intelligence,
          energyLevel: image.breeds[0].energy_level,
          childFriendly: image.breeds[0].child_friendly,
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
    navigation.navigate('Detail', { cat: article });
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
          <CatCard cat={item} onPress={handleArticlePress} />
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
});