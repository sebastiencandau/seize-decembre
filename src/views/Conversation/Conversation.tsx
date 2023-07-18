import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { followingMessage, playerChoices } from '../../utils/chapters.utils';

const Conversation = ({ contactName, chapterConversation, chapter }) => {
  const conversation = chapterConversation.find(conv => conv.name === contactName);
  const allChoises = playerChoices(chapter);
  const [messages, setMessages] = useState(conversation.messages);
  const [gameProgress, setGameProgress] = useState(0);
  const [choices, setChoices] = useState<Array<string>>()
  const [modalChoiceOpen, setModalChoiceOpen] = useState(false);

  
  useEffect(() => {
    setChoices(allChoises.one)
  }, []);

  useEffect(() => {
    if(gameProgress > 0){
    const receiverMessages = followingMessage(chapter, messages[0].msg);
    console.log(receiverMessages);
    setChoices(receiverMessages.followingChoices);
    setTimeout(() => {
      receiverMessages.followingMessage.forEach((message) => {
        setMessages([{ received: true, msg: message }, ...messages]);
      });
    }, 3000); // Délai de 3 secondes (3000 millisecondes)
  }
    }, [gameProgress]);

  const handleSend = (item) => {
    const newMessage = { received: false, msg: item };
    setMessages([newMessage, ...messages]);
    
    setModalChoiceOpen(false); // Exécution immédiate
    setGameProgress(gameProgress + 1);


  };
  

  const doChoice = () => {
    setModalChoiceOpen(true);
  };

  const closeModal = () => {
    setModalChoiceOpen(false);
  };

  const renderMessage = ({ item }) => (
    <>
      {!item.type && (
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
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
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: conversation.profilePicture }} style={styles.profilePicture} />
        </View>
        <Text style={styles.contactNameText}>{contactName}</Text>
      </View>
      <Modal visible={modalChoiceOpen} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPressOut={closeModal}>
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
        />
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePictureContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contactNameText: {
    fontSize: 16,
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
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
  },
  textInput: {
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
  },
  choiceItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  choiceText: {
    fontSize: 16,
  },
});

export default Conversation;
