import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Conversation = ({ conversationId, chapterConversation }) => {
  const conversation = chapterConversation.find(conv => conv.id === conversationId);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(conversation.messages.reverse());
  const handleSend = () => {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage = { received: false, msg: inputText };
    setMessages([...messages.reverse(), newMessage]);
    setInputText('');
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
      <View style={styles.conversationContainer}>
        <FlatList
          data={messages.reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          inverted
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Send</Text>
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
});

export default Conversation;
