import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const Menu = ({ startGame, chapter }) => {
  const [playerName, setPlayerName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  console.log(chapter);
  const handlePress = async () => {
    if(await AsyncStorage.getItem('playerName')){
      startGame();
    } else {
      setModalVisible(true);
    }
  };

  const handlePressRestart = async () => {
    await AsyncStorage.clear();
    handlePress();
  };



  const handleStartGame = async () => {
    await AsyncStorage.setItem('playerName', playerName);
    startGame();
  };

  

  return (
    <ImageBackground
      source={{
        uri: 'https://www.warlegend.net/wp-content/uploads/screenshot1.jpg',
      }}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Seize décembre</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>{chapter === 1 ? 'Commencer': 'Continuer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressRestart} style={styles.button}>
          <Text style={styles.buttonText}>Recommencer</Text>
        </TouchableOpacity>
      </View>

      {/* La modale */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Entrez votre nom:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nom du joueur"
              onChangeText={(text) => setPlayerName(text)}
            />
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                setModalVisible(false);
                handleStartGame();
              }}
            >
              <Text style={styles.startButtonText}>Commencer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Menu;
