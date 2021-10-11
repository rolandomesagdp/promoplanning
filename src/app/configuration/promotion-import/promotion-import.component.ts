import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Column } from '../column-type.enum';
import { DataImportService } from '../configuration-services/data-import.service';
import { ImportTypeConfig } from '../import-type-config.model';
import { ImportType } from '../import-type.enum';
import { TableNames } from '../tablename.enum';
import { PromotionImportEditComponent } from './promotion-import-edit/promotion-import-edit.component';
import { PromotionImportViewModel } from './promotion-import-view.model';

@Component({
  selector: 'pp-promotion-import',
  templateUrl: './promotion-import.component.html',
  styleUrls: ['./promotion-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class PromotionImportComponent implements OnInit {

  promotionImportVM: PromotionImportViewModel = new PromotionImportViewModel(this.dataImportService);
  displayedColumns: string[] = [ 'description', 'insert_new_record_only', 'insert_and_overwrite', 'delete', 'action'];
  column = Column;
  title: string = "Data Import";
  subtitle: string = "Promotions";

  constructor(private dataImportService: DataImportService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  importAllExternalPromos(): void {
    this.dataImportService.importExternalPromos(TableNames.All).subscribe(() => {});
  }

  getCheckIcon(column: Column, value: number): string {
    switch (column) {
      case Column.ImportOnlyNew:
        return value === ImportType.IMPORT_ONLY_NEW ? "check" : "";
      case Column.ImportAndOverride:
        return value === ImportType.IMPORT_AND_OVERRIDE ? "check" : "";
      case Column.DeleteBeforeImport:
        return value === ImportType.DELETE_BEFORE_IMPORT ? "check" : "";
    }
  }

  editRow(importData: ImportTypeConfig): void {
    const dialogConfig = { height: '300px', width: '700px', autoFocus: false, data: importData};
		const dialogRef = this.dialog.open(PromotionImportEditComponent, dialogConfig);
		
    dialogRef.afterClosed().subscribe((importCofigData: ImportTypeConfig) => console.log(importCofigData));
  }

  importRow(importData: ImportTypeConfig): void {
    this.dataImportService.importExternalPromos(importData.importTable).subscribe(() => {});
  }

  ngOnDestroy(): void {
  }
}
