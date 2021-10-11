import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

const angularMaterialModules: any[] = [ 
  MatInputModule, 
  MatSnackBarModule, 
  MatButtonModule,
  MatSelectModule, 
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatDividerModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatRadioModule,
  MatPaginatorModule,
  MatMenuModule
];

@NgModule({
  declarations: [],
  imports: [...angularMaterialModules ],
  exports: [ ...angularMaterialModules ]
})
export class PpAngularMaterialModule { }
