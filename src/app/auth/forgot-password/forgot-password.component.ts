import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthService) { }

  forgotPasswordForm = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.info(e),
      complete: () => console.info('complete')
    });
  }
}
