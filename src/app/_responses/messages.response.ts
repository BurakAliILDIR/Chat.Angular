

export class GetMessagesResponse {
    status: number;
    message: string;
    data: Meet
}

export class Meet {
    id: string
    receiver: string
    lastMessage: string
    createdAt: string
    messages: Message[]
}

export class Message {
    id: string;
    receiverId: string;
    senderId: string;
    text: string;
    createdAt: string;
}