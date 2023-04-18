import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './home/users/users.component';
import { HomeComponent } from './home/home.component';
import { MeetsComponent } from './home/meets/meets.component';



@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    MeetsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
