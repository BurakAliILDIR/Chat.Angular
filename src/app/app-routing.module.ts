import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {EmailConfirmationComponent} from './auth/email-confirmation/email-confirmation.component';
import {HomeComponent} from './chat/home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {getMessagesResolver} from './_resolvers/messages.resolver';
import {getMeetsResolver} from "./_resolvers/meets.resolver";

const routes: Routes = [
  {path: "", redirectTo: "chat/home", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "reset-password", component: ResetPasswordComponent},
  {path: "email-confirmation", component: EmailConfirmationComponent},
  {
    path: "chat", children:
      [
        {path: "home", component: HomeComponent, resolve: {getMeets: getMeetsResolver}},
        {
          path: "home/:username",
          component: HomeComponent,
          resolve: {getMessages: getMessagesResolver, getMeets: getMeetsResolver}
        }
      ], canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
