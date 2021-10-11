import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { FooterModule, SideNavOuterToolbarModule } from './layout';
import { ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './login';
import { UnauthenticatedContentModule } from './shared/components';
import { AppRoutingModule } from './app-routing.module';
import { PpCoreModule } from './pp-core/pp-core.module';
import { SingleCardModule } from './layout/single-card';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PpCoreModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
