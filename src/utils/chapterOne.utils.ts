import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export const NAME = 'LUCIE';

export const startingConversations = [
    { id: 1, 
        name: 'John Doe' ,
        messages: [
            {received: true, msg: "Bonjour"},
            {received: false, msg: "Salut"},
            {received: true, msg: "Ca va ?"},
            {received: true, msg: "Eh oh"}

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