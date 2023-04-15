import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userId: string = "";
  token: string = "";

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.userId = params['userId'];
        this.token = params['token'];
        console.log(this.userId);
        console.log(this.token);
      }
      );
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  onSubmit() {

    const data = {
      userId: this.userId,
      token: this.token,
      ...this.resetPasswordForm.value
    }

    this.authService.resetPassword(data).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.info(e),
      complete: () => console.info('complete')
    });
  }
}
