import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { MeetService } from "../_services/meet.service";
import { GetMessagesResponse } from "../_responses/messages.response";

export const getMessagesResolver: ResolveFn<GetMessagesResponse> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(MeetService).getMessages(route.paramMap.get('username')!);
    };