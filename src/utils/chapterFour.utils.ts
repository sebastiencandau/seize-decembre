import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConversation } from "../interfaces/messages.interface";

export const NAME = 'Matéo';

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Partie 4",
]

export const startingConversation: IConversation =
{
    id: 3,
    name: 'Anniversaire de Lucie ❤️',
    profilePicture: 'https://static.wixstatic.com/media/29b61d_dd7fda3cf67048199aee9347e6c8e268~mv2.webp',
    messages: [
        { type: 'indication', received: true, msg: `Sarah vous a ajouté au groupe` },
        { type: null, received: true, prenom: "Sarah", msg: `Je crois qu'il y a tout le monde` },
        { type: null, received: true, msg: `Il manque des gens Lucie ?` },
        { type: null, received: true, prenom: "Lucie", msg: `non :) on est au complet !` },
    ],
    choices: [
        "Hey tout le monde",
        "( ne rien dire )",
    ]
}

export const followingMessage = async (message, playerName) => {
    let choices;
    switch (message) {
        case "tout va bien ?":
        case "ouais dis moi":
            return {
                messages: [
                    { msg: "ça concerne Lucie", type: null, received: true },
                ],
                choices: [
                    "Lucie ? C'est qui ?",
                    "je t'écoute",
                ]
            };
    }
}