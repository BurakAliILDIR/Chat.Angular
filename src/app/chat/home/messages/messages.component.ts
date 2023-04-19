import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResponse } from 'src/app/_models/base-response.model';
import { GetMessagesResponse } from 'src/app/_responses/messages.response';
import { MeetService } from 'src/app/_services/meet.service';

@Component({
  selector: 'app-chat-home-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  username: string;
  response: GetMessagesResponse;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.activatedRoute.data.subscribe(
      ({ getMessages }) => {
        console.log(getMessages);
        this.response = getMessages;
      });
  }
}
