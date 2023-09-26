import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Text, TextInput, TouchableOpacity,ImageBackground, Animated, FlatList, StyleSheet, Modal, Dimensions, TouchableHighlight, Linking } from 'react-native';
import { followingMessage } from '../../utils/chapters.utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IConversation, IMessage } from '../../interfaces/messages.interface';
import { Audio } from 'expo-av';
import { Link } from '@react-navigation/native';
import * as AllImages from '../../../assets';

const screen = Dimensions.get('window');
const screenWidth = screen.width - 80;

const Conversation = ({
  contactName,
  chapterConversation,
  chapter,
  closeModal,
  playerName,
}) => {
  const conversation: IConversation = chapterConversation;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [background, setBackground] = useState<string>();
  const [gameProgress, setGameProgress] = useState(0);
  const [choices, setChoices] = useState<Array<string>>()
  const [modalChoiceOpen, setModalChoiceOpen] = useState(false);
  const [futureMessages, setFutureMessages] = useState<IMessage[]>([])
  const [isWritting, setIsWriting] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [receiveMessageSound, setReceiveMessageSound] = useState<Audio.Sound>();
  const [isWritingSound, setIsWritingSound] = useState<Audio.Sound>();
  const [rdvTheme, setRdvTheme] = useState<Audio.Sound>();
  const [dotAnimation] = useState(new Animated.Value(0));
  const [imagePrenom, setImagePrenom] = useState('');
  const [playedMusic, setPlayedMusic] = useState<Audio.Sound>();
  


  const initSounds = async () => {
    const _receiveMessageSound = await Audio.Sound.createAsync(require('../../../assets/musics/receive_message.mp3'));
    const _isWritingSound = await Audio.Sound.createAsync(require('../../../assets/musics/typing.mp3'));
    setReceiveMessageSound(_receiveMessageSound.sound);
    setIsWritingSound(_isWritingSound.sound);
    const choices = JSON.parse(await AsyncStorage.getItem('choices'));
    if(chapter === 999 && choices[0] === 'rdv' ){
      const rdvTheme = await Audio.Sound.createAsync(require('../../../assets/musics/rdv_theme.mp3'));
      await rdvTheme.sound.playAsync();
    }
  }

  const stopPlayIsWrittingSound = async () => {
    await isWritingSound.stopAsync();
  }

  const stopPlayReceiveMessageSound = async () => {
    await receiveMessageSound.stopAsync();
  }

  const playIsWrittingSound = async () => {
    await isWritingSound.playAsync();
  }

  const playReceiveMessageSound = async () => {
    await receiveMessageSound.playAsync();
  }

  const playMusic = async (link: string) => {
    console.log('alo');
    const theme = await Audio.Sound.createAsync(require(`../../../assets/musics/${link}.mp3`));
    setPlayedMusic(theme.sound);
    await theme.sound.playAsync();
  }

  useEffect(() => {
    if (futureMessages.length > 0) {
      /*
      * Si c'est l'interlocuteur qui envoie un ou plusieurs messages, on time-out entre chaque message de manière 
      * à donner un effet "est en train d'écrire"
      */

      // message reçu par quelqu'un
      if (futureMessages[0].received && !futureMessages[0].type || futureMessages[0].type === "music") {
        setTimeout(() => {
          playIsWrittingSound();
          setIsWriting(true);
        }, 2000);
        stopPlayIsWrittingSound();
        setTimeout(() => {
          playReceiveMessageSound()
          if(futureMessages[0].prenom){
            setImagePrenom( `../../../assets/${futureMessages[0].prenom}.jpg`)
          } else {
            setImagePrenom(undefined);
          }
          if(futureMessages[0].type === 'music'){
            console.log('pitié');
            playMusic(futureMessages[0].link);
          }
          setMessages([futureMessages[0], ...messages]);
          const updatedFutureMessages = futureMessages.filter((msg) => msg !== futureMessages[0]);
          setIsWriting(false);
          setFutureMessages(updatedFutureMessages);
        }, 5000);
        stopPlayReceiveMessageSound()
      } else if (futureMessages[0].type === 'indication') {
        setTimeout(() => {
          setMessages([futureMessages[0], ...messages]);
          const updatedFutureMessages = futureMessages.filter((msg) => msg !== futureMessages[0]);
          setFutureMessages(updatedFutureMessages);
        }, 4000);
      }
      // message envoyé ou indication
      else {
        setTimeout(() => {
          setMessages([futureMessages[0], ...messages]);
          const updatedFutureMessages = futureMessages.filter((msg) => msg !== futureMessages[0]);
          setFutureMessages(updatedFutureMessages);
        }, 1000);
      }
    }
  }, [futureMessages]);

  useEffect(() => {
    initSounds();
    setChoices(conversation.choices);
    if(conversation.background){
      setBackground(conversation.background)
    }
    setFutureMessages(conversation.messages);
  }, []);

  const isEnding = async () => {
    if (messages.length > 0) {
      if (messages[0].type !== null) {
        if (messages[0].type !== 'indication') {
          if(messages[0].type !== 'music'){
            let newChapter;
            const choicesStorage = JSON.parse(await AsyncStorage.getItem('choices'));
            if(choicesStorage[0] === 'rdv' && chapter === 3){
              newChapter = {
              num: 999,
              result: messages[0].type
            }
          } else if (choicesStorage[0] === 'rdv' && chapter === 999){
            newChapter = {
              num: 4,
              result: messages[0].type
            }
          }
          else {
              newChapter = {
                num: chapter + 1,
                result: messages[0].type
              }
            }
            await AsyncStorage.setItem('chapter', JSON.stringify(newChapter));
            setTimeout(() => {
              if(playedMusic){
                playedMusic.stopAsync();
              }
              closeModal();
            }, 2000);
          }
        }
      }
    }
  }
  

  useEffect(() => {
    if (isWritting) {
      startDotAnimation();
    } else {
      stopDotAnimation();
    }
  }, [isWritting]);

  const startDotAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopDotAnimation = () => {
    dotAnimation.setValue(0);
  };

  useEffect(() => {
    isEnding();
  }, [messages]);

  const initChoices = async () => {
    if (gameProgress > 0) {
      const _followingMessage = await followingMessage(chapter, messages[0].msg, playerName);
      setChoices(_followingMessage.choices);
      setFutureMessages(_followingMessage.messages);
    }
  }


  useEffect(() => {
    initChoices();
  }, [gameProgress]);



  const handleSend = (item) => {
    const newMessage = { type: null, received: false, msg: item };
    setMessages([newMessage, ...messages]);

    setModalChoiceOpen(false); // Exécution immédiate
    setGameProgress(gameProgress + 1);
  };

  const toggleConfirmationModal = () => {
    setConfirmationModalVisible(!confirmationModalVisible);
  };


  const doChoice = () => {
    setModalChoiceOpen(true);
  };

  const closeChoicesModal = () => {
    setModalChoiceOpen(false);
  }

  const renderMessage = ({ item }) => (
    <>
      {(item.type === null || item.type === 'music') && (
        <View style={{flexDirection: 'column', 
        alignItems: item.received ? 'flex-start' : 'flex-end',  
        }}>
          {item.received && item.prenom && 
          <View style={{flexDirection: 'row'}}>
          <View style={styles.convPictureContainer}>
            <Image source={AllImages[item.prenom]} style={styles.profilePicture} />
          </View>
          <Text>{item.prenom}</Text>
          </View>
          }
          <View
            style={{
              backgroundColor: item.received ? '#e0e0e0' : '#80cbc4',
              borderRadius: 50,
              paddingHorizontal: 20,
              paddingVertical: 12,
              margin: 4,
            }}
          >
            <Text
              style={{
                color: item.received ? 'black' : 'white',
                fontSize: 15,
                fontStyle: 'normal',
              }}
            >
              {item.msg}
            </Text>
          </View>
        </View>
      ) || item.type === 'link' &&
      (
        <View style={{ flexDirection: item.received ? 'row' : 'row-reverse' }}>
          <View
            style={{
              backgroundColor: item.received ? '#e0e0e0' : '#80cbc4',
              borderRadius: 50,
              paddingHorizontal: 20,
              paddingVertical: 12,
              margin: 4,
            }}
          >
             <TouchableHighlight onPress={() => {Linking.openURL(item.msg);}}>
            <Text
              style={{
                color: item.received ? 'black' : 'white',
                fontSize: 15,
                fontStyle: 'normal',
              }}
            >
              {item.msg}
            </Text></TouchableHighlight>
          </View>
        </View>
      ) ||
      
      (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            <View>
              <Text style={{ width: 200, textAlign: 'center' }}>{item.msg}</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          </View>
        )}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contactNameContainer}>
        <Ionicons
          style={[{ height: 50, marginEnd: 10 }]}
          name="arrow-back-outline"
          size={36} color="black"
          onPress={toggleConfirmationModal}
        />
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: conversation.profilePicture }} style={styles.profilePicture} />
        </View>
        <Text style={styles.contactNameText}>{contactName}</Text>
      </View>
      <Modal visible={confirmationModalVisible} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPressOut={toggleConfirmationModal}>
          <View style={styles.modalContent}>
            <Text>Voulez vous retourner au menu principal ?</Text>
            <Text>la partie {chapter} ne sera pas sauvegardée</Text>
            <TouchableOpacity onPress={() => {
              if(playedMusic){
                playedMusic.stopAsync();
              }
              closeModal();
              }
              } style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleConfirmationModal} style={styles.confirmationButton}>
              <Text style={styles.confirmationButtonText}>Non</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={modalChoiceOpen} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPressOut={closeChoicesModal}>
          <View style={styles.modalContent}>
            <FlatList
              data={choices}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.choiceItem} onPress={() => handleSend(item)}>
                  <Text style={styles.choiceText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <ImageBackground blurRadius={5} source={{uri: background}} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.conversationContainer}>
            <FlatList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderMessage}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
              inverted
            />
            {isWritting &&
              <View style={{ flexDirection: 'row' }}>
                <Animated.View
                  style={{
                    backgroundColor: '#e0e0e0',
                    borderRadius: 50,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    margin: 4,
                    opacity: dotAnimation,
                  }}
                >
                  <Text>...</Text>
                </Animated.View>
              </View>
            }
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={futureMessages.length <= 0 ? doChoice : () => { }}>
              <TextInput
                style={styles.textInput}
                placeholder={futureMessages.length <= 0 ? "Faites un choix..." : ""}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Text style={{ color: 'white' }}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 35,
  },
  contactNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    height: 80,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePictureContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 8,
  }, backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
  },
  convPictureContainer: {
    width: 32,
    height: 32,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 8,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contactNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  conversationContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
  },
  textInput: {
    width: screenWidth,
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    backgroundColor: '#80cbc4',
    borderRadius: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    maxHeight: 500,
    width: 300
  },
  choiceItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  choiceText: {
    fontSize: 16,
  },
  confirmationButton: {
    paddingVertical: 8,
    backgroundColor: '#80cbc4',
    borderRadius: 8,
    marginVertical: 4,
  },
  confirmationButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Conversation;
