import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function DetailScreen({ route, navigation }) {
  const { cat } = route.params;

  const renderLevelBar = (level) => {
    return (
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
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: cat.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{cat.title}</Text>

        <View style={styles.quickInfoContainer}>
          {cat.origin && (
            <Text style={styles.quickInfoText}> {cat.origin}</Text>
          )}
          {cat.lifeSpan && (
            <Text style={styles.quickInfoText}> {cat.lifeSpan} ans</Text>
          )}
          {cat.weight && (
            <Text style={styles.quickInfoText}> {cat.weight} kg</Text>
          )}
        </View>

        {cat.breedDescription && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{cat.breedDescription}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tempérament</Text>
          <Text style={styles.description}>{cat.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caractéristiques</Text>
          
          {cat.affectionLevel !== undefined && (
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Affection</Text>
              {renderLevelBar(cat.affectionLevel)}
            </View>
          )}
          
          {cat.intelligence !== undefined && (
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Intelligence</Text>
              {renderLevelBar(cat.intelligence)}
            </View>
          )}
          
          {cat.energyLevel !== undefined && (
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Énergie</Text>
              {renderLevelBar(cat.energyLevel)}
            </View>
          )}
          
          {cat.childFriendly !== undefined && (
            <View style={styles.characteristicRow}>
              <Text style={styles.characteristicLabel}>Enfants</Text>
              {renderLevelBar(cat.childFriendly)}
            </View>
          )}
        </View>

        <Text style={styles.idText}>ID: {cat.id}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e9ecef',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  quickInfoText: {
    fontSize: 15,
    color: '#6c757d',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff6b6b',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  characteristicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  characteristicLabel: {
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
  idText: {
    fontSize: 13,
    color: '#adb5bd',
    marginTop: 20,
  },
});