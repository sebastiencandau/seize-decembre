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
        case "je ne sais pas ce qu'il aime":
            return {
                messages: ["mmh il me semble qu'il a un penchant pour la science fiction... le dernier Matrix te conviendrait ?"],
                choices: ["oui c'est parfait, j'ai adoré tout les autres et je comptais aller le voir de toute façon",
                    "je suis pas trop SF mais pour lui je ferai des efforts 😅"]
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
        case "je comprends, tu es quelqu'un d'assez positive":
            return {
                messages: [
                    "j'essaye de l'être",
                    "et toi tu es quelq'un de positif ?"
                ], choices: ["j'essaye de l'être", "je le suis", "je n'arrive pas à l'être"]
            }
        case "j'aime également ce genre de films":
            return {
                messages: [
                    "c'est le genre de films qui nous permets de rester positif",
                    "tu es quelqu'un de positif ?"
                ], choices: ["j'essaye de l'être", "je le suis", "je n'arrive pas à l'être"]
            }
        case "j'essaye de l'être":
            return {
                messages: [
                    "je pense comme toi aussi",
                    "personnellement c'est grâce à l'art que j'arrive à mettre de la couleur et du positif sur ce monde"
                ], choices: ["je vois, je vais aller dormir. Je te souhaite bonne nuit Lucie :)", "tu es une artiste ?"]
            }
        case "je le suis":
        case "je n'arrive pas à l'être":
            return {
                messages: ["personnellement c'est grâce à l'art que j'arrive à mettre de la couleur et du positif sur ce monde"]
                , choices: ["je vois, je vais aller dormir. Je te souhaite bonne nuit Lucie :)", "tu es une artiste ?"]
            }
        case "je vois, je vais aller dormir. Je te souhaite bonne nuit Lucie :)":
            return {
                messages: ["bonne nuit à toi aussi :)"], choices: []
            }
        case "tu es une artiste ?":
            return {
                messages: ["ahah si on veut", "je fais du piano", "c'est très apaisant", "est-ce que tu pratiques d'un instrument ?"],
                choices: ["moi aussi je fais du piano", "je fais du violon", "il m'arrive de dessiner", "je n'aime pas particulièrement l'art"]
            }
        case "moi aussi je fais du piano":
        case "je fais du violon":
        case "il m'arrive de dessiner":
            return {
                messages: ['owh :)', "je sens qu'on va bien s'entendre toi et moi",
                    "malheureusement je dois te laisser, je commence les cours tôt demain",
                    "on se voit samedi au ciné :)",
                    "bonne nuit :))"
                ],
                choices: ["bonne nuit à toi aussi :)", "à samedi, j'ai hâte de te voir", "hasta luego"]
            }
        case "je n'aime pas particulièrement l'art":
            return {
                messages: ['il se fait tard',
                    "malheureusement je dois te laisser, je commence les cours tôt demain",
                    "bonne nuit :)"
                ],
                choices: ["bonne nuit à toi aussi :)", "à samedi, j'ai hâte de te voir", "hasta luego"]
            }
        case "bonne nuit à toi aussi :)":
        case "à samedi, j'ai hâte de te voir":
        case "hasta luego":
            return { messages: ["Lucie s'est déconnectée", "FIN DU CHAPITRE"], choices: [], type: 'indications' }

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