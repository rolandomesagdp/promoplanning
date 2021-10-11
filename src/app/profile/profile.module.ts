import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { PpDevextremeModule } from '@shared/pp-devextreme';
import { ProfileRoutingModule } from './profile-routing.module';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PpDevextremeModule,
    PpAngularMaterialModule
  ]
})
export class ProfileModule { }
