import * as chapterOne from './chapterOne.utils';
import * as chapterTwo from './chapterTwo.utils';
import * as chapterThree from './chapterThree.utils';
import * as chapterFour from './chapterFour.utils';
import * as chapterRdv from './chapterRdv.utils';
import * as chapterFinal from './chapterFinal.utils'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const narativeIndicationsForChapter = async (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.narativeIndications;
    } else if (chapterNumber === 2) {
        return chapterTwo.narativeIndications;
    } else if (chapterNumber === 3) {
        return chapterThree.narativeIndications;
    } else if (chapterNumber === 4) {
        const choices = JSON.parse(await AsyncStorage.getItem('choices'));
        if (choices[0] === 'rdv') {
            return chapterRdv.narativeIndications;
        } else {
            return chapterFour.narativeIndications;
        }
    } else if (chapterNumber === 5) {
        return chapterFinal.narativeIndications;
    }
}

export const receiverScenario = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.LucieScenarioUn;
    } else {
        return chapterOne.LucieScenarioUn
    }
}

export const followingMessage = async (chapterNumber, message, playerName) => {
    if (chapterNumber === 1) {
        return await chapterOne.followingMessage(message, playerName);
    } else if (chapterNumber === 2) {
        return await chapterTwo.followingMessage(message, playerName);
    } else if (chapterNumber === 3) {
        return chapterThree.followingMessage(message, playerName);
    } else if (chapterNumber === 4) {
        const choices = JSON.parse(await AsyncStorage.getItem('choices'));
        if (choices[0] === 'rdv') {
            return chapterRdv.followingMessage(message, playerName);
        } else {
            return chapterFour.followingMessage(message, playerName);
        }
    } else if (chapterNumber === 5) {
        return chapterFinal.followingMessage(message, playerName);
    }
}

export const startingConversation = async (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.startingConversation;
    } else if (chapterNumber === 2) {
        return chapterTwo.startingConversation;
    } else if (chapterNumber === 3) {
        return chapterThree.startingConversation;
    } else if (chapterNumber === 4) {
        const choices = JSON.parse(await AsyncStorage.getItem('choices'));
        if (choices[0] === 'rdv') {
            return chapterRdv.startingConversation;
        } else {
            return chapterFour.startingConversation;
        }
    } else if (chapterNumber === 5){
        return chapterFinal.startingConversation;
    }
    else {
        return chapterOne.startingConversation
    }
}