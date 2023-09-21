import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import  {narrative}  from '../utils/chapterTwo/chapterTwoIntroduction.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';


const YourComponent = ({changeChapter}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1591648999768-a5ea83ff503a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8MzQ0NDA0NXx8ZW58MHx8fHx8&w=1000&q=80'; // Remplacez par votre URL d'image
  const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound>();
  const lucieDrawingPng = require('../../assets/lucie_drawing.png');

  const startMusic = async () => {
        const { sound } = await Audio.Sound.createAsync( require('../../assets/musics/chapter_one_ending_music.mp3'));
        sound.playAsync();
        setBackgroundMusic(sound); 
  }

  React.useEffect(() => {
    startMusic();
  }, []);


  const currentText = narrative[currentIndex];

  return (
    <ImageBackground
    source={{ uri: backgroundImageUrl }}
    style={styles.backgroundImage}
    blurRadius={10}
  >
    <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
        <View style={styles.container}>
          <Text style={styles.narrativeText}>{currentText}</Text>
        </View>
        { narrative.length === currentIndex &&
          <Image source={{uri: lucieDrawingPng}} style={styles.choiceImage} />
        }
        <TouchableOpacity onPress={() => {
          if(narrative.length === currentIndex){
            backgroundMusic.stopAsync();
            changeChapter();
          } else {setCurrentIndex(currentIndex + 1)}
        }} style={styles.button}>
          <Text style={styles.buttonText}>{narrative.length === currentIndex ? "Commencer le chapitre 2" : "Suivant ➔"}</Text>
        </TouchableOpacity>
      </View>
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
    choiceImage: {
      width: 200, // Ajoutez la largeur souhaitée
      height: 200, // Ajoutez la hauteur souhaitée
      resizeMode: 'contain', // Ajustez le mode de redimensionnement en fonction de vos besoins
      marginBottom: 10, // Marge inférieure pour espacer l'image de la description
      marginRight: 10
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      padding: 20,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)', // Add a semi-transparent overlay for better readability
      padding: 20,
    },
    narrativeText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff', // Light text color to contrast with the background
    },
    button: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
    },
  });

export default YourComponent;
