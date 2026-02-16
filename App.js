import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ArticleScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import ListScreen from './screens/ListScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ReactionsScreen from './screens/ReactionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Article" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Favoris" component={FavoritesScreen} />
        <Stack.Screen name="Likes" component={ReactionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}