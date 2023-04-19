import { Component, OnInit } from '@angular/core';
import { BaseResponse } from 'src/app/_models/base-response.model';
import { JwtService } from 'src/app/_services/jwt.service';
import { MeetService } from 'src/app/_services/meet.service';

@Component({
  selector: 'app-chat-home-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.css']
})
export class MeetsComponent implements OnInit {
  meets: any;

  constructor(private meetService: MeetService) { }

  ngOnInit(): void {
    this.meetService.getMeets().subscribe({
      next: (value: BaseResponse) => {
        this.meets = value.data
      },
      error: (error) => console.log(error),
      complete: () => console.log("completed..")
    })
  }

}
