import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConversation } from "../interfaces/messages.interface";

export const NAME = 'Matéo';

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Partie 3",
]

export const startingConversation: IConversation =
{
    id: 2,
    name: 'Matéo',
    profilePicture: 'https://cdn-s-www.lejsl.com/images/8BD25DE2-9611-4632-9408-CAE9EBF115A8/NW_raw/jules-fonseca-de-pouilloux-photo-dr-fournie-par-jules-1625408911.jpg',
    messages: [
        { type: null, received: true, msg: `mec faut que je te parle d'un truc` },
    ],
    choices: [
        "tout va bien ?",
        "ouais dis moi",
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
        case "je t'écoute":
            return {
                messages: [
                    {
                        msg: "je crois qu'elle est sur moi",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "sur toi ? c'est a dire ?",
                    "qu'est-ce qui te fait dire qu'elle est sur toi ?"
                ]
            };
        case "Lucie ? C'est qui ?":
            return {
                messages: [
                    {
                        msg: "mais",
                        type: null,
                        received: true
                    },
                    {
                        msg: "la blonde qui était avec nous au ciné",
                        type: null,
                        received: true
                    },
                    {
                        msg: "t'es con ou quoi ?",
                        type: null,
                        received: true
                    },
                    {
                        msg: "bref",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je crois qu'elle est sur moi",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "sur toi ? c'est a dire ?",
                    "qu'est-ce qui te fait dire qu'elle est sur toi ?"
                ]
            };
        case "sur toi ? c'est a dire ?":
            return {
                messages: [
                    {
                        msg: "t'es trop bizarre aujourd'hui mec",
                        type: null,
                        received: true
                    },
                    {
                        msg: "genre elle veut me pécho",
                        type: null,
                        received: true
                    },
                    {
                        msg: "ce que je peux comprendre",
                        type: null,
                        received: true
                    },
                    {
                        msg: "mais c'est évident",
                        type: null,
                        received: true
                    },
                    {
                        msg: "les signaux sont trop gros",
                        type: null,
                        received: true
                    },
                    {
                        msg: "au cinéma elle a passé la soirée à me sourire",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et après la soirée je lui ai envoyé un message",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et tu sais pas quoi ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je sais pas mais tu vas me dire ?",
                    "c'est petit comme signal quand même"
                ]
            };
        case "qu'est-ce qui te fait dire qu'elle est sur toi ?":
            return {
                messages: [
                    {
                        msg: "au cinéma elle a passé la soirée à me sourire",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et après la soirée je lui ai envoyé un message",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et tu sais pas quoi ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je sais pas mais tu vas me dire ?",
                    "c'est petit comme signal quand même"
                ]
            };
        case "je sais pas mais tu vas me dire ?":
        case "c'est petit comme signal quand même":
            return {
                messages: [
                    {
                        msg: "elle m'a invité à son anniversaire 🥰",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "t'es fou mon pauvre, ressaisis toi",
                    "c'est pas plutôt toi qui est amoureux ?"
                ]
            };
        case "t'es fou mon pauvre, ressaisis toi":
            return {
                messages: [
                    {
                        msg: "mais je l'aime !",
                        type: null,
                        received: true
                    },
                    {
                        msg: "elle est tellement belle",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "bon écoute, il faut que je t'avoue quelque chose"
                ]
            };
        case "c'est pas plutôt toi qui est amoureux ?":
            return {
                messages: [
                    {
                        msg: "oui 🥰",
                        type: null,
                        received: true
                    },
                    {
                        msg: "elle est tellement belle",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "bon écoute, il faut que je t'avoue quelque chose"
                ]
            };
        case "bon écoute, il faut que je t'avoue quelque chose":
            choices = JSON.parse(await AsyncStorage.getItem('choices'))
            if (choices[0] === "rdv") {
                return {
                    messages: [
                        {
                            msg: "Ouais ? 😃",
                            type: null,
                            received: true
                        },
                    ],
                    choices: [
                        "j'ai un date avec elle",
                        "je suis content pour toi mon pote"
                    ]
                }
            } else {
                return {
                    messages: [
                        {
                            msg: "Ouais ? 😃",
                            type: null,
                            received: true
                        },
                    ],
                    choices: [
                        "je suis aussi invité à son anniversaire",
                        "je suis content pour toi mon pote"
                    ]
                }
            }
        case "j'ai un date avec elle":
        case "je suis aussi invité à son anniversaire":
            choices = JSON.parse(await AsyncStorage.getItem('choices'))
            choices[1] = 'honnete';
            AsyncStorage.setItem('choices', JSON.stringify(choices));
            return {
                messages: [
                    {
                        msg: "vous avez choisi de dire la vérité",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "ce choix aura des conséquences",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "ah...",
                        type: null,
                        received: true
                    },
                    {
                        msg: "laisse tomber",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Matéo s'est déconnecté",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "FIN DE LA PARTIE 3",
                        type: 'fin_chapitre',
                        received: true
                    }
                ],
                choices: []
            };
        case "je suis content pour toi mon pote":
            choices = JSON.parse(await AsyncStorage.getItem('choices'))
            choices[1] = 'menteur';
            AsyncStorage.setItem('choices', JSON.stringify(choices));
            return {
                messages: [
                    {
                        msg: "vous avez choisi de mentir à Matéo",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "ce choix aura des conséquences",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "je sais, j'ai tellement de chance",
                        type: null,
                        received: true
                    },
                    {
                        msg: "bon on se capte bientôt mon gars",
                        type: null,
                        received: true
                    },
                    {
                        msg: "ma dulciné m'attend",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Matéo s'est déconnecté",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "FIN DE LA PARTIE 3",
                        type: 'end_chapter',
                        received: true
                    }
                ],
                choices: [
                    ""
                ]
            };
    }

}