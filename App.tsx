import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NarativeScreen from './src/components/NarativeScreen';
import NarativeScreenIntroChapterTwo from './src/components/NarativeScreenIntroChapterTwo';
import { narativeIndicationsForChapter, startingConversation } from './src/utils/chapters.utils';
import Conversation from './src/views/Conversation/Conversation';
import MenuChapterOne from './src/views/Menu/MenuChapterOne';
import MenuChapterTwo from './src/views/Menu/MenuChapterTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IConversation } from './src/interfaces/messages.interface';



const Tab = createBottomTabNavigator();

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<number>();
  const [narrativeIndications, setNarrativeIndications] = useState<string[]>();
  const [currentIndication, setCurrentIndication] = useState<string>();
  const [conversationChapter, setConversationChapter] = useState<IConversation>();
  const [index, setIndex] = useState(0);
  const [playerName, setPlayerName] = useState<string>();
  const [gameStarted, setGameStarted] = useState(false);

  async function setUpGame() {

    const chapter = await AsyncStorage.getItem('chapter');
    console.log(chapter);

    if (chapter) {
      console.log(chapter)
      if (JSON.parse(chapter).result !== "loser") {
        setCurrentChapter(JSON.parse(chapter).num)
        setConversationChapter(await startingConversation(JSON.parse(chapter).num));
      } else {
        setCurrentChapter(1);
        setConversationChapter(await startingConversation(1));
      }
    } else {
      setCurrentChapter(1);
      setConversationChapter(await startingConversation(1));
    }
  }

  useEffect(() => {
    setUpGame();
  }, []);


  useEffect(() => {
    if (narrativeIndications) {
      if (index <= narrativeIndications.length) {
        const timer = setInterval(() => {
          setCurrentIndication(narrativeIndications[index]);
          setIndex((prevIndex) => prevIndex + 1);
        }, 2000); // 1000 ms = 1 second
        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [index, narrativeIndications]);

  const closeModal = async () => {
    setIndex(0);
    setNarrativeIndications(undefined);
    setUpGame();
  }

  const startChapterTwo = async () => {
    console.log(currentChapter);
    if (currentChapter === 6) {
      const newChapter = {
        num: 7,
        result: 'new_chapter'
      }
      await AsyncStorage.setItem('chapter', JSON.stringify(newChapter));
      setCurrentChapter(7);
    } else {
      const newChapter = {
        num: 8,
        result: 'new_chapter'
      }
      await AsyncStorage.setItem('chapter', JSON.stringify(newChapter));
      setCurrentChapter(8);
      setUpGame();
    }

  }

  const restartGame = async () => {
    const name = await AsyncStorage.getItem('playerName');
    setCurrentChapter(1);
    if (name) {
      setPlayerName(name);
      setNarrativeIndications(await narativeIndicationsForChapter(1));
    }
  }

  const startGame = async () => {
    console.log(currentChapter);
    const name = await AsyncStorage.getItem('playerName');
    if (name) {
      setPlayerName(name);
      setNarrativeIndications(await narativeIndicationsForChapter(currentChapter));
    }
  }

  const renderChapterScreen = (currentIndication) => {
    if (!narrativeIndications) {
      if (currentChapter === undefined || (currentChapter && currentChapter <= 6) || (currentChapter && currentChapter === 999)) {
        return <MenuChapterOne changeChapter={startChapterTwo} startGame={startGame} restartGame={restartGame} chapter={currentChapter}></MenuChapterOne>
      } else if ((currentChapter && currentChapter > 6)) {
        if (currentChapter === 7) {
          return <NarativeScreenIntroChapterTwo changeChapter={startChapterTwo}></NarativeScreenIntroChapterTwo>
        } 
         else {
          return <MenuChapterTwo startGame={startChapterTwo} restartGame={restartGame} chapter={currentChapter}></MenuChapterTwo>
        }
      }
    }
    else if (index <= narrativeIndications.length) {
      return <NarativeScreen currentIndication={currentIndication} />;
    } else {
      return (
        <Modal>
          <Conversation
            contactName={conversationChapter?.name}
            playerName={playerName}
            chapterConversation={conversationChapter}
            chapter={currentChapter}
            closeModal={closeModal} // Pass the closeModal function to the Conversation component
          /></Modal>)
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
