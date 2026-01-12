import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function App () {
  const articles = [
    { id: 1, title: "Les chats persans", description: "Découvrez le charme des chats persans avec leur pelage long et soyeux", image: "https://images.ctfassets.net/denf86kkcx7r/4NreUc61KKZpA4OCU6Y42M/a8d8fdd976ec21f4ff5aa8ffd6db4182/chat_norv_gien_assurance_santevet" },
    { id: 2, title: "L'alimentation féline", description: "Comment bien nourrir votre chat pour qu'il reste en bonne santé", image: "https://litiere-tranquille.com/cdn/shop/articles/guide_frequence_utilisation_litiere_3f8946a5-4012-45e7-909c-77057d052a38.webp?v=1755078165" },
    { id: 3, title: "Le langage des chats", description: "Comprendre les miaulements et le langage corporel de votre félin", image: "https://www.aquaportail.com/pictures2307/chat-domestique-europeen.jpg" },
    { id: 4, title: "Les chats et le jeu", description: "Pourquoi le jeu est essentiel au bien-être de votre chat", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400" },
    { id: 5, title: "Le ronronnement", description: "Les secrets du ronronnement et ce qu'il révèle sur votre chat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400" },
    { id: 6, title: "Adopter un chaton", description: "Tout ce qu'il faut savoir avant d'adopter un chaton", image: "https://images.ctfassets.net/denf86kkcx7r/57uYN7JlyDtQ91KvRldrm9/0a0656983993f5e09c4daa0a4fd8f5e6/comment-punir-son-chat-91" },
    { id: 7, title: "Les chats d'intérieur", description: "Comment rendre heureux un chat qui vit uniquement en appartement", image: "https://leocare.eu/fr/wp-content/uploads/2025/01/chat-ragdoll.jpg" }
  ];

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Minouverse</Text>
      
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Image source={{ uri: item.image }} style={styles.image} />
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
  },
  image: {
    width: '100%',
    height: 200
  },
});
