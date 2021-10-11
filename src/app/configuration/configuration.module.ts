import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorMessageModule } from "@shared/components/error-message";
import { PpAngularMaterialModule } from "@shared/pp-angular-material";
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { PromotionImportComponent } from './promotion-import/promotion-import.component';
import { PromotionImportEditComponent } from './promotion-import/promotion-import-edit/promotion-import-edit.component';
import { DataImportService } from "./configuration-services/data-import.service";
import { PromoPlanningSpinnerModule } from "@shared/components/spinner";

@NgModule({
  declarations: [
    PromotionImportComponent,
    PromotionImportEditComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    PpAngularMaterialModule,
    ErrorMessageModule,
    ReactiveFormsModule,
    FormsModule,
    PromoPlanningSpinnerModule,
  ],
  providers: [DataImportService]
})
export class ConfigurationModule { }