import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.info(e),
      complete: () => console.info('complete') 
  });
  }
}
