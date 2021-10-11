import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { SnackbarService } from '@pp-core/snackbar';
import { PpDevextremeModule } from '@shared/pp-devextreme';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  selector: 'pp-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthenticationService, private router: Router,
    private snackbarService: SnackbarService) { }

  async onSubmit(e) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.resetPassword(email);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/sign-in']);
      this.snackbarService.openSuccess(notificationText);
    } else {
      this.snackbarService.openError(result.message);
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PpDevextremeModule
  ],
  declarations: [ResetPasswordFormComponent],
  exports: [ResetPasswordFormComponent]
})
export class ResetPasswordFormModule { }
