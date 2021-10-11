import { Component, Input, NgModule, OnInit } from '@angular/core';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { BackButtonModule } from '../back-button';

@Component({
  selector: 'pp-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() errorMessage: string;
  
  constructor() { }
}

@NgModule({
  imports: [ BackButtonModule, PpAngularMaterialModule ],
  exports: [ ErrorMessageComponent ],
  declarations: [ ErrorMessageComponent ]
})
export class ErrorMessageModule { }
