import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

const NarativeScreen = ({ currentIndication }) => {
  const backgroundImageUrl = 'https://www.numerama.com/wp-content/uploads/2018/08/ss_f589f1d664ad6932064052c265b59f9fa3eea322-1920x1080.jpg'; // Replace with your image URL

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
