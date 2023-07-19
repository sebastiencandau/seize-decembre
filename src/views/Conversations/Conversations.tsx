import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/elements';
import Conversation from '../Conversation/Conversation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { startingConversations } from '../../utils/chapters.utils';


const Conversations = ({ chapter }) => {
  const navigation = useNavigation();
  const [conversationChoosed, setConversationChoosed] = useState()
  const conversations = startingConversations(chapter);


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
        <Modal>
          <Ionicons
            onPress={() => setConversationChoosed(undefined)}
            style={[{ paddingTop: 35 }, { height: 70 }]}
            name="arrow-back-outline"
            size={36} color="black" />
          <Conversation contactName={conversationChoosed} chapterConversation={conversations} chapter={chapter}></Conversation>
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
