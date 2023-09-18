import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConversation } from "../interfaces/messages.interface";

export const NAME = 'Matéo';

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Dernière partie",
]

export const startingConversation: IConversation =
{
    id: 5,
    name: 'Frédéric',
    profilePicture: 'https://images.midilibre.fr/api/v1/images/view/62ae939ea6b323191f59968d/large/image.jpg?v=1',
    messages: [
        { type: 'indication', received: true, msg: `mardi 17 décembre` },
        { type: 'indication', received: true, msg: `Frédéric veut vous envoyer un message` },
    ],
    choices: [
        "(Accepter)",
    ]
}

export const followingMessage = async (message, playerName) => {
    switch (message) {
        case "(Accepter)":
            return {
                messages: [
                    { msg: `Bonjour ${playerName}`, type: null, received: true },
                    { msg: `Je suis le père de Lucie`, type: null, received: true },
                    { msg: `Je sais que vous êtes proches ma fille et toi`, type: null, received: true },
                    { msg: `Alors voilà...`, type: null, received: true },
                    { msg: `je voulais t'annoncer son décès hier dans l'après midi...`, type: null, received: true },
                    { msg: `Lucie s'est suicidée.`, type: null, received: true },

                ],
                choices: [
                    "QUOI ?!",
                ]
            };
        case "QUOI ?!":
            return {
                messages: [
                    { msg: `Oui...`, type: null, received: true },
                    { msg: `Elle s'est tiré une balle dans la tête.`, type: null, received: true },
                    { msg: `Bon courage ${playerName}.`, type: null, received: true },
                    { msg: `FIN DE LA PREMIERE PARTIE`, type: 'indication', received: true },
                ]
            }
    }
}