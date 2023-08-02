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
import { Audio } from 'expo-av';
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
  const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound>();

  async function setUpGame() {
    // set music
    const { sound } = await Audio.Sound.createAsync( require('./assets/musics/max_and_chloe.mp3'));
    setBackgroundMusic(sound);

    if(await AsyncStorage.getItem('chapter')){
    const chapter = await AsyncStorage.getItem('chapter');

    if(chapter){
      if(JSON.parse(chapter).result !== "loser"){
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
    }else {
      setCurrentChapter(1);
      setConversationChapter(await startingConversation(1));
    }
  }

  const playMusic = async () => {
    await backgroundMusic!.playAsync();
  }

  const stopMusic = async () => {
    await backgroundMusic!.stopAsync();
  }

  React.useEffect(() => {
    setUpGame();
  }, []);

  React.useEffect(() => {
    if(backgroundMusic){
      playMusic();
    }
  }, [backgroundMusic]);

  useEffect(() => {
    if(narrativeIndications){
    if (index <= narrativeIndications.length) {
      const timer = setInterval(() => {
        setCurrentIndication(narrativeIndications[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 100); // 1000 ms = 1 second
      return () => {
        clearInterval(timer);
      };
    }
  }
  }, [index, narrativeIndications]);

  const closeModal = async () => {
    stopMusic();
    setIndex(0);
    setNarrativeIndications(undefined);
    setUpGame();
  }

  const restartGame = async () => {
    const name = await AsyncStorage.getItem('playerName');
    setCurrentChapter(1);
    if(name){
      setPlayerName(name);
      setNarrativeIndications(await narativeIndicationsForChapter(1));
    }
  }

  const startGame = async () => {
    const name = await AsyncStorage.getItem('playerName');
    console.log(currentChapter);
    if(name){
      setPlayerName(name);

      setNarrativeIndications(await narativeIndicationsForChapter(currentChapter));
    }
  }

  const renderChapterScreen = (currentIndication) => {
    if(!narrativeIndications) {
      return <Menu startGame={startGame} restartGame={restartGame} chapter={currentChapter}></Menu>
    }
    else if (index <= narrativeIndications.length) {
      return <NarativeScreen currentIndication={currentIndication} />;
    } else {
      stopMusic();
      return        (
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
