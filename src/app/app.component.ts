import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'donn';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  public logout() {
    this.authService.logout()
    .then(res => {
      this.router.navigate(['/login']);
    });
  }
}
