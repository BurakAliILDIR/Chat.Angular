import {Meet} from "../_models/meet.model";

export class GetMeetsResponse {
  status: number;
  message: string;
  data: Meet[]
}
