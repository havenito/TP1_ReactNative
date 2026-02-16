import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { getCatImages } from '../services/catApi';
import {
  getFavorites,
  addFavorite,
  updateFavorite,
  deleteFavorite,
  getReactions,
  addReaction,
  updateReaction,
  deleteReaction,
} from '../services/fire';
import CatCard from '../components/CatCard';

export default function HomeScreen ({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState([]);
  const [reactions, setReactions] = useState([]);

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

  useEffect(() => {
    const unsubFavorites = getFavorites(setFavorites);
    const unsubReactions = getReactions(setReactions);

    return () => {
      if (typeof unsubFavorites === 'function') unsubFavorites();
      if (typeof unsubReactions === 'function') unsubReactions();
    };
  }, []);

  const getFavoriteForCat = (catId) => favorites.find((fav) => fav.catId === catId);
  const getReactionForCat = (catId) => reactions.find((rx) => rx.catId === catId);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredArticles = normalizedQuery.length === 0
    ? articles
    : articles.filter((article) => (article.title || '').toLowerCase().includes(normalizedQuery));

  const handleToggleFavorite = async (cat) => {
    Haptics.selectionAsync();

    const existing = getFavoriteForCat(cat.id);
    if (existing) {
      deleteFavorite(existing);
      return;
    }

    addFavorite({
      catId: cat.id,
      title: cat.title,
      image: cat.image,
      createdAt: new Date(),
    });
  };

  const handleUpdateFavorite = async (cat) => {
    const existing = getFavoriteForCat(cat.id);
    if (!existing) return;

    Haptics.selectionAsync();
    updateFavorite({
      ...existing,
      title: cat.title,
      image: cat.image,
      createdAt: existing.createdAt || new Date(),
      updatedAt: new Date(),
    });
  };

  const setReactionValue = async (cat, value) => {
    Haptics.selectionAsync();

    const existing = getReactionForCat(cat.id);
    if (!existing) {
      addReaction({
        catId: cat.id,
        title: cat.title,
        image: cat.image,
        value,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return;
    }

    if (existing.value === value) {
      deleteReaction(existing);
      return;
    }

    updateReaction({
      ...existing,
      title: cat.title,
      image: cat.image,
      value,
      createdAt: existing.createdAt || new Date(),
      updatedAt: new Date(),
    });
  };

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
      <View style={[styles.container, styles.loadingContainer]}>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingEmoji}>🐱</Text>
          <Text style={styles.loadingTitle}>Minouverse</Text>
          <ActivityIndicator size="large" color="#ff6b6b" style={styles.loader} />
          <Text style={styles.loadingText}>Chargement des articles...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minouverse</Text>
      </View>

      <View style={styles.navRow}>
        <Pressable
          onPress={() => navigation.navigate('Favoris')}
          style={({ pressed }) => [styles.navBtn, pressed && styles.actionBtnPressed]}
        >
          <Text style={styles.navText}>Voir favoris</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Likes')}
          style={({ pressed }) => [styles.navBtn, pressed && styles.actionBtnPressed]}
        >
          <Text style={styles.navText}>Voir likes</Text>
        </Pressable>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher par titre..."
          placeholderTextColor="#6c757d"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
      
      <FlatList
        data={filteredArticles}
        renderItem={({ item }) => (
          <View>
            <CatCard cat={item} onPress={handleArticlePress} />

            <View style={styles.actionsRow}>
              <Pressable
                onPress={() => handleToggleFavorite(item)}
                style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
              >
                <Text style={styles.actionText}>
                  {getFavoriteForCat(item.id) ? '⭐ Favori' : '☆ Favori'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleUpdateFavorite(item)}
                disabled={!getFavoriteForCat(item.id)}
                style={({ pressed }) => [
                  styles.actionBtn,
                  !getFavoriteForCat(item.id) && styles.actionBtnDisabled,
                  pressed && getFavoriteForCat(item.id) && styles.actionBtnPressed,
                ]}
              >
                <Text style={styles.actionText}>Update</Text>
              </Pressable>

              <Pressable
                onPress={() => setReactionValue(item, 1)}
                style={({ pressed }) => [
                  styles.actionBtn,
                  getReactionForCat(item.id)?.value === 1 && styles.actionBtnActive,
                  pressed && styles.actionBtnPressed,
                ]}
              >
                <Text style={styles.actionText}>👍 Like</Text>
              </Pressable>

              <Pressable
                onPress={() => setReactionValue(item, -1)}
                style={({ pressed }) => [
                  styles.actionBtn,
                  getReactionForCat(item.id)?.value === -1 && styles.actionBtnActive,
                  pressed && styles.actionBtnPressed,
                ]}
              >
                <Text style={styles.actionText}>👎 Dislike</Text>
              </Pressable>
            </View>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingCard: {
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
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ff6b6b',
    marginBottom: 8,
  },
  loader: {
    marginTop: 6,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
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

  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  navRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchRow: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#2c3e50',
  },
  navBtn: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  navText: {
    color: '#2c3e50',
    fontWeight: '700',
  },
  actionBtn: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionBtnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  actionBtnActive: {
    backgroundColor: '#f8f9fa',
  },
  actionBtnDisabled: {
    opacity: 0.4,
  },
  actionText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
});