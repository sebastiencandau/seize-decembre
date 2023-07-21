import * as chapterOne from './chapterOne.utils';
import * as chapterTwo from './chapterTwo.utils';



export const narativeIndicationsForChapter = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.narativeIndications;
    } else if (chapterNumber === 2) {
        return chapterTwo.narativeIndications;
    }
}

export const playerChoices = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.playerChoices;
    } 
    else {
        return chapterOne.playerChoices
    }
}

export const receiverScenario = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.LucieScenarioUn;
    } else {
        return chapterOne.LucieScenarioUn
    }
}

export const followingMessage = (chapterNumber, message, playerName) => {
    if (chapterNumber === 1) {
        return chapterOne.followingMessage(message, playerName);
    } else if (chapterNumber === 2) {
        return chapterTwo.followingMessage(message, playerName);
    }
}

export const startingConversation = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.startingConversation;
    } else if (chapterNumber === 2) {
        return chapterTwo.startingConversation;
    }
    
    else {
        return chapterOne.startingConversation
    }
}