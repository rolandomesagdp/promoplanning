import { Component, NgModule, Input} from '@angular/core';
import { PpDevextremeModule } from '@shared/pp-devextreme';

@Component({
  selector: 'pp-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {
  @Input() 
  title: string;

  @Input()
  description: string;
  
  constructor() { }
}

@NgModule({
  imports: [ PpDevextremeModule ],
  exports: [ SingleCardComponent ],
  declarations: [ SingleCardComponent ]
})
export class SingleCardModule {
  
}
