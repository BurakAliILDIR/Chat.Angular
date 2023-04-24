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
  previousMessages: Message[] = [];
  noneData: boolean = false;

  messageFormControl = new FormControl('');

  constructor(private activatedRoute: ActivatedRoute, private meetService: MeetService, private signalRService: SignalRService) { }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.activatedRoute.data?.subscribe(
      ({ getMessages }) => {
        this.response = getMessages;
        console.log(this.response.data);
        this.response?.data?.messages.forEach(x => this.previousMessages.unshift(x));
        this.noneData = getMessages.data?.messages.length < 10;
      });

    this.signalRService.startConnection();

    this.signalRService.on("ReceiveMessage", (value) => {
      this.previousMessages.push(value)
    });

    this.signalRService.on("DeletedMessage", (value) => {
      this.previousMessages.filter(x => {
        if (x.id == value) {
          this.previousMessages.splice(this.previousMessages.indexOf(x), 1);
        }
      })
    });
  }

  upPage() {
    this.page++;
    this.meetService.getMessages(this.username, this.page).subscribe({
      next: (value: GetMessagesResponse) => {
        value.data?.messages.forEach(x => this.previousMessages.unshift(x));
        this.noneData = value.data?.messages.length < 10;
      },
      error: (error) => console.log(error),
      complete: () => console.log("completed..")
    })
  }

  sendMessage() {
    this.signalRService.invoke("SendMessage",
      { "ReceiverId": this.response.data.receiver, "Text": this.messageFormControl.value },
      () => {
        this.messageFormControl.setValue(null);
      },
      (error) => console.log(error)
    );
  }

  delete(id: string) {
    this.signalRService.invoke("DeleteMessage",
      { "Id": id },
      () => {
        //this.messageFormControl.setValue(null);
      },
      (error) => console.log(error)
    );
  }

}
