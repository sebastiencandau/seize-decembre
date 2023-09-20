import * as chapterOne from './chapterOne.utils';
import * as chapterTwo from './chapterTwo.utils';
import * as chapterThree from './chapterThree.utils';
import * as chapterFour from './chapterFour.utils';
import * as chapterRdv from './chapterRdv.utils';
import * as chapterFinal from './chapterFinal.utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';


export const narativeIndicationsForChapter = async (chapterNumber) => {
    if (chapterNumber === 1) {
        return chapterOne.narativeIndications;
    } else if (chapterNumber === 2) {
        return chapterTwo.narativeIndications;
    } else if (chapterNumber === 3) {
        return chapterThree.narativeIndications;
    } else if (chapterNumber === 4) {
        return chapterFour.narativeIndications;
    } else if(chapterNumber === 999){
        return chapterRdv.narativeIndications;
    } else if(chapterNumber === 5){
        return chapterFinal.narativeIndications;
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
        return chapterFour.followingMessage(message, playerName);
    } else if (chapterNumber === 5){
        return chapterFinal.followingMessage(message, playerName);
    } else if (chapterNumber === 999){
        return chapterRdv.followingMessage(message, playerName);
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
        return chapterFour.startingConversation;
    } else if(chapterNumber === 999){
        return chapterRdv.startingConversation;
    } else if(chapterNumber === 5){
        return chapterFinal.startingConversation;
    }
    else {
        return chapterOne.startingConversation
    }
}

interface choices {
    desc: string;
    img?: Image;
}

export const choicesDescription = async (): Promise<choices[]> => {
    let choicesDesc: choices[] = [];
    const choicesData = JSON.parse(await AsyncStorage.getItem('choices'));

    let i = 0;
    choicesData.forEach(choice => {
        if (choice === "anniversaire") {
            if(i == 0){
                choicesDesc.push({
                    desc: "Vous n'avez pas obtenu de rendez-vous avec Lucie",
                    img: require('../../../assets/choices/no_rdv.png')
                });
            }
            choicesDesc.push({
                desc: "Lucie vous a invité à son anniversaire",
                img: require('../../../assets/choices/birthday.png')
            });
        }
        if (choice === "rdv") {
            choicesDesc.push({
                desc: "Vous avez obtenu un rendez-vous avec Lucie",
                img: require('../../../assets/choices/rdv.png')
            });
        }
        if(choice == "avance"){
            choicesDesc.push({
                desc: "Vous êtes arrivé en avance au rendez-vous, Lucie a été embarrassée",
                img: require('../../../assets/choices/time.png')
            });
        }
        if(choice == "heure"){
            choicesDesc.push({
                desc: "Vous êtes arrivé à l'heure au rendez-vous, cela a plut à Lucie",
                img: require('../../../assets/choices/time.png')
            });
        }
        if(choice == "retard"){
            choicesDesc.push({
                desc: "Vous êtes arrivé en retard au rendez-vous, cela a décu Lucie",
                img: require('../../../assets/choices/time.png')
            });
        }
        if (choice === "menteur") {
            choicesDesc.push({
                desc: "Vous avez fait le choix de mentir à Matéo et celui-ci ne vous parle plus",
                img:  require('../../../assets/choices/menteur.png')
            });
        }
        if (choice === "honnete") {
            choicesDesc.push({
                desc: "Vous avez été honnête avec Matéo et votre relation a été conservée",
                img:  require('../../../assets/choices/honnete.png')
            });
        }
        if(choice === "no_kiss"){
            choicesDesc.push({
                desc: "Vous n'avez rien tenté avec Lucie mais vous avez passé une bonne soirée",
                img:  require('../../../assets/choices/no_kiss.png')
            })
        }
        if(choice === "kiss"){
            choicesDesc.push({
                desc: "Vous avez embrassé Lucie",
                img:  require('../../../assets/choices/kiss.png')
            })
        }
        if(choice === "fight"){
            choicesDesc.push({
                desc: "Vous avez tenu tête à Brice",
                img:  require('../../../assets/choices/fight.png')
            })
        }
        if(choice === "no_fight"){
            choicesDesc.push({
                desc: "Vous avez préféré ignorer les attaques de Brice",
                img:  require('../../../assets/choices/fight.png')
            })
        }
        i++;
    });

    return choicesDesc;
}
