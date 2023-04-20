import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseResponse } from 'src/app/_models/base-response.model';
import { Message } from 'src/app/_models/message.model';
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
  page: number = 1;
  response: GetMessagesResponse;
  newMessages: object[] = [];
  previousMessages: Message[] = [];

  messageFormControl = new FormControl('');

  constructor(private activatedRoute: ActivatedRoute, private meetService: MeetService, private signalRService: SignalRService) { }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.activatedRoute.data.subscribe(
      ({ getMessages }) => {
        this.response = getMessages;
        this.response.data.messages.forEach(x=> this.previousMessages.push(x));
      });

    this.signalRService.startConnection();

    this.signalRService.on("ReceiveMessage", (value) => this.newMessages.push({ text: value, me: false }));
  }

  upPage() {
    this.page++;
    console.log(this.page);

    this.meetService.getMessages(this.username, this.page).subscribe({
      next: (value: GetMessagesResponse) => {
        value.data.messages.forEach(x => this.previousMessages.push(x));
        console.log(value);
      },
      error: (error) => console.log(error),
      complete: () => console.log("completed..")
    })
  }

  sendMessage() {
    this.signalRService.invoke("SendMessage",
      { "ReceiverId": this.response.data.receiver, "Text": this.messageFormControl.value },
      () => {
        this.newMessages.push({ text: this.messageFormControl.value, me: true });
        this.messageFormControl.setValue(null);
      },
      (error) => console.log(error)
    );
  }

}
