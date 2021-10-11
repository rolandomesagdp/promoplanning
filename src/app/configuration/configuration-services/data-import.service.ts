import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ImportTable } from '../import-table.class';
import { ImportTypeConfig } from '../import-type-config.model';
import { TableNames } from '../tablename.enum';

@Injectable()
export class DataImportService {

	private importControllerUrl: string = `${environment.serverUrl}import`;

  constructor(private httpClient: HttpClient) { }

	getMasterDataConfig(): Observable<ImportTable[]> {
    const getMasterDataConfigUrl = `${this.importControllerUrl}/importMasterDataConfiguration`;
		return this.httpClient.get<ImportTable[]>(getMasterDataConfigUrl);
  }

	saveMasterDataConfig(data: ImportTable): Observable<number> {
    const saveMasterDataConfigUrl = `${this.importControllerUrl}/importMasterDataConfiguration`;
		return this.httpClient.post<number>(saveMasterDataConfigUrl, data);
  }

  getImportTypeConfiguration(): Observable<ImportTypeConfig[]> {
    const importTypeConfigurationUrl = `${this.importControllerUrl}/importTypeConfiguration`;
    return this.httpClient.get<ImportTypeConfig[]>(importTypeConfigurationUrl);
  }

  getTableImportTypeConfiguration(tableName: string): Observable<ImportTypeConfig> {
    const tableImportTypeConfigurationUrl = `${this.importControllerUrl}/importTypeConfiguration/${tableName}`;
    return this.httpClient.get<ImportTypeConfig>(tableImportTypeConfigurationUrl);
  }

  saveImportTypeConfiguration(importData: ImportTypeConfig): Observable<ImportTypeConfig> {
    const saveImportTypeConfigurationUrl = `${this.importControllerUrl}/importTypeConfiguration`;
    return this.httpClient.post<ImportTypeConfig>(saveImportTypeConfigurationUrl, importData);
  }

  importExternalPromos(tableName: TableNames): Observable<void> {
    const importExternalPromosUrl = `${this.importControllerUrl}/externalPromos/${tableName}`;
    return this.httpClient.get<void>(importExternalPromosUrl);
  }

}
