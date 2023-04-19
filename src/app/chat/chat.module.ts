import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './home/users/users.component';
import { HomeComponent } from './home/home.component';
import { MeetsComponent } from './home/meets/meets.component';
import { MessagesComponent } from './home/messages/messages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    MeetsComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ChatModule { }
