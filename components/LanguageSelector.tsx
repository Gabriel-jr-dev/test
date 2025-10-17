import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { Language } from '@/types/dictionary';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  languages: Language[];
  onSelect: (language: Language) => void;
  label: string;
}

export default function LanguageSelector({ 
  selectedLanguage, 
  languages, 
  onSelect,
  label 
}: LanguageSelectorProps) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (language: Language) => {
    onSelect(language);
    setModalVisible(false);
  };

  return (
    <View className="flex-1">
      <Text className="text-xs font-medium text-gray-500 mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center justify-between"
      >
        <View className="flex-row items-center flex-1">
          <Text className="text-2xl mr-2">{selectedLanguage.flag}</Text>
          <Text className="text-base font-medium text-gray-900" numberOfLines={1}>
            {selectedLanguage.name}
          </Text>
        </View>
        <ChevronDown size={20} color="#6B7280" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[70%]">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-gray-900">{label}</Text>
            </View>
            <ScrollView className="px-4">
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  onPress={() => handleSelect(language)}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100"
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{language.flag}</Text>
                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-900">
                        {language.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {language.nativeName}
                      </Text>
                    </View>
                    {language.isPremium && !language.isDownloaded && (
                      <View className="bg-amber-100 px-2 py-1 rounded-full mr-2">
                        <Text className="text-xs font-semibold text-amber-700">Premium</Text>
                      </View>
                    )}
                  </View>
                  {selectedLanguage.code === language.code && (
                    <Check size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-4 border-t border-gray-200"
            >
              <Text className="text-center text-base font-semibold text-blue-600">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
