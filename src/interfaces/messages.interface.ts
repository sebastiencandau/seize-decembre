export interface IMessage {
    type: string | null,
    prenom?: string,
    received: boolean,
    msg: string
} 

export interface IConversation {
    id: number,
    name: string,
    profilePicture: string,
    messages: IMessage[],
    choices: string[],
    background?: string
}