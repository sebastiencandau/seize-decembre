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

export const followingMessage = (message, playerName) => {
    switch (message) {
        case "Hey Lucie !":
        case "hello":
            return {
                messages: [
                    { msg: "merci pour la soirée, c'était une bonne idée", type: null, received: false },
                    { msg: "Matéo était ravi", type: null, received: true },
                    { msg: `hey ${playerName} :)`, type: null, received: false },
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
                        msg: "hey Sébastien, merci pour la soirée samedi. J'ai bien rigolé :)",
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
                        msg: "ce vendredi soir au lac près de chez Matéo, ça te convient ?",
                        type: null,
                        received: true
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
        case "J'essaierai":
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
    }
}
