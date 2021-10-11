import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { LoginModel } from '../..';
import { CurrentPrincipal } from '../current-principal.model';
import { LogService } from '@pp-core/logging/log-service/log.service';
import { LocalStorageService } from '@pp-core/local-storage/local-storage.service';
import { PpUser } from '../user.model';
import { UserModelFactory } from '../user-model.factory';

@Injectable()
export class UserAccountService {
  private _currentUser: PpUser;
  private defaultAvatarUrl: string = "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png";
  private className: string = "UserAccountService";
  private accountControllerUrl = `${environment.serverUrl}Account`;
  private authControllerUrl = `${environment.serverUrl}`;

  get currentUser(): PpUser {
    if (!this._currentUser)
      this._currentUser = this.localStorage.getUser();
    return this._currentUser;
  }

  get userIsAdmin(): boolean {
    return this.currentUser ? this.currentUser.isAdmin : false;
  }

  constructor(private httpClient: HttpClient, private logger: LogService, private localStorage: LocalStorageService) { }

  loginWithForm(userData: LoginModel): Observable<any> {
    const url = `${this.accountControllerUrl}/Login`;
    return this.httpClient.post<any>(url, userData);
  }

  getUser(): Observable<PpUser> {
    return this._currentUser ? of(this._currentUser) : this.getCurrentUserFromServer();
  }

  clearCurrentUser(): void {
    this._currentUser = null;
    this.localStorage.clearStorage();
  }

  private getCurrentUserFromServer(): Observable<PpUser> {
    const url = `${this.authControllerUrl}auth`;
    return this.httpClient.get<any>(url).pipe(
      map(serviceResponse => serviceResponse.data.userPrincipal),
      concatMap((currentUser: CurrentPrincipal) => {
        this.onGetCurrentUserSuccess(currentUser);
        return of(this._currentUser);
      }),
      catchError(error => this.handleError(error, "getCurrentUserFromServer()", "Error getting current user")));
  }

  private onGetCurrentUserSuccess(currentUser: CurrentPrincipal): void {
    this.localStorage.clearStorage();
    this.logger.debug(this.className, "onGetCurrentUserSuccess", "Current user successfully fetched from server.", currentUser);
    this.localStorage.addCurrentPrincipal(currentUser);
    this._currentUser = new UserModelFactory().create(currentUser);
    this._currentUser.avatarUrl = this.defaultAvatarUrl;
  }

  private handleError(error: any, functionName: string, message: string): Observable<never> {
    this.logger.debug(this.className, functionName, message, error);
    return throwError(error);
  }
}
