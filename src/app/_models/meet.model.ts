import { Message } from "./message.model"

export class Meet {
    id: string
    receiver: string
    lastMessage: string
    createdAt: string
    messages: Message[]
}
