import { Component, OnInit } from '@angular/core';
import { BaseResponse } from 'src/app/_models/base-response.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-chat-home-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (value: BaseResponse) => {
        this.users = value.data
        console.log(this.users);
      },
      error: (error) => console.log(error),
      complete: () => console.log("completed..")
    })
  }



}
