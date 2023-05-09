import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { MeetService } from "../_services/meet.service";
import {GetMeetsResponse} from "../_responses/meets.response";

export const getMeetsResolver: ResolveFn<GetMeetsResponse> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(MeetService).getMeets();
    };
