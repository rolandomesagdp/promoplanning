import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { SnackbarService } from '@pp-core/snackbar';
import { PpDevextremeModule } from '@shared/pp-devextreme';

@Component({
  selector: 'pp-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthenticationService, private router: Router,
    private snackbarService: SnackbarService) { }

  async onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    const result = await this.authService.createAccount(email, password);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/sign-in']);
    } else {
      this.snackbarService.openError(result.message);
    }
  }

  confirmPassword = (e: { value: string }) => {
    return e.value === this.formData.password;
  }
}
@NgModule({
  imports: [
    CommonModule,
    PpDevextremeModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }
