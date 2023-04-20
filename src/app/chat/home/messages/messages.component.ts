import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseResponse } from 'src/app/_models/base-response.model';
import { GetMessagesResponse } from 'src/app/_responses/messages.response';
import { MeetService } from 'src/app/_services/meet.service';
import { SignalRService } from 'src/app/_services/signalr.service';

@Component({
  selector: 'app-chat-home-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  username: string;
  response: GetMessagesResponse;
  messages: object[] = [];



  messageFormControl = new FormControl('');

  constructor(private activatedRoute: ActivatedRoute, private signalRService: SignalRService) { }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.activatedRoute.data.subscribe(
      ({ getMessages }) => {
        console.log(getMessages);
        this.response = getMessages;
      });

    this.signalRService.startConnection();

    this.signalRService.on("ReceiveMessage", (value) => this.messages.push({ text: value, me: false }));
  }

  sendMessage() {
    this.signalRService.invoke("SendMessage",
      { "ReceiverId": this.response.data.receiver, "Text": this.messageFormControl.value },
      () => {
        this.messages.push({ text: this.messageFormControl.value, me: true });
        this.messageFormControl.setValue(null);
      },
      (error) => console.log(error)
    );
  }

}
