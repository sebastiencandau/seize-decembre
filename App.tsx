import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conversations from './src/views/Conversations/Conversations';
import NarativeScreen from './src/components/NarativeScreen';
import { narativeIndicationsForChapter } from './src/utils/chapters.utils';

const Tab = createBottomTabNavigator();

export default function App() {
  const currentChapter = 1;
  const narrativeIndications = narativeIndicationsForChapter(currentChapter);
  const [currentIndication, setCurrentIndication] = useState<string>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index <= narrativeIndications.length) {
      const timer = setInterval(() => {
        setCurrentIndication(narrativeIndications[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 1000); // 1000 ms = 1 second
      return () => {
        clearInterval(timer);
      };
    }
  }, [index, narrativeIndications]);

  const renderChapterScreen = (currentIndication) => {
    if (index <= narrativeIndications.length) {
      return <NarativeScreen currentIndication={currentIndication} />;
    } else {
      return <Conversations chapter={currentChapter} />;
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tab.Screen name="Home">
          {() => renderChapterScreen(currentIndication)}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
