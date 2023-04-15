import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  loginForm = new FormGroup({
    usernameOrEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (v) => console.warn(v),
      error: (e) => this.toastr.error(e.error.Data.Message, e.error.Message),
      complete: () => this.toastr.success('Sign in!', "Success")
    });
  }
}
