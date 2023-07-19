export interface IMessage {
    type: string | null,
    received: boolean,
    msg: string
} 

export interface IConversation {
    id: number,
    name: string,
    profilePicture: string,
    messages: IMessage[]
}