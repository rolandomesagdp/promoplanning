import { LogLevel } from '@pp-core/log-level.enum';
import { PromoSellDate } from '.';

export interface ConfigSettings {
	displaySellDate: number;
	promoSellDate: PromoSellDate;
	lockRefreshTime: number;
	idleTime: number;
	isWeeklyDetail: boolean;
	logLevel: LogLevel;
	maxPastMonths: number;
	maxFutureMonths: number;
}