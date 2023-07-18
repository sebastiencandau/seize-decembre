import React from 'react';
import { View, Text } from 'react-native';
const Conversation = ({ conversationId }) => {

  return (
    <View>
      <Text>Conversation {conversationId}</Text>
    </View>
  );
};

export default Conversation;
