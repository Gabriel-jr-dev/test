import { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Settings</Text>
        <Text className="text-base text-gray-600 mb-8">
          Customize your dictionary experience with quick toggles.
        </Text>

        <View className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-200">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-semibold text-gray-900">
                Daily notifications
              </Text>
              <Text className="text-sm text-gray-600">
                Receive a new word of the day and revision reminders.
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        <View className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-semibold text-gray-900">
                Share anonymous analytics
              </Text>
              <Text className="text-sm text-gray-600">
                Help improve the app by sharing aggregated usage metrics.
              </Text>
            </View>
            <Switch value={analyticsEnabled} onValueChange={setAnalyticsEnabled} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
