import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { concatMap, map, scan } from "rxjs/operators";
import { DataImportService } from "../configuration-services/data-import.service";
import { ImportTypeConfig } from "../import-type-config.model";

export class PromotionImportViewModel {

    importTypeConfig$: Observable<ImportTypeConfig[]> = this.importService.getImportTypeConfiguration();
    importConfigEdited$: BehaviorSubject<ImportTypeConfig> = new BehaviorSubject<ImportTypeConfig>(null);

    constructor(private importService: DataImportService) { }

    private importConfigUpdateHistory$ = this.importConfigEdited$.pipe(
        concatMap((configData: ImportTypeConfig) => configData ? of([configData]) : of([])),
        scan((updateHistory: ImportTypeConfig[], currentUpdate: ImportTypeConfig[]) => {
            const latestConfigData: ImportTypeConfig[] = [...currentUpdate];
            updateHistory.map(uh => {
                if (!currentUpdate.find(cu => cu.importTable === uh.importTable)) latestConfigData.push(uh);
            });
            return latestConfigData;
        }
    ));

    vm$ = combineLatest([
        this.importTypeConfig$,
        this.importConfigUpdateHistory$
    ]).pipe(
        map(([importTypeConfig, importConfigEdited]) => {
            const importConfigUpdated = [];
            importTypeConfig.map(itc => {
                const filtered = importConfigEdited.find(ice => ice.importTable === itc.importTable);
                filtered ? importConfigUpdated.push(filtered) : importConfigUpdated.push(itc);
            });
            return importConfigUpdated;
        })
    );
}