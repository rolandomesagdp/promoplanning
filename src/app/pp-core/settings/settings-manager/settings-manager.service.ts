import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { LocalStorageService } from '@pp-core/local-storage/local-storage.service';
 import { LogLevel } from '@pp-core/log-level.enum';
import { ConfigSettings } from '../config-settings.model';

@Injectable()
export class SettingsManager {
  private settingsControllerUrl: string = `${environment.serverUrl}settings`;
  private configSettings: ConfigSettings;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  loadAppSettings(): Observable<ConfigSettings> {
    const settings = this.localStorage.getSettings();
    return settings ? of(settings) : this.loadAppSettingsFromServer();
  }

  getLogLevel(): LogLevel {
		return  this.configSettings ? this.configSettings.logLevel : LogLevel.All;
	}

  private loadAppSettingsFromServer(): Observable<ConfigSettings> {
    const url = this.settingsControllerUrl;
    return this.httpClient.get<ConfigSettings>(url).pipe(
      tap(settings => {
        this.configSettings = settings;
        this.localStorage.addSettings(this.configSettings);
      }),
      catchError(error => this.onError(error)));
  }

  private onError(error: any): Observable<never> {
    return throwError(error);
  }
}
