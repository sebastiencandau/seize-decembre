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
import { choicesDescription } from '../../utils/chapters.utils';

const Menu = ({ startGame, chapter, restartGame }) => {

  const [playerName, setPlayerName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [restart, setRestart] = useState(false);
  const [choicesModalVisible, setChoicesModalVisible] = useState(false);
  const [choicesList, setChoicesList] = useState([]);

  console.log(chapter);
  const handlePress = async () => {
    if(await AsyncStorage.getItem('playerName')){
      if(!restart){
        startGame();
      } else {
        restartGame();
      }
    } else {
      setModalVisible(true);
    }
  };

  const handlePressRestart = async () => {
    await AsyncStorage.clear();
    setRestart(true);
    handlePress();
  };



  const handleStartGame = async () => {
    AsyncStorage.setItem('choices', JSON.stringify([]));
    await AsyncStorage.setItem('playerName', playerName);
    handlePress();
  };

  const handlePressChoices = async () => {
    const savedChoices = await AsyncStorage.getItem('choices');
    if (savedChoices) {
      const choices = JSON.parse(savedChoices);
      setChoicesList(await choicesDescription());
      setChoicesModalVisible(true);
    }
  };

  

  return (
    <ImageBackground
      source={{
        uri: 'https://www.numerama.com/wp-content/uploads/2018/08/ss_f589f1d664ad6932064052c265b59f9fa3eea322-1920x1080.jpg',
      }}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      { chapter !== 7 && 
      <View style={styles.container}>
        <Text style={styles.title}>Seize décembre</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>{chapter === 1 || !chapter ? 'Commencer': 'Continuer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressRestart} style={styles.button}>
          <Text style={styles.buttonText}>Recommencer</Text>
        </TouchableOpacity>
      </View>
      ||
      <View style={styles.container}>
      <Text style={styles.title}>Seize décembre</Text>
      <TouchableOpacity onPress={handlePressChoices} style={styles.button}>
        <Text style={styles.buttonText}>Voir mes choix</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressRestart} style={styles.button}>
          <Text style={styles.buttonText}>Recommencer</Text>
        </TouchableOpacity>
      <Text style={{marginTop: 15}}>La deuxième partie arrive bientôt...</Text>
    </View>
      }

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
            {/* Modale des choix */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={choicesModalVisible}
        onRequestClose={() => {
          setChoicesModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vos choix :</Text>
            {choicesList.map((choice, index) => (
              <View>
              <Text key={index} style={styles.choiceText}>
                {choice}
              </Text>
              <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
    marginBottom: 8
  }}
/>
              </View>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setChoicesModalVisible(false);
              }}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
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
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    marginTop: 10,
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
  choiceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Menu;
