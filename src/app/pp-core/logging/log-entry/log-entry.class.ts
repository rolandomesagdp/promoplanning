import { LogLevel } from "../../log-level.enum";

export class LogEntry {
    entryDate: Date = new Date();
    className: string;
    functionName: string;
    message: string;
    level: LogLevel;
    extraInfo: any[] = [];
    logWithDate: boolean;

    toString(): string {
        let logAsString: string = "";

        if (this.logWithDate) {
            logAsString = new Date() + " - ";
        }
        
        logAsString += 'Class: ' + this.className;
        logAsString += ' - Function: ' + this.functionName;
        logAsString += ' - Message: ' + this.message;
        if (this.extraInfo.length) {
            logAsString += " - Extra Info: " + this.formatParams(this.extraInfo);
        }

        return logAsString;
    }

    toStringWithoutExtraInfo(): string {
        let logAsString: string = "";

        if (this.logWithDate) {
            logAsString = new Date() + " - ";
        }
        
        logAsString += 'Class: ' + this.className;
        logAsString += ' - Function: ' + this.functionName;
        logAsString += ' - Message: ' + this.message;
        return logAsString;
    }

    private formatParams(params: any[]): string {
        let paramsAsString: string = params.join(",");

        if (params.some(p => typeof p == "object")) {
            paramsAsString = "";
            
            for (let item of params) {
                paramsAsString += JSON.stringify(item) + ",";
            }
        }

        return paramsAsString;
    }
}