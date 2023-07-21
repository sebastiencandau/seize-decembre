import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NarativeScreen from './src/components/NarativeScreen';
import { narativeIndicationsForChapter, startingConversation } from './src/utils/chapters.utils';
import Conversation from './src/views/Conversation/Conversation';
import Menu from './src/views/Menu/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

export default function App() {
  const currentChapter = 1;
  const [narrativeIndications, setNarrativeIndications] = useState<string[]>(); 
  const [currentIndication, setCurrentIndication] = useState<string>();
  const conversationChapter = startingConversation(currentChapter);
  const [index, setIndex] = useState(0);
  const [playerName, setPlayerName] = useState<string>();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if(narrativeIndications){
    if (index <= narrativeIndications.length) {
      const timer = setInterval(() => {
        setCurrentIndication(narrativeIndications[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 5000); // 1000 ms = 1 second
      return () => {
        clearInterval(timer);
      };
    }
  }
  }, [index, narrativeIndications]);

  const closeModal = () => {
    setIndex(0);
    setNarrativeIndications(undefined);
  }


  const startGame = async () => {
    const name = await AsyncStorage.getItem('playerName');
    if(name){
      setPlayerName(name);
      setNarrativeIndications(narativeIndicationsForChapter(currentChapter));
    }
  }

  const renderChapterScreen = (currentIndication) => {
    if(!narrativeIndications) {
      return <Menu startGame={startGame}></Menu>
    }
    else if (index <= narrativeIndications.length) {
      return <NarativeScreen currentIndication={currentIndication} />;
    } else {
      return        ( <Modal>
      <Conversation
        contactName={conversationChapter.name}
        playerName={playerName}
        chapterConversation={conversationChapter}
        chapter={currentChapter}
        closeModal={closeModal} // Pass the closeModal function to the Conversation component
      />
    </Modal>)
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
