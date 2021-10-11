import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScreenService } from './screen';
import { AppInfoService } from './app-info';
import { LoggingModule } from './logging';
import { SettingsModule } from './settings';
import { AuthenticationModule } from './auth';
import { LocalStorageService } from './local-storage/local-storage.service';
import { SnackbarModule } from './snackbar';
import { AuthCookieExpiredInterceptor } from './auth/auth-cookie-expired-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SettingsModule,
    LoggingModule,
    AuthenticationModule,
    SnackbarModule,
    RouterModule
  ],
  exports: [RouterModule],
  providers: [
    ScreenService,
    AppInfoService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthCookieExpiredInterceptor, multi: true }
  ]
})
export class PpCoreModule { }