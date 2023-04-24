import {Component, OnInit} from '@angular/core';
import {BaseResponse} from 'src/app/_models/base-response.model';
import {JwtService} from 'src/app/_services/jwt.service';
import {MeetService} from 'src/app/_services/meet.service';
import {GetMeetsResponse} from "../../../_responses/meets.response";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-home-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.css']
})
export class MeetsComponent implements OnInit {
  response: GetMeetsResponse;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data?.subscribe(
      ({getMeets}) => {
        this.response = getMeets;
      })
  }

}
