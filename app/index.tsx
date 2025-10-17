import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftRight, BookOpen } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import LanguageSelector from '@/components/LanguageSelector';
import TranslationResult from '@/components/TranslationResult';
import RecentSearches from '@/components/RecentSearches';
import FavoritesList from '@/components/FavoritesList';
import LanguagePackages from '@/components/LanguagePackages';
import Store from '@/components/Store';
import { AVAILABLE_LANGUAGES, searchTranslation } from '@/data/languages';
import { Translation, SearchHistory, Favorite, StoreItem, Language } from '@/types/dictionary';
import '../global.css';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState<Language>(AVAILABLE_LANGUAGES[0]);
  const [targetLanguage, setTargetLanguage] = useState<Language>(AVAILABLE_LANGUAGES[1]);
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [languages, setLanguages] = useState<Language[]>(AVAILABLE_LANGUAGES);
  const [notFound, setNotFound] = useState(false);

  const [storeItems, setStoreItems] = useState<StoreItem[]>([
    {
      id: '1',
      type: 'language',
      name: 'French Language Pack',
      description: 'Complete French dictionary with 50,000+ words and phrases',
      price: 2.99,
      languageCode: 'fr',
      isPurchased: false,
    },
    {
      id: '2',
      type: 'language',
      name: 'German Language Pack',
      description: 'Complete German dictionary with pronunciation guides',
      price: 2.99,
      languageCode: 'de',
      isPurchased: false,
    },
    {
      id: '3',
      type: 'language',
      name: 'Japanese Language Pack',
      description: 'Japanese dictionary with Kanji, Hiragana, and Katakana',
      price: 3.99,
      languageCode: 'ja',
      isPurchased: false,
    },
    {
      id: '4',
      type: 'feature',
      name: 'Offline Audio Pronunciation',
      description: 'Download audio files for offline pronunciation of all words',
      price: 4.99,
      isPurchased: false,
    },
    {
      id: '5',
      type: 'feature',
      name: 'Advanced Examples Pack',
      description: 'Get 10+ usage examples for every word translation',
      price: 1.99,
      isPurchased: false,
    },
  ]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const translation = searchTranslation(
      searchQuery,
      sourceLanguage.code,
      targetLanguage.code
    );

    if (translation) {
      setCurrentTranslation(translation);
      setNotFound(false);
      
      // Add to search history
      const newSearch: SearchHistory = {
        id: Date.now().toString(),
        word: searchQuery,
        sourceLanguage: sourceLanguage.code,
        targetLanguage: targetLanguage.code,
        timestamp: Date.now(),
      };
      setSearchHistory([newSearch, ...searchHistory]);
    } else {
      setCurrentTranslation(null);
      setNotFound(true);
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setCurrentTranslation(null);
    setNotFound(false);
  };

  const handleAddToFavorites = () => {
    if (!currentTranslation) return;

    const existingFavorite = favorites.find(
      (fav) =>
        fav.word === currentTranslation.word &&
        fav.sourceLanguage === sourceLanguage.code &&
        fav.targetLanguage === targetLanguage.code
    );

    if (existingFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== existingFavorite.id));
    } else {
      const newFavorite: Favorite = {
        id: Date.now().toString(),
        word: currentTranslation.word,
        translation: currentTranslation.translation,
        sourceLanguage: sourceLanguage.code,
        targetLanguage: targetLanguage.code,
        timestamp: Date.now(),
      };
      setFavorites([newFavorite, ...favorites]);
    }
  };

  const isFavorite = () => {
    if (!currentTranslation) return false;
    return favorites.some(
      (fav) =>
        fav.word === currentTranslation.word &&
        fav.sourceLanguage === sourceLanguage.code &&
        fav.targetLanguage === targetLanguage.code
    );
  };

  const handleSelectSearch = (search: SearchHistory) => {
    const sourceLang = AVAILABLE_LANGUAGES.find((lang) => lang.code === search.sourceLanguage);
    const targetLang = AVAILABLE_LANGUAGES.find((lang) => lang.code === search.targetLanguage);
    
    if (sourceLang && targetLang) {
      setSourceLanguage(sourceLang);
      setTargetLanguage(targetLang);
      setSearchQuery(search.word);
      
      const translation = searchTranslation(search.word, search.sourceLanguage, search.targetLanguage);
      if (translation) {
        setCurrentTranslation(translation);
        setNotFound(false);
      }
    }
  };

  const handleDownloadLanguage = (languageCode: string) => {
    Alert.alert('Download Started', 'Language pack is being downloaded...');
    setTimeout(() => {
      setLanguages(
        languages.map((lang) =>
          lang.code === languageCode ? { ...lang, isDownloaded: true } : lang
        )
      );
      Alert.alert('Download Complete', 'Language pack is now available offline!');
    }, 2000);
  };

  const handlePurchaseLanguage = (languageCode: string) => {
    const item = storeItems.find((item) => item.languageCode === languageCode);
    if (item) {
      handlePurchase(item.id);
    }
  };

  const handlePurchase = (itemId: string) => {
    setStoreItems(
      storeItems.map((item) =>
        item.id === itemId ? { ...item, isPurchased: true } : item
      )
    );

    const item = storeItems.find((i) => i.id === itemId);
    if (item?.languageCode) {
      setLanguages(
        languages.map((lang) =>
          lang.code === item.languageCode ? { ...lang, isPremium: false } : lang
        )
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {/* Header */}
          <View className="mb-6">
            <View className="flex-row items-center mb-2">
              <BookOpen size={32} color="#4F46E5" />
              <Text className="text-3xl font-bold text-gray-900 ml-3">Dictionary</Text>
            </View>
            <Text className="text-base text-gray-600">
              Translate words offline in multiple languages
            </Text>
          </View>

          {/* Search Bar */}
          <View className="mb-4">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search for a word..."
            />
          </View>

          {/* Language Selectors */}
          <View className="flex-row items-center gap-3 mb-6">
            <LanguageSelector
              selectedLanguage={sourceLanguage}
              languages={languages}
              onSelect={setSourceLanguage}
              label="From"
            />
            <TouchableOpacity
              onPress={handleSwapLanguages}
              className="bg-white rounded-xl p-3 shadow-sm mt-6"
            >
              <ArrowLeftRight size={20} color="#6B7280" />
            </TouchableOpacity>
            <LanguageSelector
              selectedLanguage={targetLanguage}
              languages={languages}
              onSelect={setTargetLanguage}
              label="To"
            />
          </View>

          {/* Translation Result */}
          {currentTranslation && (
            <View className="mb-6">
              <TranslationResult
                translation={currentTranslation}
                onAddToFavorites={handleAddToFavorites}
                isFavorite={isFavorite()}
              />
            </View>
          )}

          {/* Not Found Message */}
          {notFound && (
            <View className="bg-red-50 rounded-2xl p-6 mb-6 border border-red-100">
              <Text className="text-center text-red-700 font-semibold">
                Translation not found
              </Text>
              <Text className="text-center text-red-600 text-sm mt-1">
                Try a different word or check if the language pack is downloaded
              </Text>
            </View>
          )}

          {/* Recent Searches */}
          <View className="mb-6">
            <RecentSearches
              searches={searchHistory}
              onSelectSearch={handleSelectSearch}
              onClearHistory={() => setSearchHistory([])}
            />
          </View>

          {/* Favorites */}
          <View className="mb-6">
            <FavoritesList
              favorites={favorites}
              onSelectFavorite={(fav) => {
                const sourceLang = AVAILABLE_LANGUAGES.find((lang) => lang.code === fav.sourceLanguage);
                const targetLang = AVAILABLE_LANGUAGES.find((lang) => lang.code === fav.targetLanguage);
                if (sourceLang && targetLang) {
                  setSourceLanguage(sourceLang);
                  setTargetLanguage(targetLang);
                  setSearchQuery(fav.word);
                  const translation = searchTranslation(fav.word, fav.sourceLanguage, fav.targetLanguage);
                  if (translation) {
                    setCurrentTranslation(translation);
                    setNotFound(false);
                  }
                }
              }}
              onRemoveFavorite={(id) => setFavorites(favorites.filter((fav) => fav.id !== id))}
            />
          </View>

          {/* Language Packages */}
          <View className="mb-6">
            <LanguagePackages
              languages={languages}
              onDownload={handleDownloadLanguage}
              onPurchase={handlePurchaseLanguage}
            />
          </View>

          {/* Store */}
          <View className="mb-6">
            <Store items={storeItems} onPurchase={handlePurchase} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}