import * as chapterOne from './chapterOne.utils';
import * as chapterTwo from './chapterTwo.utils';
import * as chapterThree from './chapterThree.utils';
import * as chapterFour from './chapterFour.utils';


export const narativeIndicationsForChapter = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.narativeIndications;
    } else if (chapterNumber === 2) {
        return chapterTwo.narativeIndications;
    } else if (chapterNumber === 3) {
        return chapterThree.narativeIndications;
    } else if (chapterNumber === 4) {
        return chapterFour.narativeIndications;
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
    }else if (chapterNumber === 4) {
        return chapterFour.followingMessage(message, playerName);
    }
}

export const startingConversation = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.startingConversation;
    } else if (chapterNumber === 2) {
        return chapterTwo.startingConversation;
    } else if (chapterNumber === 3) {
        return chapterThree.startingConversation;
    } else if (chapterNumber === 4) {
        return chapterFour.startingConversation;
    }
    else {
        return chapterOne.startingConversation
    }
}