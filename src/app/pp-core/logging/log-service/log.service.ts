import { Injectable } from '@angular/core';
import { LogLevel } from '@pp-core/log-level.enum';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { LogEntry } from '../log-entry/log-entry.class';
import { LogPublisher } from '../log-publishers/log-publisher.class';
import { LogPublishersFactory } from '../log-publishers/log-publishers.factory';

@Injectable()
export class LogService {

  logWithDate: boolean = false;
  publishers: LogPublisher[];

  constructor(private settingsManagerService: SettingsManager) {
    this.publishers = new LogPublishersFactory().createPublishers();
  }

  debug(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Debug, optionalParams);
  }

  info(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Info, optionalParams);
  }

  warn(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Warn, optionalParams);
  }

  error(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Error, optionalParams);
  }

  fatal(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.Fatal, optionalParams);
  }

  log(className: string, functionName: string, msg: string, ...optionalParams: any[]) {
    this.writeToLog(className, functionName, msg, LogLevel.All, optionalParams);
  }

  private writeToLog(className: string, functionName: string, msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let entry: LogEntry = new LogEntry();
      entry.className = className;
      entry.functionName = functionName;
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      this.publishers.forEach((logger: LogPublisher) => {
        logger.log(entry).subscribe();
      })
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.logLevel && level !== LogLevel.Off) || this.logLevel === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  private get logLevel(): LogLevel {
    return this.settingsManagerService.getLogLevel();
  }
}
