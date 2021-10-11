import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '@pp-core/logging/log-service/log.service';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { LoginModel } from '..';
import { UserAccountService } from '../user/user-account-service/user-account.service';
import { PpUser } from '../user/user.model';

@Injectable()
export class AuthenticationService {
  private className = "AuthenticationService";
  requestedPath: string = "/home";
  
  get loggedIn(): boolean {
    return !!this.userAccountService.currentUser;
  }

  constructor(private userAccountService: UserAccountService, private router: Router, private logger: LogService) { }

  logIn(loginData: LoginModel): Observable<PpUser> {
    return this.userAccountService.loginWithForm(loginData).pipe(
      concatMap(loginResponse => {
        return this.handleLoginResponse(loginResponse)
      }),
      catchError(error => this.handleError(error, "logIn", error.message)));
  }

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  logOut(): void {
    this.userAccountService.clearCurrentUser();
    this.router.navigate(['/sign-in']);
  }

  private handleLoginResponse(loginResponse: any): Observable<PpUser | never> {
    if(loginResponse.status.code === 200){
      this.logger.debug(this.className, "onLoginSuccess", "Loging successfull", loginResponse);
      return this.userAccountService.getUser();
    }
    else
      return throwError({message: loginResponse.status.message});
  }

  private handleError(error: any, functionName: string, messageToLog: string): Observable<never> {
    this.logger.error(this.className, functionName, messageToLog, error);
    this.logOut();
    return throwError(error);
  }
}
