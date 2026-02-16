import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CharacteristicBar from '../components/CharacteristicBar'
import InfoSection from '../components/InfoSection'
import QuickInfo from '../components/QuickInfo'

export default function DetailScreen({ route, navigation }) {
  const { cat } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: cat.image }} style={styles.image} />
      
      <View style={styles.contentCard}>
        <Text style={styles.title}>{cat.title}</Text>

        <View style={styles.quickInfoContainer}>
          {cat.origin && <QuickInfo icon="🌍" text={cat.origin} />}
          {cat.lifeSpan && <QuickInfo icon="⏳" text={`${cat.lifeSpan} ans`} />}
          {cat.weight && <QuickInfo icon="⚖️" text={`${cat.weight} kg`} />}
        </View>

        {cat.breedDescription && (
          <InfoSection title="Description">
            <Text style={styles.description}>{cat.breedDescription}</Text>
          </InfoSection>
        )}

        <InfoSection title="Tempérament">
          <Text style={styles.description}>{cat.description}</Text>
        </InfoSection>

        <InfoSection title="Caractéristiques">
          {cat.affectionLevel !== undefined && (
            <CharacteristicBar label="Affection" level={cat.affectionLevel} />
          )}
          {cat.intelligence !== undefined && (
            <CharacteristicBar label="Intelligence" level={cat.intelligence} />
          )}
          {cat.energyLevel !== undefined && (
            <CharacteristicBar label="Énergie" level={cat.energyLevel} />
          )}
          {cat.childFriendly !== undefined && (
            <CharacteristicBar label="Enfants" level={cat.childFriendly} />
          )}
        </InfoSection>

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
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e9ecef',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  contentCard: {
    marginTop: -24,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 14,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  idText: {
    fontSize: 13,
    color: '#adb5bd',
    marginTop: 18,
    textAlign: 'center',
  },
});