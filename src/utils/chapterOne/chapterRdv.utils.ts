import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConversation } from "../../interfaces/messages.interface";

export const NAME = 'Lucie';

export const narativeIndications = [
  "Chapitre 1: Lucie",
  "Partie bonus: Le rendez-vous",
  "8 décembre 2016 : 19h12"
]

export const startingConversation: IConversation =
{
  id: 2,
  name: 'Le lac',
  profilePicture: 'https://img.fotocommunity.com/soleil-couchant-sur-le-lac-de-poucharramet-muret-france-panorama-333a7b0f-7fa3-4269-a08c-1615dc2e8e78.jpg?height=1080', messages: [
  ],
background: 'https://img.freepik.com/photos-premium/magnifique-coucher-soleil-lac-roseaux-au-premier-plan-soleil-couchant-rayons_210632-640.jpg',
  choices: [
    "(arriver en retard)",
    "(arriver à l'heure)",
    "(arriver en avance)",
  ]
}

export const followingMessage = async (message, playerName) => {
  let choices;
  switch (message) {
    case "(arriver en retard)":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      choices[2] = 'retard';
      AsyncStorage.setItem('choices', JSON.stringify(choices));
      return {
        messages: [
          {
            msg: "Vous arrivez au lac",
            type: 'indication',
            received: true
          },
          {
            msg: "malgré vos gants, le froid d'hiver vous brûle les mains",
            type: 'indication',
            received: true
          },
          {
            msg: "le soleil commence à peine à se coucher",
            type: 'indication',
            received: true
          },
          {
            msg: "vous apercevez une silhouette au loin face au lac",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( se rapprocher )",
          "LUCIE !!"
        ]
      };
    case "(arriver à l'heure)":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      choices[2] = 'heure';
      AsyncStorage.setItem('choices', JSON.stringify(choices));
      return {
        messages: [
          {
            msg: "Vous arrivez au lac",
            type: 'indication',
            received: true
          },
          {
            msg: "malgré vos gants, le froid d'hiver vous brûle les mains",
            type: 'indication',
            received: true
          },
          {
            msg: "le soleil commence à peine à se coucher",
            type: 'indication',
            received: true
          },
          {
            msg: "vous apercevez une silhouette au loin face au lac",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( se rapprocher )",
          "LUCIE !!"
        ]
      };
    case "(arriver en avance)":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      choices[2] = 'avance';
      AsyncStorage.setItem('choices', JSON.stringify(choices));
      return {
        messages: [
          {
            msg: "Vous arrivez au lac",
            type: 'indication',
            received: true
          },
          {
            msg: "malgré vos gants, le froid d'hiver vous brûle les mains",
            type: 'indication',
            received: true
          },
          {
            msg: "le soleil commence à peine à se coucher",
            type: 'indication',
            received: true
          },
          {
            msg: "vous apercevez une silhouette au loin face au lac",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( se rapprocher )",
          "LUCIE !!"
        ]
      };
    case "( se rapprocher )":
    case "LUCIE !!":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      return {
        messages: [
          {
            msg: "vous vous rapprochez",
            type: 'indication',
            received: true
          },
          {
            msg: "Lucie se retourne et vous reconnaît",
            type: 'indication',
            received: true
          },
          {
            msg: "elle vous sourit",
            type: 'indication',
            received: true
          },
          {
            msg: `${playerName} :)`,
            type: null,
            received: true
          },
          {
            msg: choices[2] === 'retard' ?
              "ce doit faire 1h que je t'attends" :
              choices[2] === 'heure' ? "tu es très ponctuel, je suis arrivée un peu à l'avance" :
                "je ne m'attendais pas à ce que tu viennes aussi tôt",
            type: null,
            received: true
          },
          {
            msg: choices[2] === 'retard' ?
              "Lucie paraît déçue" :
              "tu es très ponctuel, je suis arrivée un peu à l'avance",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "je suis content de te voir !",
          "pourquoi être arrivé si tôt ?"
        ]
      };

    case "je suis content de te voir !":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      if (choices[1] === "honnete") {
        return {
          messages: [
            {
              msg: "moi aussi je suis contente de te voir",
              type: null,
              received: true
            },
            {
              msg: "j'ai croisé Matéo en arrivant",
              type: null,
              received: true
            },
            {
              msg: "je lui ai dit que je venais te voir",
              type: null,
              received: true
            },
            {
              msg: "il m'a dit de te passer le bonjour",
              type: null,
              received: true
            },
            {
              msg: "vous avez l'air vraiment très proche",
              type: null,
              received: true
            }
          ],
          choices: [
            "c'est mon meilleur ami",
            "on est pas si amis que ça"
          ]
        };
      } else {
        return {
          messages: [
            {
              msg: "moi aussi je suis contente de te voir",
              type: null,
              received: true
            },
            {
              msg: "j'ai croisé Matéo en arrivant",
              type: null,
              received: true
            },
            {
              msg: "je lui ai dit que je venais te voir",
              type: null,
              received: true
            },
            {
              msg: "il est parti sans dire un mot",
              type: null,
              received: true
            },
            {
              msg: "tu sais ce qu'il lui arrive ?",
              type: null,
              received: true
            }
          ],
          choices: [
            "je pense que je l'ai déçu",
            "aucune idée"
          ]
        };
      }
    case "pourquoi être arrivé si tôt ?":
      return {
        messages: [
          {
            msg: "les rendez vous me font toujours un peu stresser",
            type: null,
            received: true
          }
        ],
        choices: [
          "je comprends, je suis pareil",
          "tu n'as aucune raison de stresser avec moi"
        ]
      };

    case "je comprends, je suis pareil":
    case "tu n'as aucune raison de stresser avec moi":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      if (choices[1] === "honnete") {
        return {
          messages: [
            {
              msg: "Lucie vous sourit avec un air gênée",
              type: 'indication',
              received: true
            },
            {
              msg: "j'ai croisé Matéo en arrivant",
              type: null,
              received: true
            },
            {
              msg: "je lui ai dit que je venais te voir",
              type: null,
              received: true
            },
            {
              msg: "il est parti sans dire un mot",
              type: null,
              received: true
            },
            {
              msg: "tu sais ce qu'il lui arrive ?",
              type: null,
              received: true
            }
          ],
          choices: [
            "je pense que je l'ai déçu",
            "aucune idée"
          ]
        };
      } else {
        return {
          messages: [
            {
              msg: "Lucie vous sourit avec un air gênée",
              type: 'indication',
              received: true
            },
               {
                    msg: "moi aussi je suis contente de te voir",
                    type: null,
                    received: true
                  },
                  {
                    msg: "j'ai croisé Matéo en arrivant",
                    type: null,
                    received: true
                  },
                  {
                    msg: "je lui ai dit que je venais te voir",
                    type: null,
                    received: true
                  },
                  {
                    msg: "il est parti sans dire un mot",
                    type: null,
                    received: true
                  },
                  {
                    msg: "tu sais ce qu'il lui arrive ?",
                    type: null,
                    received: true
                  }
                ],
                choices: [
                  "je pense que je l'ai déçu",
                  "aucune idée"
                ]
      }
    }


    case "je pense que je l'ai déçu":
    case "aucune idée":
      return {
        messages: [
          {
            msg: "j'espère que ce n'est pas trop grave",
            type: null,
            received: true
          },
          {
            msg: "c'est important d'avoir quelqu'un sur qui on pourra toujours compter",
            type: null,
            received: true
          }
        ],
        choices: [
          "je pense comme toi",
          "tu as un ou une meilleure ami ?"
        ]
      };
    case "c'est mon meilleur ami":
      return {
        messages: [
          {
            msg: "c'est important d'avoir quelqu'un sur qui on pourra toujours compter",
            type: null,
            received: true
          }
        ],
        choices: [
          "je pense comme toi",
          "tu as un ou une meilleure ami ?"
        ]
      };
    case "on est pas si amis que ça":
      return {
        messages: [
          {
            msg: "Lucie semble surprise par votre réponse",
            type: 'indication',
            received: true
          },
          {
            msg: "oh",
            type: null,
            received: true
          },
          {
            msg: "je pensais",
            type: null,
            received: true
          },
          {
            msg: "c'est important d'avoir quelqu'un sur qui on pourra toujours compter",
            type: null,
            received: true
          }
        ],
        choices: [
          "tu as un ou une meilleure ami ?",
          "je suis un solitaire"
        ]
      };
    case "je pense comme toi":
      return {
        messages: [
          {
            msg: "on se ressemble toi et moi",
            type: null,
            received: true
          },
          {
            msg: "c'est plutôt cool",
            type: null,
            received: true
          }
        ],
        choices: [
          "c'est vrai",
          "(ne rien dire)"
        ]
      };
    case "tu as un ou une meilleure ami ?":
      return {
        messages: [
          {
            msg: "j'ai Sarah",
            type: null,
            received: true
          },
          {
            msg: "c'est une fille formidable",
            type: null,
            received: true
          },
          {
            msg: "tu t'entendrais vraiment bien avec elle",
            type: null,
            received: true
          }
        ],
        choices: [
          "je n'en doute pas",
          "(ne rien dire)"
        ]
      };
    case "je suis un solitaire":
      return {
        messages: [
          {
            msg: "la solitude c'est bien",
            type: null,
            received: true
          },
          {
            msg: "mais quand on est tout seul à guider sa vie",
            type: null,
            received: true
          },
          {
            msg: "je pense que c'est plus facile de se perdre",
            type: null,
            received: true
          }
        ],
        choices: [
          "parfois c'est pertinent de se perdre, ça permet de vivre des expériences et d'apprendre",
          "je fais de mon mieux pour ne pas me perdre"
        ]
      };

    case "c'est vrai":
    case "(ne rien dire)":
    case "je n'en doute pas":
    case "parfois c'est pertinent de se perdre, ça permet de vivre des expériences et d'apprendre":
    case "je fais de mon mieux pour ne pas me perdre":
      return {
        messages: [
          {
            msg: "Lucie regarde le lac, silencieuse",
            type: 'indication',
            received: true
          },
          {
            msg: "vous êtes l'un à coté de l'autre",
            type: 'indication',
            received: true
          },
          {
            msg: "Le soleil est sur le point de se coucher",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( se rapprocher du lac )",
          "( ne rien faire )"
        ]
      };

    case "( se rapprocher du lac )":
      return {
        messages: [
          {
            msg: "vous prenez l'initiative de vous avancer",
            type: 'indication',
            received: true
          },
          {
            msg: "Lucie vous suit",
            type: 'indication',
            received: true
          },
          {
            msg: "Le lac brille, créant une toile éblouissante de couleurs chatoyantes.",
            type: 'indication',
            received: true
          },
          {
            msg: "c'est magnifique...",
            type: null,
            received: true
          },
          {
            msg: "je devrais venir ici plus souvent",
            type: null,
            received: true
          }
        ],
        choices: [
          "on pourra revenir si tu veux",
          "parfois on ne se rend pas compte que les plus belles choses sont tout près"
        ]
      };

    case "( ne rien faire )":
      return {
        messages: [
          {
            msg: "Lucie s'avance",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( la suivre)",
          "(rester là ou vous êtes)"
        ]
      };
    case "( la suivre)":
      return {
        messages: [
          {
            msg: "Le lac brille, créant une toile éblouissante de couleurs chatoyantes.",
            type: "indication",
            received: true
          },
          {
            msg: "c'est magnifique...",
            type: null,
            received: true
          },
          {
            msg: "je devrais venir ici plus souvent",
            type: null,
            received: true
          }
        ],
        choices: [
          "on pourra revenir si tu veux",
          "parfois on ne se rend pas compte que les plus belles choses sont tout près"
        ]
      };

    case "on pourra revenir si tu veux":
      return {
        messages: [
          {
            msg: "avec plaisir",
            type: null,
            received: true
          },
          {
            msg: `merci ${playerName}`,
            type: null,
            received: true
          },
          {
            msg: "ce rendez vous était une bonne idée",
            type: null,
            received: true
          },
          {
            msg: "tout à coup Lucie reçoit une notification",
            type: 'indication',
            received: true
          },
          {
            msg: "son visage se décompose",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "qu'est-ce que c'est ?",
          "tu as des problèmes ?"
        ]
      };
    case "parfois on ne se rend pas compte que les plus belles choses sont tout près":
      return {
        messages: [
          {
            msg: "ahah tu joues les philosophes maintenant ?",
            type: null,
            received: true
          },
          {
            msg: "mais tu as tellement raison",
            type: null,
            received: true
          },
          {
            msg: "ce rendez vous était une bonne idée",
            type: null,
            received: true
          },
          {
            msg: "tout à coup Lucie reçoit une notification",
            type: 'indication',
            received: true
          },
          {
            msg: "son visage se décompose",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "qu'est-ce que c'est ?",
          "tu as des problèmes ?"
        ]
      };

    case "(rester là ou vous êtes)":
      return {
        messages: [
          {
            msg: "tout à coup Lucie reçoit une notification",
            type: 'indication',
            received: true
          },
          {
            msg: "son visage se décompose",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "qu'est-ce que c'est ?",
          "tu as des problèmes ?"
        ]
      };
    case "qu'est-ce que c'est ?":
    case "tu as des problèmes ?":
      return {
        messages: [
          {
            msg: "ce n'est rien...",
            type: null,
            received: true
          },
          {
            msg: "disons que je m'y attendais",
            type: null,
            received: true
          },
          {
            msg: "pourquoi tout est toujours si compliqué ?",
            type: null,
            received: true
          },
          {
            msg: "Lucie s'avance encore",
            type: 'indication',
            received: true
          },
          {
            msg: "Les eaux paisibles reflètent les teintes douces du ciel",
            type: 'indication',
            received: true
          },
          {
            msg: `pourquoi somme nous ici d'après toi ${playerName} ?`,
            type: null,
            received: true
          }
        ],
        choices: [
          "pour accomplir notre destin",
          "pour aucune raison particulière, c'est à nous de trouver un sens à notre vie"
        ]
      };
    case "pour accomplir notre destin":
    case "pour aucune raison particulière, c'est à nous de trouver un sens à notre vie":
      return {
        messages: [
          {
            msg: "Lucie semble réfléchir à vos mots",
            type: 'indication',
            received: true
          },
          {
            msg: "le soleil quant à lui est entièrement couché",
            type: 'indication',
            received: true
          },
          {
            msg: "La quiétude enveloppe les lieux, et une ambiance paisible règne autour du lac endormi.",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "(vous rapprocher de Lucie)",
          "( rester là où vous êtes )"
        ]
      };
    case "(vous rapprocher de Lucie)":
      return {
        messages: [
          {
            msg: "vous vous rapprochez doucement d'elle",
            type: 'indication',
            received: true
          },
          {
            msg: "la bise, douce, fait bouger ses longs cheveux",
            type: 'indication',
            received: true
          },
          {
            msg: "vous vous tenez tout deux face au lac, cote à cote",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( lui attraper la main )",
          "(ne rien faire)"
        ]
      };

    case "( lui attraper la main )":
      return {
        messages: [
          {
            msg: "vous lui saisissez la main",
            type: 'indication',
            received: true
          },
          {
            msg: "Lucie se laisse faire",
            type: 'indication',
            received: true
          },
          {
            msg: "Elle se tourne vers vous et vous sourit",
            type: 'indication',
            received: true
          }
        ],
        choices: [
          "( l'embrasser )",
          "(ne rien faire)"
        ]
      };

    case "( l'embrasser )":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      choices[3] = 'kiss';
      choices[4] = 'anniversaire'
      AsyncStorage.setItem('choices', JSON.stringify(choices));
      return {
        messages: [
          {
            msg: "vous avez embrassé Lucie",
            type: 'indication',
            received: true
          },
          {
            msg: "ce choix aura des conséquences",
            type: 'indication',
            received: true
          },
          {
            msg: `${playerName}`,
            type: null,
            received: true
          },
          {
            msg: "je vais t'ajouter au groupe de mon anniversaire",
            type: null,
            received: true
          },
          {
            msg: "je serais heureuse que tu viennes",
            type: null,
            received: true
          }
        ],
        choices: [
          "je viendrai avec plaisir",
          "je vais voir si je peux me libérer"
        ]
      };

    case "( rester là où vous êtes )":
      choices = JSON.parse(await AsyncStorage.getItem('choices'))
      choices[3] = 'no_kiss';
      choices[4] = 'anniversaire'
      AsyncStorage.setItem('choices', JSON.stringify(choices));
      return {
        messages: [
          {
            msg: "Lucie se tourne vers vous et vous sourit",
            type: 'indication',
            received: true
          },
          {
            msg: `${playerName}`,
            type: null,
            received: true
          },
          {
            msg: "je vais t'ajouter au groupe de mon anniversaire",
            type: null,
            received: true
          },
          {
            msg: "je serais heureuse que tu viennes",
            type: null,
            received: true
          }
        ],
        choices: [
          "je viendrai avec plaisir",
          "je vais voir si je peux me libérer"
        ]
      };

    case "je viendrai avec plaisir":
    case "je vais voir si je peux me libérer":
      return {
        messages: [
          {
            msg: `merci ${playerName}`,
            type: null,
            received: true
          },
          {
            msg: "vous restez encore quelques heures devant le lac",
            type: 'indication',
            received: true
          },
          {
            msg: "laissant place au murmure léger de la brise nocturne et aux doux clapotis de l'eau.",
            type: 'indication',
            received: true
          },
          {
            msg: "vous parlez encore et encore...",
            type: 'indication',
            received: true
          },
          {
            msg: "C'est un moment magique où la nature se repose",
            type: 'indication',
            received: true
          },
          {
            msg: "Dans cette intimité partagée avec la nature, le temps semble suspendu",
            type: 'indication',
            received: true
          },
          {
            msg: "Lucie finit par s'endormir contre votre épaule",
            type: 'indication',
            received: true
          },
          {
            msg: "FIN DE LA PARTIE BONUS",
            type: 'fin_chapitre',
            received: true
          }
        ],
        choices: [
        ]
      };
  }

}