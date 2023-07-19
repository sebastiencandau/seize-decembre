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
        messages: ["caca"],
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
    one: [
        "hey :)",
        "salut",
        "tu es qui ?",
    ],
}

export const followingMessage = (message) => {
    switch (message) {
        case "tu es qui ?":
            return { messages: ["Lucie vous a bloqué", "FIN DU CHAPITRE"], choices: [], type: "indication" }
            break;
        case "hey :)":
        case "salut":
            return {
                messages: ["je pensais à un ciné ? Mais je ne sais pas quel type de films il aime"],
                choices: [
                    "il aime la science fiction",
                    "je ne sais pas ce qu'il aime",
                    "il aime les films d'animation"
                ]
            }
        case "il aime la science fiction":
            return {
                messages: ["très bien, alors on part sur le nouveau Matrix ! Ca te convient ? "],
                choices: ["oui c'est parfait, j'ai adoré tout les autres et je comptais aller le voir de toute façon",
                    "je suis pas trop SF mais pour lui je ferai des efforts 😅"]
            }
        case "oui c'est parfait, j'ai adoré tout les autres et je comptais aller le voir de toute façon":
            return {
                messages: ["ahah alors tant mieux. Pour ma part je ne suis pas trop SF mais ça me fait plaisir de faire plaisir"],
                choices: ["ah oui ? Quels genre de films te plaisent ?", "bon, on se voit samedi :) Bonne nuit Lucie", "et tu as quelqu'un dans ta vie ? ;)"]
            }
        case "je suis pas trop SF mais pour lui je ferai des efforts 😅":
            return { messages: ["c'est pareil pour moi, au moins on sera deux :)"], choices: ["ah oui ? Quels genre de films te plaisent ?", "bon, on se voit samedi :) Bonne nuit Lucie", "et tu as quelqu'un dans ta vie ? ;)"] }
        case "ah oui ? Quels genre de films te plaisent ?":
            return {
                messages: [
                    "owh",
                    "tu t'intéresse à moi ?",
                    "c'est mignon",
                    "plus sérieusement j'aime particulièrement les films longs et contemplatifs",
                    "le genre de films qui nous rappellent que notre monde est beau sans qu'on ait à en inventer de nouveaux, moins réalistes"
                ], choices: ["je comprends, tu es quelqu'un d'assez positive", "j'aime également ce genre de films"]
            }
    }
}

export const startingConversations = [
    {
        id: 1,
        name: 'Lucie',
        profilePicture: 'https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fgal.2F2020.2F10.2F10.2Fb6dc622e-40b2-4ceb-bc07-f5ba40a644ee.2Ejpeg/420x420/quality/80/focus-point/492%2C210/photos-filip-nikolic-nouvelle-tete-pour-sa-sublime-fille-sasha.jpg',
        messages: [
            { received: true, msg: `hey :) je me permets de t'envoyer un message parce qu'on comptait organiser un petit truc pour l'anniversaire de Matéo et je sais que vous êtes proches` },
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