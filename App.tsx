import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conversations from './src/views/Conversations/Conversations';
import NarativeScreen from './src/components/NarativeScreen'; // Importez votre composant d'écran narratif
import {narativeIndicationsForChapter} from './src/utils/chapters.utils';

const Tab = createBottomTabNavigator();

export default function App() {

  const currentChapter = 1;
  const narrativeIndications = narativeIndicationsForChapter(currentChapter);
  const [currentIndication, setCurrentIndication] = useState<string>();
  const [chapterText, setChapterText] = useState();
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if(index <= narrativeIndications.length){
      const timer = setInterval(() => {
        setCurrentIndication((narrativeIndications[index]));
        setIndex(index+1);
      }, 1000); // 5000 ms = 5 secondes
      return () => {
        clearInterval(timer);
      };
    }
  }, [index]);

  const renderChapterScreen = (currentIndication) => {
    if (index <= narrativeIndications.length) {
      console.log(index);
      return <NarativeScreen currentIndication={currentIndication} />;
    } else {
      console.log(narrativeIndications.length)
      console.log('hello')
      return <Conversations chapter={currentChapter}/>;
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
        <Tab.Screen
          name="Home"
          component={() => renderChapterScreen(currentIndication)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
