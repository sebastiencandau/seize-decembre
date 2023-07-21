import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

const NarativeScreen = ({ currentIndication }) => {
  const backgroundImageUrl = 'https://www.warlegend.net/wp-content/uploads/screenshot1.jpg'; // Replace with your image URL

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.backgroundImage}
      blurRadius={10} // Adjust the blur value as per your preference
    >
      <View style={styles.container}>
        <Text style={styles.narrativeText}>{currentIndication}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Add a semi-transparent overlay for better readability
    padding: 20,
  },
  narrativeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // Light text color to contrast with the background
  },
});

export default NarativeScreen;
