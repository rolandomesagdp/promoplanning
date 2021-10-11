import { Component, HostBinding } from '@angular/core';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { ScreenService } from '@pp-core/screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthenticationService,
    private screen: ScreenService) {
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
