import { ImportType } from "./import-type.enum";
import { TableNames } from "./tablename.enum";

export interface ImportTypeConfig {
    description: string;
    importTable: TableNames;
    sourceDB: string;
    sourceTable: string;
    importType: ImportType;
}
