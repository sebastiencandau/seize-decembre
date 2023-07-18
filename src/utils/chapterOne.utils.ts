import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export const NAME = 'LUCIE';

export const LucieScenarioUn = {
    one: {
        messages: ["ça va ?"],
        choices: [
            "Oui et toi ?",
            "non"
        ]
    },
    two: {
        messages:[ "caca"],
        choices: [
            "ok",
            "ah bon",
        ],
    },
    twoBis: {
        messages: ["pipi"],
        choices: [
            "a",
            "e",
        ]
    },
    three: {
        messages: ["test"],
        choices: []
    },
    threeBis: {
        messages: ["testtt"],
        choices: []
    },
    threeBisBis: {
        messages: ["a"],
        choices: []
    }

}

export const playerChoices = {
    one : [
        "hello",
        "salut",
    ],
    two : [
        "Oui et toi ?",
        "non"
    ],
    three: [
        "ok",
        "ah bon",
    ],
    threeBis: [
        "a",
        "e"
    ]
}

export const followingMessage = (message) => {
    switch(message) {
        // One
        case "hello": 
        case "salut":
            return {followingMessage: LucieScenarioUn.one.messages, followingChoices: LucieScenarioUn.one.choices}
            break;
        case "Oui et toi ?":
            return {followingMessage: LucieScenarioUn.two.messages, followingChoices: LucieScenarioUn.two.choices}
            break;
        case "non": 
        return {followingMessage: LucieScenarioUn.twoBis.messages, followingChoices: LucieScenarioUn.twoBis.choices}
        break;
        case "ok":
            return {followingMessage: LucieScenarioUn.three.messages, followingChoices: LucieScenarioUn.three.choices}
            break;
        case "ah bon":
            return {followingMessage: LucieScenarioUn.threeBis.messages, followingChoices: LucieScenarioUn.threeBis.choices}
            break;
        case "e" || "e":
            return {followingMessage: LucieScenarioUn.threeBisBis.messages, followingChoices: LucieScenarioUn.threeBisBis.choices}
            break;
    }
}

export const startingConversations = [
    { id: 1, 
        name: 'Lucie' ,
        profilePicture: 'https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fgal.2F2020.2F10.2F10.2Fb6dc622e-40b2-4ceb-bc07-f5ba40a644ee.2Ejpeg/420x420/quality/80/focus-point/492%2C210/photos-filip-nikolic-nouvelle-tete-pour-sa-sublime-fille-sasha.jpg',
        messages: [
            {received: true, msg: "Hey ! :)"},
        ]
    },
]

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Lucie est une fille de votre lycée",
    "Elle n'est pas dans votre classe mais vous partagez un ami en commun, Matéo.",
    "Vous ne lui avez encore jamais parlé tout les deux. Un beau jour vous recevez une demande en ami..."
]

export const startChapterOne = () => { 
    
}