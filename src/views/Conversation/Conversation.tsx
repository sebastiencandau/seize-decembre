import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Dimensions } from 'react-native';
import { followingMessage, playerChoices } from '../../utils/chapters.utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IMessage } from '../../interfaces/messages.interface';

const screen = Dimensions.get('window');
const screenWidth = screen.width - 80; 

const Conversation = ({
  contactName,
  chapterConversation,
  chapter,
  closeModal,
  playerName,
}) => {
  const conversation = chapterConversation;
  const [messages, setMessages] = useState<IMessage[]>(conversation.messages);
  const [gameProgress, setGameProgress] = useState(0);
  const [choices, setChoices] = useState<Array<string>>()
  const [modalChoiceOpen, setModalChoiceOpen] = useState(false);
  const [futureMessages, setFutureMessages] = useState<IMessage[]>()
  const [isWritting, setIsWriting] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);


  useEffect(() => {
    setChoices(conversation.choices)
  }, []);

  useEffect(() => {
    if(AsyncStorage.hasOwnProperty('chapter' + chapter)){
      setTimeout(() => {
        closeModal()
    }, 2000); 
    }
  }, [messages]);



  useEffect(() => {
    if(gameProgress > 0){
    const _followingMessage = followingMessage(chapter, messages[0].msg, playerName);
    if(_followingMessage.messages[_followingMessage.messages.length - 1].type){
      if(_followingMessage.messages[_followingMessage.messages.length - 1].type !== 'indication'){
        const newChapter = {
          num: chapter,
          result: _followingMessage.messages[_followingMessage.messages.length - 1].type
        }
        AsyncStorage.setItem('chapter' + chapter, JSON.stringify(newChapter));
      }
    }
    setChoices(_followingMessage.choices);
    setFutureMessages(_followingMessage.messages);
  }
  }, [gameProgress]);

  useEffect(() => {
    if(gameProgress > 0 && futureMessages.length>0){
      /*
      * Si c'est l'interlocuteur qui envoie un ou plusieurs messages, on time-out entre chaque message de manière 
      * à donner un effet "est en train d'écrire"
      */
      if(futureMessages[0].received && !futureMessages[0].type){
        setTimeout(() => {
          setIsWriting(true);
      }, 2000); 
      setTimeout(() => {
          const alo = messages;
          [...alo, futureMessages[0]];

          setMessages([futureMessages[0], ...messages]);
          const updatedFutureMessages = futureMessages.filter((msg) => msg !== futureMessages[0]);
          setIsWriting(false);
          setFutureMessages(updatedFutureMessages);
      }, 5000); 
    } 
    else{
      setTimeout(() => {
        setMessages([futureMessages[0], ...messages]);
        const updatedFutureMessages = futureMessages.filter((msg) => msg !== futureMessages[0]);
        setFutureMessages(updatedFutureMessages);
    }, 1000); 
    }
  }
  }, [futureMessages]);

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
      {item.type === null && (
        <View style={{ flexDirection: item.received ? 'row' : 'row-reverse' }}>
          <View
            style={{
              backgroundColor: item.received ? '#e0e0e0' : '#80cbc4',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
          >
            <Text>{item.msg}</Text>
          </View>
        </View>
      ) || (
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
            style={[ { height: 50, marginEnd: 10 }]}
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
            <Text>Vos choix ne seront pas sauvegardé</Text>
            <TouchableOpacity onPress={closeModal} style={styles.confirmationButton}>
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
      <View style={styles.conversationContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          inverted
        />
        { isWritting && 
          <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#e0e0e0',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              margin: 4,
            }}
          >
            <Text>...</Text>
          </View>
        </View>}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={doChoice}>
          <TextInput
            style={styles.textInput}
            placeholder="Ecrivez un message..."
            editable={false}
            onPressIn={doChoice}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
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
