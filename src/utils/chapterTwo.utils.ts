import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConversation, IMessage } from "../interfaces/messages.interface";

export const NAME = 'LUCIE';

export const startingConversation: IConversation =
{
    id: 1,
    name: 'Lucie',
    profilePicture: 'https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fgal.2F2020.2F10.2F10.2Fb6dc622e-40b2-4ceb-bc07-f5ba40a644ee.2Ejpeg/420x420/quality/80/focus-point/492%2C210/photos-filip-nikolic-nouvelle-tete-pour-sa-sublime-fille-sasha.jpg',
    messages: [
        { type: 'indication', received: true, msg: `Lucie est connectée` },
    ],
    choices: [
        "Hey Lucie !",
        "hello",
        "( ne rien dire )",
    ]
}

export const narativeIndications = [
    "Chapitre 1: Lucie",
    "Partie 2",
]

export const followingMessage = async (message, playerName) => {
    let choices;
    switch (message) {
        case "Hey Lucie !":
        case "hello":
            return {
                messages: [
                    { msg: "merci pour la soirée, c'était une bonne idée", type: null, received: false },
                    { msg: "Matéo était ravi", type: null, received: false },
                    { msg: `hey  :)`, type: null, received: true },
                    { msg: "j'ai vu ça, j'ai passé une superbe soirée aussi ! Tu m'as bien faite rire", type: null, received: true },
                    { msg: "même si tu n'es pas très bavard", type: null, received: true },
                    { msg: "(ce n'est pas un reproche)", type: null, received: true },
                ],
                choices: [
                    "content de t'avoir fait rire",
                    "je sais, je suis hilarant",
                ]
            };
        case "( ne rien dire )":
            return {
                messages: [
                    {
                        msg: `hey ${playerName}, merci pour la soirée samedi. J'ai bien rigolé :)`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "hey Lucie :)",
                    "je sais, je suis hilarant",
                    "content de t'avoir fait rire"
                ]
            };
        case "content de t'avoir fait rire":
            return {
                messages: [
                    {
                        msg: "ça m'a fait du bien, j'avais vraiment besoin de rire ces derniers temps",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "quelque chose ne va pas ?",
                    "on pourra se revoir si tu veux"
                ]
            };
        case "je sais, je suis hilarant":
            return {
                messages: [
                    {
                        msg: "ahah toujours en train de te venter",
                        type: null,
                        received: true
                    },
                    {
                        msg: "mais ça m'a fait du bien, j'avais vraiment besoin de rire ces derniers temps",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "quelque chose ne va pas ?",
                    "on pourra se revoir si tu veux"
                ]
            };
        case "hey Lucie :)":
            return {
                messages: [
                    {
                        msg: "j'avais vraiment besoin de voir du monde, en plus, c'était le bon timing",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "quelque chose ne va pas ?",
                    "on pourra se revoir si tu veux"
                ]
            };
        case "on pourra se revoir si tu veux":
            return {
                messages: [
                    {
                        msg: "ah oui ?",
                        type: null,
                        received: true
                    },
                    {
                        msg: "ça pourrait être chouette",
                        type: null,
                        received: true
                    },
                    {
                        msg: "tu voudrais refaire une sortie comme samedi, avec les autres ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "non, je parlais de se voir juste toi et moi",
                    "oui, avec les autres"
                ]
            };
        case "non, je parlais de se voir juste toi et moi":
            choices = JSON.parse(await AsyncStorage.getItem('choices'));
            choices[0] = "rdv";
            await AsyncStorage.setItem('choices', JSON.stringify(choices));
            return {
                messages: [
                    {
                        msg: "ow",
                        type: null,
                        received: true
                    },
                    {
                        msg: "pourquoi pas",
                        type: null,
                        received: true
                    },
                    {
                        msg: "tu promets de me faire rire ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "J'essaierai",
                    "oui, c'est promis"
                ]
            };
        case "J'essaierai":
        case "oui, c'est promis":
            return {
                messages: [
                    {
                        msg: "ce vendredi soir au lac près de chez Matéo, ça te convient ?",
                        type: null,
                        received: false
                    },
                    {
                        msg: "C'est parfait",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je vais aller dormir, à vendredi soir",
                    "(ne rien dire)"
                ]
            };
        case "J'essaierai":
        case "C'est parfait":
            return {
                messages: [
                    {
                        msg: "ce vendredi soir au lac près de chez Matéo, ça te convient ?",
                        type: null,
                        received: false
                    },
                    {
                        msg: "C'est parfait",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "(ne rien dire)",
                    "je vais aller dormir, à vendredi soir"
                ]
            };
        case "(ne rien dire)":
            return {
                messages: [
                    {
                        msg: "avant qu'on se voit en seul à seul, j'aimerais en savoir un peu plus sur toi",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "bien sur, je t'écoute"
                ]
            };
        case "à plus tard Lucie":
        case "à plus dans le bus !":
        case "hasta luego":
            return {
                messages: [
                    {
                        msg: "Lucie s'est déconnectée",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "FIN DE LA PARTIE 2",
                        type: 'pas_seduite',
                        received: true
                    }
                ],
                choices: [
                    ""
                ]
            };
        case "je vais aller dormir, à vendredi soir":
            return {
                messages: [
                    {
                        msg: "bonne nuit Lucie",
                        type: null,
                        received: false
                    },
                    {
                        msg: "bonne nuit à toi aussi :)",
                        type: null,
                        received: true
                    },
                    {
                        msg: "Lucie s'est déconnectée",
                        type: 'indication',
                        received: true
                    },
                    {
                        msg: "FIN DE LA PARTIE 2",
                        type: 'pas_seduite',
                        received: true
                    }
                ],
                choices: []
            };
        case "bien sur, je t'écoute":
            return {
                messages: [
                    {
                        msg: "est-ce que tu as quelqu'un dans ta vie ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "non, je suis un esprit libre",
                    "oui",
                    "je n'ai pas envie de répondre"
                ]
            };
        case "non, je suis un esprit libre":
        case "oui":
        case "je n'ai pas envie de répondre":
            return {
                messages: [
                    {
                        msg: "d'accord, c'est noté",
                        type: null,
                        received: true
                    },
                    {
                        msg: "deuxième question",
                        type: null,
                        received: true
                    },
                    {
                        msg: "qu'est-ce que tu aimes en musique ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "principalement le rap",
                    "principalement le rock",
                    "rien en particulié, seulement ce qui me fait vibrer"
                ]
            };
        case "rien en particulié, seulement ce qui me fait vibrer":
            return {
                messages: [
                    {
                        msg: "je suis comme toi aussi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "intéressant :)",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "satisfaite ?",
                    "pourquoi tu me demandes tout ça en fait ?"
                ]
            };
        case "principalement le rap":
        case "principalement le rock":
            return {
                messages: [
                    {
                        msg: "intéressant :)",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "satisfaite ?",
                    "pourquoi tu me demandes tout ça en fait ?"
                ]
            };
        case "satisfaite ?":
            return {
                messages: [
                    {
                        msg: "très !",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je suis désolée mais je dois t'abandonner",
                        type: null,
                        received: true
                    },
                    {
                        msg: `à plus tard ${playerName} 😊`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "à plus tard Lucie",
                    "à plus dans le bus !",
                    "hasta luego"
                ]
            };
        case "pourquoi tu me demandes tout ça en fait ?":
            return {
                messages: [
                    {
                        msg: "je me renseigne",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je n'ai pas pour habitude d'accepter des rendez-vous en tête à tête avec des garçons",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je suis désolée mais je dois t'abandonner",
                        type: null,
                        received: true
                    },
                    {
                        msg: `à plus tard ${playerName} 😊`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "à plus tard Lucie",
                    "à plus dans le bus !",
                    "hasta luego"
                ]
            };
        case "oui, avec les autres":
            choices = JSON.parse(await AsyncStorage.getItem('choices'));
            choices[0] = "anniversaire";
            await AsyncStorage.setItem('choices', JSON.stringify(choices));
            return {
                messages: [
                    {
                        msg: "je fête mon anniversaire dans 2 semaines",
                        type: null,
                        received: true
                    },
                    {
                        msg: "ce serait chouette que tu viennes",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "est-ce qu'il y aura beaucoup de monde ?",
                    "je viendrai avec plaisir !"
                ]
            };
        case "est-ce qu'il y aura beaucoup de monde ?":
            return {
                messages: [
                    {
                        msg: "il y aura les garçons, Matéo et Mathieu",
                        type: null,
                        received: true
                    },
                    {
                        msg: "il y aura probablement aussi mon copain",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et ma meilleure amie, Sarah",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je suis sûr que tu t'entendrait bien avec elle",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "tu as un copain ?",
                    "j'en suis sûr aussi   😁"
                ]
            };
        case "tu as un copain ?":
            return {
                messages: [
                    {
                        msg: "oui, ça va bientôt faire 2 ans qu'on est ensemble",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je pensais que tu étais un esprit libre",
                    "je suis content pour toi :)"
                ]
            };

        case "je pensais que tu étais un esprit libre":
        case "je suis content pour toi :)":
            return {
                messages: [
                    {
                        msg: "à vrai dire",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on traverse une phase assez compliquée",
                        type: null,
                        received: true
                    },
                    {
                        msg: "mais c'est normal, ce doit être comme ça dans toutes les relations",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "tu veux en parler ?",
                    "j'espère que ça ira mieux"
                ]
            };
        case "j'espère que ça ira mieux":
            return {
                messages: [
                    {
                        msg: "ahah c'est gentil",
                        type: null,
                        received: true
                    },
                    {
                        msg: `je pense que tu es quelqu'un de bien ${playerName}`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "c'est toi qui est gentille là",
                    "qu'est-ce qui te fait dire ça ?"
                ]
            };
        case "c'est toi qui est gentille là":
        case "qu'est-ce qui te fait dire ça ?":
            return {
                messages: [
                    {
                        msg: "Tu as l'air sincère",
                        type: null,
                        received: true
                    },
                    {
                        msg: "ça se fait rare de nos jours",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je suis désolée mais je dois t'abandonner",
                        type: null,
                        received: true
                    },
                    {
                        msg: `à plus tard ${playerName}   😊`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "à plus tard Lucie",
                    "à plus dans le bus !",
                    "hasta luego"
                ]
            };
        case "tu veux en parler ?":
            return {
                messages: [
                    {
                        msg: "je ne veux pas t'embêter avec mes histoires",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "tu ne m'embêteras pas",
                    "comme tu voudras"
                ]
            };
        case "comme tu voudras":
            return {
                messages: [
                    {
                        msg: `je pense que tu es quelqu'un de bien ${playerName}`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "c'est toi qui est gentille là",
                    "qu'est-ce qui te fait dire ça ?"
                ]
            };
        case "tu ne m'embêteras pas":
            return {
                messages: [
                    {
                        msg: "en fait",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on est ensemble depuis longtemps lui et moi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et on a pris des chemins tellement différents",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on a plus rien en commun",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "est-ce que tu penses qu'il t'aime ?",
                    "pourquoi vous êtes encore ensemble ?"
                ]
            };
        case "est-ce que tu penses qu'il t'aime ?":
            return {
                messages: [
                    {
                        msg: "il m'a aimé",
                        type: null,
                        received: true
                    },
                    {
                        msg: "mais il ne m'aime plus",
                        type: null,
                        received: true
                    },
                    {
                        msg: "il est comme une mauvaise habitude pour moi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on sait que c'est toxique, mais elle fait partie de nous",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on ne sait pas comment vivre sans",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je ne saurais pas vivre sans Lucas",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "crois moi, je te comprends mieux que personne Lucie",
                    "je ne comprends pas"
                ]
            };
        case "pourquoi vous êtes encore ensemble ?":
            return {
                messages: [
                    {
                        msg: "il est comme une mauvaise habitude pour moi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on sait que c'est toxique, mais elle fait partie de nous",
                        type: null,
                        received: true
                    },
                    {
                        msg: "on ne sait pas comment vivre sans",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je ne saurais pas vivre sans Lucas",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "crois moi, je te comprends mieux que personne Lucie",
                    "je ne comprends pas"
                ]
            };
        case "crois moi, je te comprends mieux que personne Lucie":
            return {
                messages: [
                    {
                        msg: "on se ressemble toi et moi",
                        type: null,
                        received: true
                    },
                    {
                        msg: `je pense que tu es quelqu'un de bien ${playerName}`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "c'est toi qui est gentille là",
                    "qu'est-ce qui te fait dire ça ?"
                ]
            };
        case "je ne comprends pas":
            return {
                messages: [
                    {
                        msg: "lorsque quelque chose est mauvais pour toi c'est évident qu'il faut s'en débarasser",
                        type: null,
                        received: false
                    },
                    {
                        msg: `je pense que tu es quelqu'un de bien ${playerName}`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "c'est toi qui est gentille là",
                    "qu'est-ce qui te fait dire ça ?"
                ]
            };
        case "j'en suis sûr aussi   😁; ":
            return {
                messages: [
                    {
                        msg: "je suis désolée mais je dois t'abandonner",
                        type: null,
                        received: true
                    },
                    {
                        msg: `à plus tard ${playerName}   😊`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "à plus tard Lucie",
                    "à plus dans le bus !",
                    "hasta luego"
                ]
            };
        case "je viendrai avec plaisir !":
            return {
                messages: [
                    {
                        msg: "super !",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je suis désolée mais je dois t'abandonner",
                        type: null,
                        received: true
                    },
                    {
                        msg: `à plus tard ${playerName}   😊`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "à plus tard Lucie",
                    "à plus dans le bus !",
                    "hasta luego"
                ]
            };

        case "quelque chose ne va pas ?":
            choices = JSON.parse(await AsyncStorage.getItem('choices'));
            choices[0] = "anniversaire";
            await AsyncStorage.setItem('choices', JSON.stringify(choices));
            return {
                messages: [
                    {
                        msg: "je suis désolée, je ne suis pas venue pour me plaindre",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "ça ne m'embêtera pas",
                    "ne sois pas désolée, c'est comme tu veux"
                ]
            };
        case "ça ne m'embêtera pas":
        case "ne sois pas désolée, c'est comme tu veux":
            return {
                messages: [
                    {
                        msg: "parfois j'ai l'impression qu'on a pas la vie qu'on aurait du avoir",
                        type: null,
                        received: true
                    },
                    {
                        msg: "qu'on est bloqué dans quelque chose qui ne nous ressemble pas",
                        type: null,
                        received: true
                    },
                    {
                        msg: "comme si on était plus maître de quoi que ce soit",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "crois moi, je te comprends mieux que personne Lucie",
                    "je ne te comprends pas"
                ]
            };
        case "crois moi, je te comprends mieux que personne Lucie":
            return {
                messages: [
                    {
                        msg: "tu ne te sens pas à ta place ?",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "si, j'essaye de me contenter de l'essentiel",
                    "j'ai du mal à trouver où elle est"
                ]
            };
        case "je ne te comprends pas":
            return {
                messages: [
                    {
                        msg: "on est seul maître de sa vie. Si on s'y sent inconfortable c'est à nous de la changer",
                        type: null,
                        received: false
                    },
                    {
                        msg: "je veux bien te croire",
                        type: null,
                        received: true
                    },
                    {
                        msg: "mais je pense que parfois on se sent confortable dans sa médiocrité",
                        type: null,
                        received: true
                    },
                    {
                        msg: "ou du moins, on a peur du changement",
                        type: null,
                        received: true
                    },
                    {
                        msg: "et des sacrifices que ça implique",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "il faut essayer de se satisfaire de ce qu'on a",
                    "c'est difficile de trouver sa place"
                ]
            };
        case "si, j'essaye de me contenter de l'essentiel":
        case "j'ai du mal à trouver où elle est":
        case "il faut essayer de se satisfaire de ce qu'on a":
        case "c'est difficile de trouver sa place":
            return {
                messages: [
                    {
                        msg: "ça me fait penser à une musique",
                        type: null,
                        received: true
                    },
                    {
                        msg: "https://open.spotify.com/intl-fr/track/3l3SbRkrK1aQ5Dk1h7vroV?si=b0f977f809644c57",
                        type: "link",
                        received: true
                    },
                    {
                        msg: "elle explore les différentes émotions liées au besoin de se sentir spécial et à la tristesse qui peut en découler.",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "c'est une belle musique",
                    "j'irai écouter + tard"
                ]
            };
        case "c'est une belle musique ":
        case "j'irai écouter + tard":
            return {
                messages: [
                    {
                        msg: "oui vraiment",
                        type: null,
                        received: true
                    },
                    {
                        msg: "j'aime parler avec toi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "j'ai l'impression qu'on se comprend tout les deux",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je fête mon anniversaire dans 2 semaines. Ce serait bien que tu viennes",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je verrai si je peux me libérer",
                    "je viendrai avec plaisir !"
                ]
            };
        case "mais on est les personnages principaux de l'histoire":
            return {
                messages: [
                    {
                        msg: "j'aimerais que ce soit le cas",
                        type: null,
                        received: true
                    },
                    {
                        msg: "j'aime parler avec toi",
                        type: null,
                        received: true
                    },
                    {
                        msg: "j'ai l'impression qu'on se comprend tout les deux",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je fête mon anniversaire dans 2 semaines. Ce serait bien que tu viennes",
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "je verrai si je peux me libérer",
                    "je viendrai avec plaisir !"
                ]
            };
        case "je verrai si je peux me libérer":
        case "je viendrai avec plaisir !":
            return {
                messages: [
                    {
                        msg: "chouette",
                        type: null,
                        received: true
                    },
                    {
                        msg: "je suis désolée mais je dois t'abandonner",
                        type: null,
                        received: true
                    },
                    {
                        msg: `à plus tard ${playerName}   😊`,
                        type: null,
                        received: true
                    }
                ],
                choices: [
                    "à plus tard Lucie",
                    "à plus dans le bus !",
                    "hasta luego"
                ]
            };
    }

}
