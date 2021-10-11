import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataImportService } from '@app/configuration/configuration-services/data-import.service';
import { ImportTypeConfig } from '@app/configuration/import-type-config.model';
import { ImportType } from '@app/configuration/import-type.enum';
import { CheckboxOption } from '../../checkbox.model';
import { PromotionImportForm } from './promotion-import.form';

@Component({
  selector: 'pp-promotion-import-edit',
  templateUrl: './promotion-import-edit.component.html',
  styleUrls: ['./promotion-import-edit.component.scss']
})
export class PromotionImportEditComponent implements OnInit {

  importTypeConfig: ImportTypeConfig = this.data;
  checkboxOptions: CheckboxOption[] = this.createCheckboxOptions();
  promotionImportForm: PromotionImportForm = new PromotionImportForm(this.fb, this.importTypeConfig);

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImportTypeConfig, public dialogRef: MatDialogRef<PromotionImportEditComponent>, private dataImportService: DataImportService, private fb: FormBuilder) {}
  
  ngOnInit() {
    this.promotionImportForm.build();
  }

  private createCheckboxOptions(): CheckboxOption[] {
    return [
      { title: 'Insert new records only', value: ImportType.IMPORT_ONLY_NEW},
      { title: 'Insert new records and override existing ones', value: ImportType.IMPORT_AND_OVERRIDE},
      { title: 'Delete all the records before the import', value: ImportType.DELETE_BEFORE_IMPORT}
    ]
  }

  importTable(): void {
    this.dataImportService.importExternalPromos(this.importTypeConfig.importTable).subscribe(() => {});
  }

  saveImportData(): void {
    const importData: ImportTypeConfig = {...this.importTypeConfig, importType: this.promotionImportForm.importType.value};
    this.dataImportService.saveImportTypeConfiguration(importData).subscribe(() => {
      this.dialogRef.close(importData);
    });
  }

}
