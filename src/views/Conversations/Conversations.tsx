import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/elements';
import Conversation from '../Conversation/Conversation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { startingConversations } from '../../utils/chapters.utils';


const Conversations = ({ chapter, playerName }) => {
  const navigation = useNavigation();
  const [conversationChoosed, setConversationChoosed] = useState()
  const conversations = startingConversations(chapter);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setConversationChoosed(null);
  };

  // Rendu des éléments de la liste de conversations
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setConversationChoosed(item.name)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {conversationChoosed && (
        <Modal onRequestClose={closeModal}>
        <Conversation
          contactName={conversationChoosed}
          playerName={playerName}
          chapterConversation={conversations}
          chapter={chapter}
          closeModal={closeModal} // Pass the closeModal function to the Conversation component
        />
      </Modal>
      )
      }
      <Text style={styles.title}>Conversations</Text>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Conversations;
