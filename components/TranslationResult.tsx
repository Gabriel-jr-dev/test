import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Volume2, Star, BookOpen } from 'lucide-react-native';
import { Translation } from '@/types/dictionary';

interface TranslationResultProps {
  translation: Translation;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

export default function TranslationResult({ 
  translation, 
  onAddToFavorites,
  isFavorite 
}: TranslationResultProps) {
  return (
    <View className="bg-white rounded-2xl shadow-lg shadow-black/10 p-6 border border-gray-100">
      {/* Word and Translation */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-500 mb-1">Translation</Text>
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          {translation.translation}
        </Text>
        {translation.pronunciation && (
          <View className="flex-row items-center">
            <Text className="text-base text-gray-600 italic">
              /{translation.pronunciation}/
            </Text>
          </View>
        )}
      </View>

      {/* Part of Speech */}
      {translation.partOfSpeech && (
        <View className="mb-4">
          <View className="bg-blue-50 px-3 py-1 rounded-full self-start">
            <Text className="text-sm font-medium text-blue-700">
              {translation.partOfSpeech}
            </Text>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row gap-3 mb-4">
        <TouchableOpacity className="flex-1 bg-blue-600 rounded-xl py-3 flex-row items-center justify-center">
          <Volume2 size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Pronounce</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={onAddToFavorites}
          className={`flex-1 rounded-xl py-3 flex-row items-center justify-center ${
            isFavorite ? 'bg-amber-500' : 'bg-gray-100'
          }`}
        >
          <Star size={20} color={isFavorite ? 'white' : '#6B7280'} fill={isFavorite ? 'white' : 'none'} />
          <Text className={`font-semibold ml-2 ${isFavorite ? 'text-white' : 'text-gray-700'}`}>
            {isFavorite ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Examples */}
      {translation.examples && translation.examples.length > 0 && (
        <View>
          <View className="flex-row items-center mb-3">
            <BookOpen size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 ml-2">Examples</Text>
          </View>
          <View className="space-y-2">
            {translation.examples.map((example, index) => (
              <View key={index} className="bg-gray-50 rounded-lg p-3">
                <Text className="text-sm text-gray-700 leading-5">{example}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
