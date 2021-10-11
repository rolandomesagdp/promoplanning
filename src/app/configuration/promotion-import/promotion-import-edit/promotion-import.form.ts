import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ImportTypeConfig } from "../../import-type-config.model";
import { ImportType } from "../../import-type.enum";

export class PromotionImportForm {
    importTypeForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public importTypeConfig: ImportTypeConfig) {
    }

    build(): void {
        this.importTypeForm = this.formBuilder.group({
            importType: new FormControl(this.importTypeConfig.importType, this.importTypeValidation())
        });
    }

    get importType(): AbstractControl {
        return this.importTypeForm.get('importType');
    }

    private importTypeValidation(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null =>
            control.value === ImportType.NONE ? { invalid: true } : null;
    }
}
