import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { IConversation, IMessage } from '../interfaces/messages.interface';

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



export const followingMessage = (message, playerName): { messages: IMessage[]; choices: string[] } => {
  switch (message) {
    case "tu es qui ?":
      return { messages: [{ msg: "Lucie vous a bloqué", type: "indication", received: true }, { msg: "PERDU", type: "loser", received: true }], choices: [] };
    case "hey :)":
    case "salut":
      return {
        messages: [{ msg: "c'est gentil, ça lui fera plaisir. Vous pensez à quoi ?", type: null, received: false }, { msg: "je pensais à un ciné ? Mais je ne sais pas quel type de films il aime", type: null, received: true }],
        choices: [
          "il aime la science fiction",
          "je ne sais pas ce qu'il aime",
          "il aime les films d'animation"
        ]
      };
    case "je ne sais pas ce qu'il aime":
      return {
        messages: [{ msg: "mmh il me semble qu'il a un penchant pour la science fiction... le dernier Matrix te conviendrait ?", type: null, received: true }],
        choices: ["oui c'est parfait, j'ai adoré tous les autres et je comptais aller le voir de toute façon",
          "je ne suis pas trop SF mais pour lui je ferai des efforts 😅"]
      };
    case "il aime la science fiction":
      return {
        messages: [{ msg: "très bien, alors on part sur le nouveau Matrix ! Ca te convient ?", type: null, received: true }],
        choices: ["oui c'est parfait, j'ai adoré tous les autres et je comptais aller le voir de toute façon",
          "je ne suis pas trop SF mais pour lui je ferai des efforts 😅"]
      };
    case "oui c'est parfait, j'ai adoré tous les autres et je comptais aller le voir de toute façon":
      return {
        messages: [{ msg: "ahah alors tant mieux. Pour ma part je ne suis pas trop SF mais ça me fait plaisir de faire plaisir", type: null, received: true }],
        choices: ["ah oui ? Quels genres de films te plaisent ?", "bon, on se voit samedi :) Bonne nuit Lucie", "et tu as quelqu'un dans ta vie ? 😉"]
      };
    case "je ne suis pas trop SF mais pour lui je ferai des efforts 😅":
      return { messages: [{ msg: "c'est pareil pour moi, au moins on sera deux :)", type: null, received: true }], choices: ["ah oui ? Quels genres de films te plaisent ?", "bon, on se voit samedi :) Bonne nuit Lucie", "et tu as quelqu'un dans ta vie ? 😉"] };
    case "bon, on se voit samedi :) Bonne nuit Lucie":
      return { messages: [{ msg: "bonne nuit à toi aussi :)", type: null, received: true },
      { msg: "Lucie s'est déconnectée", type: 'indication', received: true },
      { msg: "FIN DE LA PARTIE 1", type: 'pas_ri', received: true },
    ], choices: [] };
    case "et tu as quelqu'un dans ta vie ? 😉":
      return { messages: [{ msg: "tu dois être fatigué, je pense que je vais aller dormir", type: null, received: true },
      { msg: "Lucie s'est déconnectée", type: 'indication', received: true },
      { msg: "FIN DE LA PARTIE 1", type: 'pas_ri', received: true },
    ], choices: [] };
    case "ah oui ? Quels genres de films te plaisent ?":
      return {
        messages: [
          { msg: "owh", type: null, received: true },
          { msg: "tu t'intéresses à moi ?", type: null, received: true },
          { msg: "c'est mignon", type: null, received: true },
          { msg: "plus sérieusement j'aime particulièrement les films longs et contemplatifs", type: null, received: true },
          { msg: "le genre de films qui nous rappellent que notre monde est beau sans qu'on ait à en inventer de nouveaux, moins réalistes", type: null, received: true }
        ], choices: ["je comprends, tu es quelqu'un d'assez positif", "j'aime également ce genre de films"]
      };
    case "je comprends, tu es quelqu'un d'assez positif":
      return {
        messages: [
          { msg: "j'essaye de l'être", type: null, received: true },
          { msg: `et toi tu es quelqu'un de positif ${playerName} ?`, type: null, received: true }
        ], choices: ["j'essaye de l'être", "je le suis", "je n'arrive pas à l'être"]
      };
    case "j'aime également ce genre de films":
      return {
        messages: [
          { msg: "c'est le genre de films qui nous permet de rester positif", type: null, received: true },
          { msg: `tu es quelqu'un de positif ${playerName} ?`, type: null, received: true }
        ], choices: ["j'essaye de l'être", "je le suis", "je n'arrive pas à l'être"]
      };
    case "j'essaye de l'être":
      return {
        messages: [
          { msg: "je pense comme toi aussi", type: null, received: true },
          { msg: "personnellement c'est grâce à l'art que j'arrive à mettre de la couleur et du positif sur ce monde", type: null, received: true }
        ], choices: ["je vois, je vais aller dormir. Je te souhaite bonne nuit Lucie :)", "tu es une artiste ?"]
      };
    case "je le suis":
    case "je n'arrive pas à l'être":
      return {
        messages: [{ msg: "personnellement c'est grâce à l'art que j'arrive à mettre de la couleur et du positif sur ce monde", type: null, received: true }],
        choices: ["je vois, je vais aller dormir. Je te souhaite bonne nuit Lucie :)", "tu es une artiste ?"]
      };
    case "je vois, je vais aller dormir. Je te souhaite bonne nuit Lucie :)":
      return {
        messages: [{ msg: "bonne nuit à toi aussi :)", type: null, received: true }, 
        { msg: "Lucie s'est déconnectée", type: 'indication', received: true },
        { msg: "FIN DE LA PARTIE 1", type: 'pas_ri', received: true },
      ], choices: []
      };
    case "tu es une artiste ?":
      return {
        messages: [{ msg: "ahah si on veut", type: null, received: true },
        { msg: "je fais du piano", type: null, received: true },
        { msg: "c'est très apaisant", type: null, received: true },
        { msg: "est-ce que tu pratiques d'un instrument ?", type: null, received: true }],
        choices: ["moi aussi je fais du piano", "je fais du violon", "il m'arrive de dessiner", "je n'aime pas particulièrement l'art"]
      };
    case "moi aussi je fais du piano":
    case "je fais du piano":
    case "je fais du violon":
    case "il m'arrive de dessiner":
      return {
        messages: [{ msg: "owh :)", type: null, received: true },
        { msg: "je sens qu'on va bien s'entendre toi et moi", type: null, received: true },
        { msg: `${playerName} malheureusement je dois te laisser, je commence les cours tôt demain`, type: null, received: true },
        { msg: "on se voit samedi au ciné :)", type: null, received: true },
        { msg: "bonne nuit :))", type: null, received: true }
        ],
        choices: ["bonne nuit à toi aussi :)", "à samedi, j'ai hâte de te voir", "hasta luego"]
      };
    case "je n'aime pas particulièrement l'art":
      return {
        messages: [{ msg: "il se fait tard", type: null, received: true },
        { msg: `${playerName} malheureusement je dois te laisser, je commence les cours tôt demain`, type: null, received: true },
        { msg: "bonne nuit :)", type: null, received: true }
        ],
        choices: ["bonne nuit à toi aussi :)", "à samedi, j'ai hâte de te voir", "hasta luego"]
      };
    case "bonne nuit à toi aussi :)":
    case "à samedi, j'ai hâte de te voir":
    case "hasta luego":
      return { messages: [{ msg: "Lucie s'est déconnectée", type: "indication", received: true }, { msg: "FIN DE LA PARTIE 1", type: "ri", received: true }], choices: [] };
    case "il aime les films d'animation":
      return {messages : [{ msg: "mmh dans ce cas on ira voir le dernier Miyazaki, ça te convient ?", type: null, received: true }], choices: ["parfait, j'adore Miyazaki", "je ne connais pas mais je suis sûr que ce sera bien"]}
    case "parfait, j'adore Miyazaki":
      return {messages : [{msg: "on va bien s'entendre alors", type: null, received: true}, {msg: "tu as une âme d'artiste ?", type: null, received: true}], choices: ["je fais du piano", "je fais du violon", "il m'arrive de dessiner"]}
    case "je ne connais pas mais je suis sûr que ce sera bien":
      return {messages: [{msg: "si tu as une âme d'artiste, c'est évident que ça te plaira", received: true, type: null}], choices: ["je fais du piano", "je fais du violon", "il m'arrive de dessiner"]}
    
      default:
      return { messages: [], choices: [] };
  }
};


export const startingConversation: IConversation =
    {
        id: 1,
        name: 'Lucie',
        profilePicture: 'https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fgal.2F2020.2F10.2F10.2Fb6dc622e-40b2-4ceb-bc07-f5ba40a644ee.2Ejpeg/420x420/quality/80/focus-point/492%2C210/photos-filip-nikolic-nouvelle-tete-pour-sa-sublime-fille-sasha.jpg',
        messages: [
            { type: 'indication', received: true, msg: `Lucie vous a ajouté en ami` },
            { type: null, prenom: 'Lucie', received: true, msg: `hey :) je me permets de t'envoyer un message parce qu'on comptait organiser un petit truc pour l'anniversaire de Matéo et je sais que vous êtes proches` },
        ],
        choices: [
          "hey :)",
          "salut",
          "tu es qui ?",
        ]
    }

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Partie 1",
    "Lucie est une fille de votre lycée",
    "Elle n'est pas dans votre classe mais vous partagez un ami en commun, Matéo.",
    "Vous ne lui avez encore jamais parlé tout les deux. Un beau jour vous recevez une demande en ami..."
]

export const startChapterOne = () => {

}