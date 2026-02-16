import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { getReactions, updateReaction, deleteReaction } from '../services/fire';

export default function ReactionsScreen() {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const unsub = getReactions(setReactions);
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const toggleValue = async (reaction) => {
    Haptics.selectionAsync();
    const nextValue = reaction.value === 1 ? -1 : 1;
    updateReaction({
      ...reaction,
      value: nextValue,
      updatedAt: new Date(),
    });
  };

  const handleDelete = async (reaction) => {
    Haptics.selectionAsync();
    deleteReaction(reaction);
  };

  const labelForValue = (value) => {
    if (value === 1) return '👍 Like';
    if (value === -1) return '👎 Dislike';
    return '—';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Likes / Dislikes</Text>
      </View>

      <FlatList
        data={reactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListEmptyComponent={
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>Aucune réaction pour le moment.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={styles.cardBody}>
              <Text style={styles.title}>{item.title || labelForValue(item.value)}</Text>
              <Text style={styles.subtitle}>{labelForValue(item.value)} • Cat ID: {item.catId}</Text>

              <View style={styles.actionsRow}>
                <Pressable
                  onPress={() => toggleValue(item)}
                  style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
                >
                  <Text style={styles.actionText}>Update</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDelete(item)}
                  style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
                >
                  <Text style={styles.actionText}>Supprimer</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  centerContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#e9ecef',
  },
  cardBody: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
  actionText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
});
