import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App () {
  const handleArticlePress = (article) => {
    console.log('Article pressé:', article.title);
    console.log('ID:', article.id);
    console.log('Description:', article.description);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const articles = [
    { id: 1, title: "Les chats persans", description: "Découvrez le charme des chats persans avec leur pelage long et soyeux", image: "https://images.ctfassets.net/denf86kkcx7r/4NreUc61KKZpA4OCU6Y42M/a8d8fdd976ec21f4ff5aa8ffd6db4182/chat_norv_gien_assurance_santevet" },
    { id: 2, title: "L'alimentation féline", description: "Comment bien nourrir votre chat pour qu'il reste en bonne santé", image: "https://litiere-tranquille.com/cdn/shop/articles/guide_frequence_utilisation_litiere_3f8946a5-4012-45e7-909c-77057d052a38.webp?v=1755078165" },
    { id: 3, title: "Le langage des chats", description: "Comprendre les miaulements et le langage corporel de votre félin", image: "https://www.aquaportail.com/pictures2307/chat-domestique-europeen.jpg" },
    { id: 4, title: "Les chats et le jeu", description: "Pourquoi le jeu est essentiel au bien-être de votre chat", image: "https://www.radiofrance.fr/pikapi/images/33fe1bd1-39e9-431f-a932-0bee063e1ec9/1200x680?webp=false" },
    { id: 5, title: "Le ronronnement", description: "Les secrets du ronronnement et ce qu'il révèle sur votre chat", image: "https://www.animauxsante.com/media/2020/11/index-1.jpg" },
    { id: 6, title: "Adopter un chaton", description: "Tout ce qu'il faut savoir avant d'adopter un chaton", image: "https://images.ctfassets.net/denf86kkcx7r/57uYN7JlyDtQ91KvRldrm9/0a0656983993f5e09c4daa0a4fd8f5e6/comment-punir-son-chat-91" },
    { id: 7, title: "Les chats d'intérieur", description: "Comment rendre heureux un chat qui vit uniquement en appartement", image: "https://leocare.eu/fr/wp-content/uploads/2025/01/chat-ragdoll.jpg" }
  ];

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
  }
});
