import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        this.authService.emailConfirmation({
          userId: params['userId'],
          token: params['token'],
        }).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.info(e),
          complete: () => console.info('complete')
        });
      });
  }
}
