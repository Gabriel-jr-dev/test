import { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritesList from '@/components/FavoritesList';
import { Favorite } from '@/types/dictionary';

const MOCK_FAVORITES: Favorite[] = [
  {
    id: 'demo-1',
    word: 'hello',
    translation: 'hola',
    sourceLanguage: 'en',
    targetLanguage: 'es',
    timestamp: Date.now(),
  },
  {
    id: 'demo-2',
    word: 'book',
    translation: 'livre',
    sourceLanguage: 'en',
    targetLanguage: 'fr',
    timestamp: Date.now() - 100000,
  },
];

export default function FavoritesScreen() {
  const favorites = useMemo(() => MOCK_FAVORITES, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Saved Favorites
        </Text>
        <Text className="text-base text-gray-600 mb-6">
          Quickly revisit your recently saved translations.
        </Text>
        <FavoritesList
          favorites={favorites}
          onSelectFavorite={() => {}}
          onRemoveFavorite={() => {}}
        />
        <View className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <Text className="text-sm text-blue-700">
            Favorites are stored locally in this demo. In a production app you
            could sync them across devices by connecting to a backend service.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
