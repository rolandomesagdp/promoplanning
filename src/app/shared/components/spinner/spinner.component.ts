import { Component, NgModule } from '@angular/core';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';

@Component({
  selector: 'pp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor() { }
}

@NgModule({
  imports: [ 
    PpAngularMaterialModule
   ],
  exports: [ SpinnerComponent ],
  declarations: [ SpinnerComponent ]
})
export class PromoPlanningSpinnerModule { }
