import { Meet } from "../_models/meet.model";

export class GetMessagesResponse {
    status: number;
    message: string;
    data: Meet
}