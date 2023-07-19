import * as chapterOne from './chapterOne.utils';


export const narativeIndicationsForChapter = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.narativeIndications;
    } else {
        return chapterOne.narativeIndications
    }
}

export const playerChoices = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.playerChoices;
    } else {
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

export const followingMessage = (chapterNumber, message) => {
    if (chapterNumber === 1) {
        return chapterOne.followingMessage(message);
    } else {
        return chapterOne.followingMessage(message);
    }
}

export const startingConversations = (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.startingConversations;
    } else {
        return chapterOne.startingConversations
    }
}