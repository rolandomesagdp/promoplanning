import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SingleCardModule } from '@app/layout/single-card';
import { PpDevextremeModule } from '@shared/pp-devextreme';

@Component({
  selector: 'pp-unauthenticated-content',
  templateUrl: './unauthenticated-content.component.html',
  styleUrls: ['./unauthenticated-content.component.scss']
})
export class UnauthenticatedContentComponent {

  constructor(private router: Router) { }

  get title() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'sign-in': return 'Sign In';
      case 'reset-password': return 'Reset Password';
      case 'create-account': return 'Sign Up';
      case 'change-password': return 'Change Password';
    }
  }

  get description() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'reset-password': return 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PpDevextremeModule,
    SingleCardModule,
  ],
  declarations: [UnauthenticatedContentComponent],
  exports: [UnauthenticatedContentComponent]
})
export class UnauthenticatedContentModule { }
