import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Clock, Trash2 } from 'lucide-react-native';
import { SearchHistory } from '@/types/dictionary';
import { getLanguageByCode } from '@/data/languages';

interface RecentSearchesProps {
  searches: SearchHistory[];
  onSelectSearch: (search: SearchHistory) => void;
  onClearHistory: () => void;
}

export default function RecentSearches({ 
  searches, 
  onSelectSearch,
  onClearHistory 
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return (
      <View className="bg-white rounded-2xl shadow-lg shadow-black/10 p-6 border border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Clock size={20} color="#6B7280" />
            <Text className="text-lg font-bold text-gray-900 ml-2">Recent Searches</Text>
          </View>
        </View>
        <Text className="text-center text-gray-500 py-8">No recent searches yet</Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl shadow-lg shadow-black/10 p-6 border border-gray-100">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Clock size={20} color="#6B7280" />
          <Text className="text-lg font-bold text-gray-900 ml-2">Recent Searches</Text>
        </View>
        <TouchableOpacity onPress={onClearHistory}>
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2">
        <View className="flex-row gap-3 px-2">
          {searches.slice(0, 10).map((search) => {
            const sourceLang = getLanguageByCode(search.sourceLanguage);
            const targetLang = getLanguageByCode(search.targetLanguage);
            return (
              <TouchableOpacity
                key={search.id}
                onPress={() => onSelectSearch(search)}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 min-w-[140px] border border-blue-100"
              >
                <Text className="text-base font-semibold text-gray-900 mb-2">
                  {search.word}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-xs">{sourceLang?.flag}</Text>
                  <Text className="text-xs text-gray-500 mx-1">→</Text>
                  <Text className="text-xs">{targetLang?.flag}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
