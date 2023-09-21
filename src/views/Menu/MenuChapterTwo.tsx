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
  Image,
  ScrollView
} from 'react-native';
import { choicesDescription } from '../../utils/chapterOne/chaptersChapterOne.utils';
import { Audio } from 'expo-av';

const Menu = ({ startGame, chapter, restartGame }) => {

  const [playerName, setPlayerName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [restart, setRestart] = useState(false);
  const [choicesModalVisible, setChoicesModalVisible] = useState(false);
  const [choicesList, setChoicesList] = useState([]);
  const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound>();


  const startMusic = async () => {
    if(chapter){
      if(chapter === 88172 /* todo */){
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/musics/chapter_one_ending_music.mp3'));
        sound.playAsync();
        setBackgroundMusic(sound); 
      } else {
      const { sound } = await Audio.Sound.createAsync( require('../../../assets/musics/labyrinthe_of_pan.mp3'));
      sound.playAsync()
      setBackgroundMusic(sound);
      }
    }
  }

  React.useEffect(() => {
    startMusic();
  }, [chapter]);

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
    backgroundMusic.stopAsync();
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
        uri: 'https://images.unsplash.com/photo-1591648999768-a5ea83ff503a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8MzQ0NDA0NXx8ZW58MHx8fHx8&w=1000&q=80',
      }}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Seize décembre</Text>
        <Text style={styles.title}>Chapitre 2: Aveuglés</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>{chapter === 8 ? 'Commencer': 'Continuer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressChoices} style={styles.button}>
        <Text style={styles.buttonText}>Voir mes choix</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handlePressRestart} style={styles.button}>
          <Text style={styles.buttonText}>Recommencer le chapitre</Text>
        </TouchableOpacity>
      </View>

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
      <ScrollView style={styles.choicesScrollView}>
        {choicesList.map((choice, index) => (
          <View key={index} style={styles.ModalChoice}>
            {index % 2 === 0 ? ( // Alterne entre gauche et droite pour chaque choix
              <>
                {choice.img && (
                  <Image source={choice.img} style={styles.choiceImage} />
                )}
                <Text style={styles.choiceText}>
                  {choice.desc}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.choiceText}>
                  {choice.desc}
                </Text>
                {choice.img && (
                  <Image source={choice.img} style={styles.choiceImage} />
                )}
              </>
            )}
          </View>
        ))}

      </ScrollView>
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
    backdropFilter: 'blur(10px)', // Applique un flou de 10px au fond
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
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
    color: 'white'
  },
  ModalChoice: {
    flexDirection: 'row', // Pour afficher les éléments en ligne (texte et image)
    alignItems: 'center', // Pour aligner les éléments verticalement au centre
    marginBottom: 50, // Espacement entre les choix  },
  },
  choiceImage: {
    width: 200, // Ajoutez la largeur souhaitée
    height: 200, // Ajoutez la hauteur souhaitée
    resizeMode: 'contain', // Ajustez le mode de redimensionnement en fonction de vos besoins
    marginBottom: 10, // Marge inférieure pour espacer l'image de la description
    marginRight: 10
  },  
  choicesScrollView: {
    maxHeight: 500, // Ajustez la hauteur maximale de la ScrollView selon vos besoins
    marginBottom: 10, // Espacement entre la liste des choix et le bouton Fermer
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
