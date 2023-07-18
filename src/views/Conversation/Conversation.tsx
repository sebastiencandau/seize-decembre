import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

const Conversation = ({ conversationId, chapterConversation }) => {
  const conversation = chapterConversation.find(conv => conv.id === conversationId);
  const [messages, setMessages] = useState(conversation.messages);
  const [modalChoiceOpen, setModalChoiceOpen] = useState(false);


  const handleSend = () => {
    const newMessage = { received: false, msg: 'test' };
    setMessages([newMessage, ...messages]); // Inverse l'ordre des messages en ajoutant le nouveau message en premier
  };
  

  const doChoice = () => {
    setModalChoiceOpen(true);
  }

  const closeModal = () => {
    setModalChoiceOpen(false);
  };

  const renderMessage = ({ item }) => (
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
  );

  return (
    <View style={styles.container}>
<Modal visible={modalChoiceOpen} transparent={true} >
  <TouchableOpacity style={styles.modalContainer} onPressOut={closeModal}>
    <View style={styles.modalContent}>
      <FlatList
        data={['Choix 1', 'Choix 2', 'Choix 3']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.choiceItem}>
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
        <TouchableOpacity  style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 35, // Espace entre le bas de la conversation et le bord de l'écran
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'transparent',
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
