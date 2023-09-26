import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConversation } from "../../interfaces/messages.interface";

export const NAME = 'Matéo';

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Dernière partie",
    "16 décembre 2016"
]

export const startingConversation: IConversation =
{
    id: 5,
    name: 'John Doe',
    profilePicture: 'https://www.uni-giessen.de/de/fbz/fb10/institute_klinikum/klinikum/kramer/professur/team/bilder/mannanonym/@@images/image.jpeg',
    messages: [
        { type: 'indication', received: true, msg: `John Doe vous a ajouté` },
    ],
    choices: [
        "(Accepter)",
    ]
}

export const followingMessage = async (message, playerName) => {
    let choices;
    switch (message) {
        case "(Accepter)":
            return {
                messages: [
                    {
                        msg: `Bonjour ${playerName}`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "qui êtes vous ?",
                    "encore un faux compte..."
                ]
            };
        case "qui êtes vous ?":
        case "encore un faux compte...":
            return {
                messages: [
                    {
                        msg: "Je dois te parler de quelque chose de très sérieux.",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je n'ai pas de carte pcs à te donner désolé",
                    "pourquoi cacher ton identité"
                ]
            };
        case "je n'ai pas de carte pcs à te donner désolé":
            return {
                messages: [
                    {
                        msg: `Ecoute ${playerName}`,
                        type: null,
                        received: true
                    },
                    {
                        msg: "le 16 décembre dernier",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Lucie ne s'est pos suicidée",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Elle a été assassinée.",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "j'ai aucune raison de te faire confiance",
                    "tu dis n'importe quoi",
                    "c'est très malsain comme genre de blague"
                ]
            };
        case "pourquoi cacher ton identité":
            return {
                messages: [
                    {
                        msg: "Pour un tas de raisons je me dois de garder mon anonymat",
                        type: null,
                        received: true
                    },
                    {
                        msg: `Mais tu te dois de savoir quelque chose ${playerName}`,
                        type: null,
                        received: true
                    },
                    {
                        msg: "le 16 décembre dernier",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Lucie ne s'est pos suicidée",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Elle a été assassinée.",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "j'ai aucune raison de te faire confiance",
                    "tu dis n'importe quoi",
                    "c'est très malsain comme genre de blague"
                ]
            };
        case "j'ai aucune raison de te faire confiance":
        case "tu dis n'importe quoi":
        case "c'est très malsain comme genre de blague":
            choices = JSON.parse(await AsyncStorage.getItem('choices'))
            if (choices[3] === "kiss") {
                return {
                    messages: [
                        {
                            msg: "ce soir là près du lac",
                            type: null,
                            received: true
                        },
                        {
                            msg: "lorsque elle et toi vous êtes embrassés",
                            type: null,
                            received: true
                        },
                        {
                            msg: "vous avez scellé quelque chose dans l'univers",
                            type: null,
                            received: true
                        },
                        {
                            msg: "et maintenant vous êtes à jamais liés",
                            type: null,
                            received: true
                        }
                    ],
                    choices: [
                        "bon, qu'as-tu à me donner comme informations ?",
                        "comment tu peux savoir tout ça ?"
                    ]
                };
            } else {
                return {
                    messages: [
                        {
                            msg: "tu aurais pu sortir avec elle.",
                            type: null,
                            received: true
                        },
                        {
                            msg: "tu aurais du l'embrasser",
                            type: null,
                            received: true
                        },
                        {
                            msg: "mais comme à ton habitude tu n'as pas fait les choses jusqu'au bout",
                            type: null,
                            received: true
                        },
                        {
                            msg: "maintenant qu'elle n'est plus là, peu importe ce que tu feras de ta vie",
                            type: null,
                            received: true
                        },
                        {
                            msg: "tu resteras bloqué à jamais avec cette sensation d'avoir raté quelque chose",
                            type: null,
                            received: true
                        }
                    ],
                    choices: [
                        "bon, qu'as-tu à me donner comme informations ?",
                        "comment tu peux savoir tout ça ?"
                    ]
                };
            }
        case "bon, qu'as-tu à me donner comme informations ?":
            return {
                messages: [
                    {
                        msg: "est-ce que ça veut dire que tu me crois ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "non, mais je veux bien essayer",
                    "oui, je te crois"
                ]
            };
        case "comment tu peux savoir tout ça ?":
            return {
                messages: [
                    {
                        msg: "cela fait beaucoup de temps que je t'observe",
                        type: null,
                        received: true
                    },
                    {
                        msg: "car j'ai besoin de toi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "tu es le seul qui pourra m'aider",
                        type: null,
                        received: true
                    },
                    {
                        msg: "tu es différent",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "en quoi suis-je différent des autres ?",
                    "bon, je suis prêt à t'écouter"
                ]
            };
        case "non, mais je veux bien essayer":
        case "oui, je te crois":
        case "bon, je suis prêt à t'écouter":
        case "c'est normal, je l'aimais":
        case "dis moi ce que tu as à me dire.":
            return {
                messages: [
                    {
                        msg: "bien",
                        type: null,
                        received: true
                    },
                    {
                        msg: "il existe un carnet",
                        type: null,
                        received: true
                    },
                    {
                        msg: "dans lequel Lucie écrivait tout ses retranchements",
                        type: null,
                        received: true
                    },
                    {
                        msg: "c'est lui qui te donnera la réponse sur la véritable raison de sa mort",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "et dans ce carnet, qu'y a t-il ?",
                    "ou je peux le trouver ?"
                ]
            };
        case "en quoi suis-je différent des autres ?":
            return {
                messages: [
                    {
                        msg: "tu es la seule personne qui parlait à Lucie sans attendre d'intérêt de sa part.",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "c'est normal, je l'aimais",
                    "dis moi ce que tu as à me dire."
                ]
            };
        case "où je peux le trouver ?":
            return {
                messages: [
                    {
                        msg: "dans sa chambre.",
                        type: null,
                        received: true
                    },
                    {
                        msg: "maintenant que tu sais tout ça, je peux partir.",
                        type: null,
                        received: true
                    },
                    {
                        msg: `bonne chance ${playerName}.`,
                        type: null,
                        received: true
                    },
                    {
                        msg: "John Doe vous a bloqué.",
                        type: "indication",
                        received: true
                    },
                    {
                        msg: "FIN DE LA PARTIE 1",
                        type: "chapter_end",
                        received: true
                    }
                ],
                choices: [
                    ""
                ]
            };
        case "et dans ce carnet, qu'y a t-il ?":
            return {
                messages: [
                    {
                        msg: "tu dois le découvrir par toi même.",
                        type: null,
                        received: true
                    },
                    {
                        msg: "il se trouve dans sa chambre.",
                        type: null,
                        received: true
                    },
                    {
                        msg: "maintenant que tu sais tout ça, je peux partir.",
                        type: null,
                        received: true
                    },
                    {
                        msg: `bonne chance ${playerName}.`,
                        type: null,
                        received: true
                    },
                    {
                        msg: "John Doe vous a bloqué.",
                        type: "indication",
                        received: true
                    },
                    {
                        msg: "FIN DE LA PARTIE 1",
                        type: "chapter_end",
                        received: true
                    }
                ],
                choices: [
                    ""
                ]
            };
    }

}